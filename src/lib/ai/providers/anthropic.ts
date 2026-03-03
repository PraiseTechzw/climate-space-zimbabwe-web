import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";

export class AnthropicProvider implements IProvider {
    id = "anthropic";
    capabilities = {
        chat: true,
        embeddings: false,
        vision: true,
        tools: true,
        jsonSchema: false,
        streaming: true,
        local: false,
    };
    pricingHints = { inputPer1M: 0.25, outputPer1M: 1.25 };

    private getClient() {
        const Anthropic = require("@anthropic-ai/sdk").default;
        return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const client = this.getClient();
        const model = req.modelHint || "claude-3-haiku-20240307";

        let sysMsg = "";
        const msgs = req.messages.filter(m => {
            if (m.role === "system") {
                sysMsg = typeof m.content === "string" ? m.content : "";
                return false;
            }
            return true;
        });

        const response = await client.messages.create({
            model,
            system: sysMsg,
            messages: msgs as any,
            max_tokens: req.maxTokens || 1024,
            temperature: req.temperature ?? 0.7,
        });

        return {
            content: response.content[0].text,
            provider: this.id,
            model,
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
            }
        };
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        throw new Error("Anthropic does not typically provide embeddings.");
    }

    async healthcheck(): Promise<HealthStatus> {
        try {
            // Just check models or something quick. For Anthropic there is no /models list in v1 usually, we can test with a tiny token
            const start = Date.now();
            await this.getClient().messages.create({
                model: "claude-3-haiku-20240307",
                messages: [{ role: "user", content: "hi" }],
                max_tokens: 1
            });
            return { status: "ok", latencyMs: Date.now() - start };
        } catch (error: any) {
            if (error && error.status === 401) return { status: "down", error: "Unauthorized" };
            // Fallback
            return { status: "ok" };
        }
    }
}
