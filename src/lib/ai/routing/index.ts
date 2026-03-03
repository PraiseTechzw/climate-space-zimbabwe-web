import { LLMProvider, Message, LLMProviderOptions, EmbeddingsProviderOptions } from "./providers/interface";
import { OpenAIProvider } from "./providers/openai";
import { AnthropicProvider } from "./providers/anthropic";

type TaskType = "search_qa" | "summarize" | "classification";

export class Router {
    private openai = new OpenAIProvider();
    private anthropic = new AnthropicProvider();

    resolveProvider(task: TaskType): LLMProvider {
        switch (task) {
            case "search_qa":
                return this.openai; // OpenAI handles RAG and embeddings robustly
            case "summarize":
                return this.anthropic; // Claude Haiku for fast/cheap summarize
            case "classification":
                return this.anthropic; // Fast small model
            default:
                return this.openai;
        }
    }

    async generateText(task: TaskType, messages: Message[], options?: LLMProviderOptions): Promise<string> {
        const provider = this.resolveProvider(task);
        try {
            return await provider.generateText(messages, options);
        } catch (error) {
            console.error(`[Router] Fallback triggered. Provider ${provider.name} failed:`, error);
            // Fallback
            const fallbackProvider = provider.name === "openai" ? this.anthropic : this.openai;
            return await fallbackProvider.generateText(messages, options);
        }
    }

    async generateEmbeddings(texts: string[]): Promise<number[][]> {
        // Rely strictly on OpenAI for embeddings right now
        return await this.openai.generateEmbeddings(texts);
    }
}

export const aiRouter = new Router();
