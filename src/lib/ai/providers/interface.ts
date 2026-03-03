import { z } from "zod";

export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface LLMProviderOptions {
    modelHint?: string;
    temperature?: number;
    maxTokens?: number;
}

export interface EmbeddingsProviderOptions {
    modelHint?: string;
}

export interface LLMProvider {
    name: string;
    generateText(messages: Message[], options?: LLMProviderOptions): Promise<string>;
    generateEmbeddings(texts: string[], options?: EmbeddingsProviderOptions): Promise<number[][]>;
}
