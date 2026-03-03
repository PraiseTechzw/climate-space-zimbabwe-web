export interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string | { type: "text", text: string } | { type: "image", mimeType: string, data: string }[];
}

export interface ChatRequest {
    messages: ChatMessage[];
    modelHint?: string;
    temperature?: number;
    maxTokens?: number;
    jsonSchema?: Record<string, any>;
    tools?: any[];
}

export interface ChatResponse {
    content: string;
    provider: string;
    model: string;
    usage?: { promptTokens: number; completionTokens: number };
}

export interface EmbedRequest {
    texts: string[];
    modelHint?: string;
}

export interface EmbedResponse {
    embeddings: number[][];
    provider: string;
    model: string;
}

export interface HealthStatus {
    status: "ok" | "degraded" | "down";
    latencyMs?: number;
    error?: string;
}

export interface IProvider {
    id: string;
    capabilities: {
        chat: boolean;
        embeddings: boolean;
        vision: boolean;
        tools: boolean;
        jsonSchema: boolean;
        streaming: boolean;
        local: boolean;
    };
    pricingHints?: {
        inputPer1M?: number;
        outputPer1M?: number;
    };
    limits?: {
        maxTokens?: number;
        rpm?: number;
    };

    chat(req: ChatRequest): Promise<ChatResponse>;
    embed(req: EmbedRequest): Promise<EmbedResponse>;
    healthcheck(): Promise<HealthStatus>;
}
