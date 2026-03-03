export type ToolName = "vectorSearch" | "weatherFetch" | "cvInfer" | "safeWebFetch";

export interface AgentContext {
    query: string;
    location?: string;
    crop?: string;
    imageBuffer?: Buffer;
    retrievedDocs?: any[];
    weatherSnapshot?: any;
    visionResult?: any;
    finalAnswer?: string;
    citations?: any[];
    confidenceLevel?: string;
}

export interface AgentResult {
    success: boolean;
    data?: any;
    error?: string;
}

export interface IAgent {
    name: string;
    goal: string;
    allowedTools: ToolName[];
    run(context: AgentContext): Promise<AgentResult>;
}

export class ToolDispatcher {
    static checkAccess(agentName: string, allowed: ToolName[], requestedTool: ToolName) {
        if (!allowed.includes(requestedTool)) {
            console.error(`[Security] Agent '${agentName}' blocked from using tool: ${requestedTool}`);
            throw new Error(`Access Denied: Agent ${agentName} cannot use ${requestedTool}`);
        }
    }
}
