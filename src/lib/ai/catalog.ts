export type PrivacyTier = "local_only" | "cloud_ok";
export type TaskType = "rag_qa" | "summarize" | "classify" | "agent_planning" | "vision_labeling";

export interface ModelCatalogEntry {
    providerId: string;
    modelId: string;
    supports: {
        vision: boolean;
        tools: boolean;
        json: boolean;
        embeddings: boolean;
    };
    recommendedTasks: TaskType[];
    defaultTemperature: number;
    maxTokens: number;
    privacyTier: PrivacyTier;
}

export const modelCatalog: ModelCatalogEntry[] = [
    {
        providerId: "openai",
        modelId: "gpt-4o-mini",
        supports: { vision: true, tools: true, json: true, embeddings: false },
        recommendedTasks: ["rag_qa", "classify", "agent_planning", "vision_labeling", "summarize"],
        defaultTemperature: 0.7,
        maxTokens: 4000,
        privacyTier: "cloud_ok",
    },
    {
        providerId: "openai",
        modelId: "text-embedding-3-small",
        supports: { vision: false, tools: false, json: false, embeddings: true },
        recommendedTasks: [],
        defaultTemperature: 0,
        maxTokens: 8192,
        privacyTier: "cloud_ok",
    },
    {
        providerId: "anthropic",
        modelId: "claude-3-haiku-20240307",
        supports: { vision: true, tools: true, json: false, embeddings: false },
        recommendedTasks: ["summarize", "classify", "rag_qa"],
        defaultTemperature: 0.7,
        maxTokens: 4096,
        privacyTier: "cloud_ok",
    },
    {
        providerId: "gemini",
        modelId: "gemini-1.5-flash",
        supports: { vision: true, tools: true, json: true, embeddings: false },
        recommendedTasks: ["rag_qa", "agent_planning", "vision_labeling"],
        defaultTemperature: 0.7,
        maxTokens: 8192,
        privacyTier: "cloud_ok",
    },
    {
        providerId: "ollama",
        modelId: "llama3",
        supports: { vision: false, tools: false, json: true, embeddings: false },
        recommendedTasks: ["rag_qa", "classify"],
        defaultTemperature: 0.7,
        maxTokens: 2048,
        privacyTier: "local_only",
    },
    {
        providerId: "meta",
        modelId: "meta-llama/Llama-3-70b-chat-hf",
        supports: { vision: false, tools: true, json: true, embeddings: false },
        recommendedTasks: ["rag_qa", "agent_planning"],
        defaultTemperature: 0.7,
        maxTokens: 4000,
        privacyTier: "cloud_ok",
    }
];
