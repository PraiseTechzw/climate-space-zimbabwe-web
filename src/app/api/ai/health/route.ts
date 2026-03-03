import { NextResponse } from "next/server";
import { aiRouter } from "../../../../lib/ai/routing/router";

export async function GET(req: Request) {
    // Simplistic admin check.
    const authHeader = req.headers.get("authorization");
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
        if (process.env.NODE_ENV !== "development") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    const result = aiRouter.getHealthSummary();
    return NextResponse.json({ health: result });
}
