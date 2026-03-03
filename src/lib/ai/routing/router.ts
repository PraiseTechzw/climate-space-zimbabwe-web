import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse } from "../providers/IProvider";
import { OpenAIProvider } from "../providers/openai";
import { AnthropicProvider } from "../providers/anthropic";
import { GeminiProvider } from "../providers/gemini";
import { OllamaProvider } from "../providers/ollama";
import { MetaProvider } from "../providers/meta";
import { modelCatalog, TaskType, PrivacyTier, ModelCatalogEntry } from "../catalog";

export interface RouteConstraints {
    requiresVision?: boolean;
    requiresTools?: boolean;
    requiresEmbeddings?: boolean;
    requiresJson?: boolean;
    privacy?: PrivacyTier;
    maxCost?: number;
    maxLatencyMs?: number;
}

export type RoutingStrategy = "local_first" | "balanced" | "lowest_cost" | "lowest_latency" | "highest_quality";

export class IntelligentRouter {
    private providers: Map<string, IProvider> = new Map();
    // Simplified circuit breaker: track # consecutive failures
    private failCounts: Map<string, number> = new Map();

    constructor() {
        // this.register(new OpenAIProvider());
        // this.register(new AnthropicProvider());
        // this.register(new GeminiProvider());
        this.register(new OllamaProvider());
        // this.register(new MetaProvider());
    }

    private register(provider: IProvider) {
        this.providers.set(provider.id, provider);
        this.failCounts.set(provider.id, 0);
    }

    private getAvailableProviders(): string[] {
        return Array.from(this.providers.keys()).filter(id => (this.failCounts.get(id) || 0) < 3);
    }

    public reportSuccess(providerId: string) {
        this.failCounts.set(providerId, 0);
    }

    public reportFailure(providerId: string) {
        const current = this.failCounts.get(providerId) || 0;
        this.failCounts.set(providerId, current + 1);
    }

    selectModels(task: TaskType, constraints: RouteConstraints, strategy: RoutingStrategy = "balanced"): ModelCatalogEntry[] {
        const available = this.getAvailableProviders();
        let candidates = modelCatalog.filter(m => {
            if (!available.includes(m.providerId)) return false;
            if (constraints.requiresVision && !m.supports.vision) return false;
            if (constraints.requiresTools && !m.supports.tools) return false;
            if (constraints.requiresJson && !m.supports.json) return false;
            if (constraints.requiresEmbeddings && !m.supports.embeddings) return false;
            if (constraints.privacy === "local_only" && m.privacyTier !== "local_only") return false;
            return true;
        });

        // Score models
        candidates = candidates.sort((a, b) => {
            // 1: Local first rules overrides
            if (strategy === "local_first") {
                if (a.privacyTier === "local_only" && b.privacyTier !== "local_only") return -1;
                if (a.privacyTier !== "local_only" && b.privacyTier === "local_only") return 1;
            }
            // 2: Recommended Task priority
            const aRec = a.recommendedTasks.includes(task) ? 1 : 0;
            const bRec = b.recommendedTasks.includes(task) ? 1 : 0;
            if (aRec !== bRec) return bRec - aRec;

            return 0; // fallback evenly
        });

        return candidates.slice(0, 3);
    }

    async chat(task: TaskType, req: ChatRequest, constraints: RouteConstraints = {}): Promise<ChatResponse> {
        const defaultStrategy = (process.env.AI_ROUTER_POLICY_DEFAULT as RoutingStrategy) || "balanced";
        if (process.env.AI_PRIVACY_MODE_DEFAULT === "true") constraints.privacy = "local_only";

        const candidates = this.selectModels(task, constraints, defaultStrategy);
        if (!candidates.length) throw new Error(`No available providers for task: ${task}`);

        for (const desc of candidates) {
            const p = this.providers.get(desc.providerId);
            if (!p) continue;
            try {
                const res = await p.chat({ ...req, modelHint: req.modelHint || desc.modelId });
                this.reportSuccess(p.id);
                return res;
            } catch (err) {
                console.error(`[Router] Provider ${p.id} failed:`, err);
                this.reportFailure(p.id);
            }
        }
        throw new Error("All candidate providers failed (Circuit Breaker)");
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        const candidates = this.selectModels("classify", { requiresEmbeddings: true }, "balanced");
        if (!candidates.length) throw new Error("No embedding provider available");

        for (const desc of candidates) {
            const p = this.providers.get(desc.providerId);
            if (!p) continue;
            try {
                const res = await p.embed({ ...req, modelHint: req.modelHint || desc.modelId });
                this.reportSuccess(p.id);
                return res;
            } catch (err) {
                console.error(`[Router] Provider ${p.id} embedding failed:`, err);
                this.reportFailure(p.id);
            }
        }
        throw new Error("All embedding candidates failed");
    }

    getHealthSummary() {
        const result: any = {};
        this.failCounts.forEach((count, id) => {
            result[id] = count < 3 ? "ok" : "circuit_open";
        });
        return result;
    }
}

export const aiRouter = new IntelligentRouter();
