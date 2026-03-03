import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";
import OpenAI from "openai";

export class MetaProvider implements IProvider {
    id = "meta";
    capabilities = {
        chat: true,
        embeddings: false, // Usually Llama endpoints focus on completion unless specific
        vision: true,
        tools: true,
        jsonSchema: true,
        streaming: true,
        local: false,
    };
    pricingHints = { inputPer1M: 0.1, outputPer1M: 0.5 };

    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.META_API_KEY || process.env.OPENAI_API_KEY || "dummy_key",
            baseURL: process.env.META_BASE_URL || process.env.OPENAI_COMPAT_BASE_URL
        });
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const model = req.modelHint || "meta-llama/Llama-3-70b-chat-hf";
        const body: any = {
            model,
            messages: req.messages as any,
            temperature: req.temperature ?? 0.7,
            max_tokens: req.maxTokens,
        };
        if (req.jsonSchema) {
            body.response_format = { type: "json_object" };
        }

        const response = await this.client.chat.completions.create(body);
        return {
            content: response.choices[0].message.content || "",
            provider: this.id,
            model,
            usage: response.usage ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
            } : undefined
        };
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        throw new Error("Meta embedding mock not implemented.");
    }

    async healthcheck(): Promise<HealthStatus> {
        try {
            const start = Date.now();
            await this.client.models.list();
            return { status: "ok", latencyMs: Date.now() - start };
        } catch (e: any) {
            return { status: "down", error: e.message };
        }
    }
}
