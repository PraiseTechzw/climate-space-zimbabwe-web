import { IProvider, ChatRequest, ChatResponse, EmbedRequest, EmbedResponse, HealthStatus } from "./IProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiProvider implements IProvider {
    id = "gemini";
    capabilities = {
        chat: true,
        embeddings: true, // Google provides embeddings
        vision: true,
        tools: true,
        jsonSchema: true,
        streaming: true,
        local: false,
    };
    pricingHints = { inputPer1M: 0.1, outputPer1M: 0.5 };

    private client: GoogleGenerativeAI;
    constructor() {
        this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    }

    async chat(req: ChatRequest): Promise<ChatResponse> {
        const genAI = this.client;
        const modelHint = req.modelHint || "gemini-1.5-flash";
        const model = genAI.getGenerativeModel({ model: modelHint });

        // Simplistic formatting for MVP, handling system instructions
        const sysMsgs = req.messages.filter(m => m.role === "system");
        const sysInstruction = sysMsgs.length > 0 ? (sysMsgs[sysMsgs.length - 1].content as string) : "";

        // Convert mapping
        const history = req.messages.filter(m => m.role !== "system").map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }]
        }));

        if (sysInstruction && !history[0]?.parts[0].text.includes(sysInstruction) && typeof window === "undefined" && model.systemInstruction) {
            // Modern Gemini handles system instruction differently, quick hack:
            history[history.length - 1].parts[0].text = `System Prompt: ${sysInstruction}\nUser: ${history[history.length - 1].parts[0].text}`;
        }

        const last = history.pop()!;
        const chat = model.startChat({ history });

        const result = await chat.sendMessage(last.parts[0].text);
        return {
            content: result.response.text(),
            provider: this.id,
            model: modelHint,
        };
    }

    async embed(req: EmbedRequest): Promise<EmbedResponse> {
        const genAI = this.client;
        const modelHint = req.modelHint || "text-embedding-004";
        const model = genAI.getGenerativeModel({ model: modelHint });

        const embeddings = [];
        for (const text of req.texts) {
            const res = await model.embedContent(text);
            embeddings.push(res.embedding.values);
        }
        return {
            embeddings,
            provider: this.id,
            model: modelHint,
        };
    }

    async healthcheck(): Promise<HealthStatus> {
        try {
            const genAI = this.client;
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const start = Date.now();
            await model.generateContent("hi");
            return { status: "ok", latencyMs: Date.now() - start };
        } catch (e: any) {
            return { status: "down", error: e.message };
        }
    }
}
