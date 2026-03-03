import { IAgent, AgentContext, AgentResult, ToolName } from "./base";
import { aiRouter, RouteConstraints } from "../routing/router";
import { PolicyGuardAgent } from "./PolicyGuardAgent";

export class AgronomyAnswerAgent implements IAgent {
    name = "AgronomyAnswerAgent";
    goal = "Synthesize final output grounded heavily on retrieval + weather constraints.";
    allowedTools: ToolName[] = []; // Only logic, doesn't execute IO tools

    async run(context: AgentContext, repairInstructions?: string): Promise<AgentResult> {
        const hasCitations = context.retrievedDocs && context.retrievedDocs.length > 0;
        const weatherNote = context.weatherSnapshot?.unavailable
            ? "Weather unavailable. Do not predict weather."
            : context.weatherSnapshot ? `Weather: ${JSON.stringify(context.weatherSnapshot)}` : "No weather context used.";
        const visionNote = context.visionResult ? `Image Analysis: ${JSON.stringify(context.visionResult)}` : "";

        const docsBlock = (context.retrievedDocs || []).map((d, i) => `[Source ${i + 1}]: ${d.content}`).join("\n\n");

        let systemPrompt = `You are the Agronomy Assistant for Climate Space Zimbabwe.
Rules:
1. Base your answer strictly on the provided Context. Cite correctly like [Source 1].
2. Respect local units (metric) and timing for Zimbabwe context.
3. If weather is unavailable, state it clearly. Never invent climates.
4. Provide action checklists. Do not give medical or dangerous chemical mixing advice.

Context:
${docsBlock}
---
${weatherNote}
${visionNote}
`;

        if (repairInstructions) {
            systemPrompt += `\n[Policy Repair Task]: The previous generated answer violated rules: "${repairInstructions}". You must fix this explicitly.`;
        }

        const constraints: RouteConstraints = {
            requiresJson: true
        };

        try {
            // 1. Generation
            const response = await aiRouter.chat("rag_qa", {
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: context.query }
                ],
                jsonSchema: {
                    type: "object",
                    properties: {
                        answerMarkdown: { type: "string" },
                        actionChecklist: { type: "array", items: { type: "string" } },
                        followUpQuestions: { type: "array", items: { type: "string" } }
                    },
                    required: ["answerMarkdown", "actionChecklist", "followUpQuestions"],
                    additionalProperties: false
                }
            }, constraints);

            const parsed = JSON.parse(response.content);

            // We apply PolicyGuard iteratively if not repairing already
            if (!repairInstructions) {
                const guard = new PolicyGuardAgent();
                const guardResult = await guard.run({ ...context, finalAnswer: parsed.answerMarkdown });
                if (!guardResult.success && guardResult.error) {
                    console.warn(`[Agent] Policy exception. Attempting self-repair on: ${guardResult.error}`);
                    return this.run(context, guardResult.error);
                }
            }

            return {
                success: true,
                data: {
                    answerMarkdown: parsed.answerMarkdown,
                    actionChecklist: parsed.actionChecklist,
                    followUpQuestions: parsed.followUpQuestions,
                    providerTrace: response.provider // strictly for debugging/internal tracking
                }
            };
        } catch (e: any) {
            return { success: false, error: e.message };
        }
    }
}
