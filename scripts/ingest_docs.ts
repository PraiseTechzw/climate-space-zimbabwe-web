import fs from "fs";
import path from "path";
import { ingestDocument } from "../src/lib/rag/ingest";

async function main() {
    const docsDir = path.resolve(__dirname, "../docs");

    // Dummy ingestion script for MVP
    console.log(`[Script] Found docs directory: ${docsDir}`);

    const content = `# Agritex Maize Production Manual\nMaize should be planted between November 15 and December 15 in Zimbabwe. Apply Compound D fertilizer at 300kg/ha at planting...`;

    await ingestDocument({
        content,
        metadata: {
            title: "Agritex Maize Production Manual",
            region: "Mashonaland West",
            page: 12
        }
    });

    console.log("[Script] Ingestion completed.");
}

main().catch(console.error);
