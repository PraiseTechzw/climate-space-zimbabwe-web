import { IAgent, AgentContext, AgentResult, ToolName, ToolDispatcher } from "./base";

export class PestVisionAgent implements IAgent {
    name = "PestVisionAgent";
    goal = "Classify agricultural pests from user images safely.";
    allowedTools: ToolName[] = ["cvInfer"];

    async run(context: AgentContext): Promise<AgentResult> {
        try {
            ToolDispatcher.checkAccess(this.name, this.allowedTools, "cvInfer");

            if (!context.imageBuffer) return { success: true, data: null };

            // Pseudo inference mimicking CV endpoint
            const result = {
                pestName: "Fall Armyworm",
                confidence: 0.92,
                top3: ["Fall Armyworm", "African Armyworm", "Cutworm"],
            };

            return {
                success: true,
                data: result
            };
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }
}
