import { IAgent, AgentContext, AgentResult, ToolName, ToolDispatcher } from "./base";
import { fetchWeather } from "../../weather/client";

export class WeatherAgent implements IAgent {
    name = "WeatherAgent";
    goal = "Fetches accurate climate data without extrapolating defaults.";
    allowedTools: ToolName[] = ["weatherFetch"];

    async run(context: AgentContext): Promise<AgentResult> {
        try {
            ToolDispatcher.checkAccess(this.name, this.allowedTools, "weatherFetch");

            if (!context.location) {
                return { success: true, data: null }; // No location provided
            }

            const snapshot = await fetchWeather(context.location);
            if (!snapshot) {
                return { success: true, data: { unavailable: true } };
            }

            return {
                success: true,
                data: snapshot
            };
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }
}
