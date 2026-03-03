import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";

export class OllamaProvider implements IProvider {
    id = "ollama";
    capabilities = {
        chat: true,
        embeddings: true,
        vision: true,
        tools: false, // Some ollama models don't cleanly support tools
        jsonSchema: true,
        streaming: true,
        local: true,
    };
    pricingHints = { inputPer1M: 0, outputPer1M: 0 };

    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const model = req.modelHint || "llama3";

        const messages = req.messages.map(m => ({
            role: m.role,
            content: typeof m.content === "string" ? m.content : JSON.stringify(m.content)
        }));

        const response = await fetch(`${this.baseUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                messages,
                options: {
                    temperature: req.temperature ?? 0.7,
                },
                format: req.jsonSchema ? "json" : undefined,
                stream: false
            })
        });

        const data = await response.json();

        return {
            content: data.message.content,
            provider: this.id,
            model,
            usage: {
                promptTokens: data.prompt_eval_count,
                completionTokens: data.eval_count,
            }
        };
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        const model = req.modelHint || "nomic-embed-text";
        const embeddings = [];

        for (const text of req.texts) {
            const response = await fetch(`${this.baseUrl}/api/embeddings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model, prompt: text })
            });
            const data = await response.json();
            embeddings.push(data.embedding);
        }

        return {
            embeddings,
            provider: this.id,
            model,
        };
    }

    async healthcheck(): Promise<HealthStatus> {
        try {
            const start = Date.now();
            const res = await fetch(`${this.baseUrl}/api/tags`);
            if (!res.ok) throw new Error("Offline");
            return { status: "ok", latencyMs: Date.now() - start };
        } catch (e: any) {
            return { status: "down", error: e.message };
        }
    }
}
