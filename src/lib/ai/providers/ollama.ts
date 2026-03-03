import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";

// Default cloud-available model for Ollama cloud inference
const DEFAULT_CHAT_MODEL = "gemma3:12b";
const DEFAULT_EMBED_MODEL = "gemma3:12b";
const REQUEST_TIMEOUT_MS = 120_000; // 2 minutes for cloud inference

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
    private apiKey?: string;
    private isCloud: boolean;

    constructor() {
        this.baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
        this.apiKey = process.env.OLLAMA_API_KEY;
        this.isCloud = !!(this.apiKey || this.baseUrl.includes("ollama.com"));
        if (this.isCloud) {
            this.capabilities.local = false;
        }
    }

    private getHeaders() {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }
        return headers;
    }

    /**
     * Strip <think>...</think> blocks from thinking model responses.
     */
    private stripThinkingTags(content: string): string {
        return content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    }

    /**
     * Clean JSON response: strip markdown code fences and extract raw JSON.
     */
    private cleanJsonResponse(content: string): string {
        let cleaned = content.trim();
        // Strip ```json ... ``` or ``` ... ``` wrappers
        const codeBlockMatch = cleaned.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/m);
        if (codeBlockMatch) {
            cleaned = codeBlockMatch[1].trim();
        }
        return cleaned;
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const model = req.modelHint || DEFAULT_CHAT_MODEL;
        const wantsJson = !!req.jsonSchema;

        const messages = req.messages.map(m => ({
            role: m.role,
            content: typeof m.content === "string" ? m.content : JSON.stringify(m.content)
        }));

        // When structured output is requested, add explicit JSON instruction
        if (wantsJson && messages.length > 0) {
            const schemaDesc = JSON.stringify(req.jsonSchema);
            messages[messages.length - 1].content += `\n\nIMPORTANT: You MUST respond ONLY with valid JSON matching this schema (no markdown, no code fences, no explanation outside JSON): ${schemaDesc}`;
        }

        // Ollama API: `format` accepts "json" or a full JSON schema object for structured outputs
        let format: string | Record<string, any> | undefined;
        if (req.jsonSchema) {
            format = req.jsonSchema; // Pass the schema directly for structured output
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: this.getHeaders(),
                signal: controller.signal,
                body: JSON.stringify({
                    model,
                    messages,
                    options: {
                        temperature: req.temperature ?? 0.7,
                    },
                    format,
                    stream: false
                })
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                let errorMsg = data.error || response.statusText;
                if (typeof errorMsg === 'string' && errorMsg.includes("not found")) {
                    errorMsg += this.isCloud
                        ? ` (Model "${model}" is not available on Ollama Cloud. Check available models at ollama.com)`
                        : ` (Please run "ollama pull ${model}" to download this model locally)`;
                }
                throw new Error(`Ollama API error: ${errorMsg}`);
            }

            let rawContent = data.message?.content || "";
            rawContent = this.stripThinkingTags(rawContent);
            const content = wantsJson ? this.cleanJsonResponse(rawContent) : rawContent;

            return {
                content,
                provider: this.id,
                model,
                usage: {
                    promptTokens: data.prompt_eval_count ?? 0,
                    completionTokens: data.eval_count ?? 0,
                }
            };
        } catch (e: any) {
            if (e.name === 'AbortError') {
                throw new Error(`Ollama API timeout: Request to ${model} exceeded ${REQUEST_TIMEOUT_MS / 1000}s`);
            }
            throw e;
        } finally {
            clearTimeout(timeout);
        }
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        const model = req.modelHint || DEFAULT_EMBED_MODEL;
        const embeddings = [];

        for (const text of req.texts) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

            try {
                const response = await fetch(`${this.baseUrl}/api/embed`, {
                    method: 'POST',
                    headers: this.getHeaders(),
                    signal: controller.signal,
                    body: JSON.stringify({ model, input: text })
                });
                const data = await response.json();
                if (!response.ok || data.error) {
                    throw new Error(`Ollama embed error: ${data.error || response.statusText}`);
                }
                // The /api/embed endpoint returns { embeddings: [[...]] } for single input
                const embedding = Array.isArray(data.embeddings) ? data.embeddings[0] : data.embedding;
                embeddings.push(embedding);
            } catch (e: any) {
                if (e.name === 'AbortError') {
                    throw new Error(`Ollama embed timeout for model ${model}`);
                }
                throw e;
            } finally {
                clearTimeout(timeout);
            }
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
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10_000);

            try {
                const res = await fetch(`${this.baseUrl}/api/tags`, {
                    headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
                    signal: controller.signal
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return { status: "ok", latencyMs: Date.now() - start };
            } finally {
                clearTimeout(timeout);
            }
        } catch (e: any) {
            return { status: "down", error: e.message };
        }
    }
}
