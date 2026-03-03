import { AgentContext } from "./base";
import { RetrievalAgent } from "./RetrievalAgent";
import { WeatherAgent } from "./WeatherAgent";
import { PestVisionAgent } from "./PestVisionAgent";
import { AgronomyAnswerAgent } from "./AgronomyAnswerAgent";

export class AgentOrchestrator {
    private retrieval = new RetrievalAgent();
    private weather = new WeatherAgent();
    private vision = new PestVisionAgent();
    private synthesis = new AgronomyAnswerAgent();

    async processSearch(context: AgentContext) {
        console.log(`[Orchestrator] Starting processing pipeline for query: "${context.query}"`);

        // 1. Parallel Independent Tasks (Retrieval, Weather, Vision if applicable)
        const [retResult, weaResult, visResult] = await Promise.all([
            this.retrieval.run(context),
            this.weather.run(context),
            context.imageBuffer ? this.vision.run(context) : Promise.resolve({ success: true, data: null })
        ]);

        // Construct enriched context
        const enrichedContext: AgentContext = {
            ...context,
            retrievedDocs: retResult.success ? retResult.data.docs : [],
            citations: retResult.success ? retResult.data.citations : [],
            confidenceLevel: retResult.success ? retResult.data.confidenceLevel : "low",
            weatherSnapshot: weaResult.data,
            visionResult: visResult.data,
        };

        // 2. Synthesize with LLM Agent
        const finalRes = await this.synthesis.run(enrichedContext);

        // If repair fails entirely, fallback gracefully
        if (!finalRes.success) {
            return {
                answerMarkdown: "I'm unable to answer this question due to safety constraints or missing verified context.",
                actionChecklist: [],
                citations: [],
                confidenceLevel: "low",
                followUpQuestions: ["Could you rephrase?"],
                usedWeather: false,
                error: finalRes.error
            };
        }

        // Assembly output
        const data = finalRes.data;
        const isWeatherAvailable = weaResult.success && !weaResult.data?.unavailable && weaResult.data;

        return {
            answerMarkdown: data.answerMarkdown,
            actionChecklist: data.actionChecklist,
            citations: enrichedContext.citations || [],
            confidenceLevel: enrichedContext.confidenceLevel,
            followUpQuestions: data.followUpQuestions,
            usedWeather: !!isWeatherAvailable,
            weatherNote: isWeatherAvailable ? undefined : "Weather unavailable",
            providerTrace: process.env.NODE_ENV === "development" ? data.providerTrace : undefined,
            visionResult: enrichedContext.visionResult
        };
    }
}

export const orchestrator = new AgentOrchestrator();
