import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { orchestrator } from "../../../../lib/ai/agents/orchestrator";
import { v4 as uuidv4 } from "uuid";

const searchSchema = z.object({
    userQuery: z.string().min(1).max(500),
    location: z.string().optional(),
    crop: z.string().optional(),
    languagePreference: z.string().default("en"),
});

export async function POST(req: NextRequest) {
    const reqId = uuidv4();
    console.log(`[AI Search API] Request started. ID: ${reqId}`);

    try {
        const body = await req.json();
        const result = searchSchema.parse(body);

        const { userQuery, location, crop } = result;

        const data = await orchestrator.processSearch({
            query: userQuery,
            location,
            crop
        });

        return NextResponse.json(data);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 });
        }
        console.error(`[AI Search API] Internal error. ID: ${reqId}`, error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
