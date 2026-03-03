import { IAgent, AgentContext, AgentResult, ToolName, ToolDispatcher } from "./base";
import { retrieveContext } from "../../rag/retrieve";

export class RetrievalAgent implements IAgent {
    name = "RetrievalAgent";
    goal = "Retrieves localized Agronomy context to constrain LLM halucination.";
    allowedTools: ToolName[] = ["vectorSearch"];

    async run(context: AgentContext): Promise<AgentResult> {
        try {
            ToolDispatcher.checkAccess(this.name, this.allowedTools, "vectorSearch");

            const queryContext = context.crop ? `${context.crop} in Zimbabwe` : "Zimbabwe Agritex";
            const docs = await retrieveContext(`${context.query} ${queryContext}`, 5, 0.76);

            const citations = docs.map((d: any) => ({
                title: d.metadata.title || "Agritex Source",
                pageOrSection: d.metadata.page ? `Page ${d.metadata.page}` : undefined,
                url: d.metadata.url
            }));

            return {
                success: true,
                data: {
                    docs,
                    citations,
                    confidenceLevel: docs.length > 0 ? "high" : "low"
                }
            };
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }
}
