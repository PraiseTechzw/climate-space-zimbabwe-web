import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";
import OpenAI from "openai";

export class OpenAIProvider implements IProvider {
    id = "openai";
    capabilities = {
        chat: true,
        embeddings: true,
        vision: true,
        tools: true,
        jsonSchema: true,
        streaming: true,
        local: false,
    };
    pricingHints = { inputPer1M: 0.5, outputPer1M: 1.5 };

    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const model = req.modelHint || "gpt-3.5-turbo";
        // Basic mapping of ChatMessage format; assumes content is string for simplicity, can extend for vision
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
        const model = req.modelHint || "text-embedding-3-small";
        const response = await this.client.embeddings.create({
            model,
            input: req.texts,
        });
        return {
            embeddings: response.data.map(d => d.embedding),
            provider: this.id,
            model,
        };
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
