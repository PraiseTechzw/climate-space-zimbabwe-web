import { IAgent, AgentContext, AgentResult, ToolName } from "./base";

export class PolicyGuardAgent implements IAgent {
    name = "PolicyGuardAgent";
    goal = "Prevent hallucination + block harmful advice + check citation validity.";
    allowedTools: ToolName[] = [];

    async run(context: AgentContext): Promise<AgentResult> {
        const text = context.finalAnswer || "";
        const hasCitations = context.retrievedDocs && context.retrievedDocs.length > 0;

        const checks = [
            { pattern: /mix\s.*(?:parathion|cyanide|organophosphate)/i, msg: "Dangerous chemical formulas detected." },
            { pattern: /cure.*(?:cancer|hiv|aids)/i, msg: "Medical claims are restricted." },
            { pattern: /burn\b.*\b(plastics|tyres)/i, msg: "Harmful environmental instructions." },
        ];

        for (const c of checks) {
            if (c.pattern.test(text)) {
                return { success: false, error: c.msg };
            }
        }

        if (!hasCitations && text.includes("According to Agritex")) {
            return { success: false, error: "Hallucinated citation when context is empty." };
        }

        if (context.weatherSnapshot?.unavailable && /\b(will rain|forecast|sunny tomorrow)\b/i.test(text)) {
            return { success: false, error: "Hallucinates projected weather when weather unavailable." };
        }

        return { success: true };
    }
}
