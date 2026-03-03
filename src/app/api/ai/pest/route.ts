import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "../../../../lib/ai/agents/orchestrator";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const reqId = uuidv4();
    try {
        const formData = await req.formData();
        const image = formData.get("image") as File;
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        console.log(`[Pest API] Processing image ID: ${reqId}. Size: ${buffer.length}`);

        const userQuery = formData.get("userQuery") as string;

        // If there's an image, feed it via orchestrator vision task, or just direct cv Infer.
        // For specific PEST inference route, we just query with context
        const data = await orchestrator.processSearch({
            query: userQuery || "Identify the pest in this image and recommend safe next steps.",
            imageBuffer: buffer
        });

        return NextResponse.json({
            pestName: data.visionResult?.pestName || "Unknown",
            confidence: data.visionResult?.confidence || 0,
            candidates: data.visionResult?.top3 || [],
            recommendedActionContext: data.answerMarkdown // Provide full actionable answer
        });
    } catch (error) {
        console.error(`[Pest API] Error ID: ${reqId}`, error);
        return NextResponse.json({ error: "Inference failed" }, { status: 500 });
    }
}
