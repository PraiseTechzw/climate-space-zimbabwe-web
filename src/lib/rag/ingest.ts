import { aiRouter } from "../ai/routing/router";
import { supabaseAdmin } from "../supabase";

interface IngestOptions {
    content: string;
    metadata: Record<string, any>;
    chunkSize?: number;
    overlap?: number;
}

export async function ingestDocument({ content, metadata, chunkSize = 1000, overlap = 200 }: IngestOptions) {
    // Simple crude chunker
    const chunks = [];
    let i = 0;
    while (i < content.length) {
        const end = Math.min(i + chunkSize, content.length);
        chunks.push(content.substring(i, end));
        i += chunkSize - overlap;
    }

    console.log(`[Ingest] Chunking complete: ${chunks.length} chunks generated.`);

    for (const chunk of chunks) {
        const rawEmbeddings = await aiRouter.embed({ texts: [chunk] });
        const embedding = rawEmbeddings.embeddings[0];

        // Store in Supabase
        const { error } = await supabaseAdmin.from("documents").insert({
            content: chunk,
            metadata,
            embedding
        });

        if (error) {
            console.error("[Ingest] Failed to index chunk", error);
        }
    }

    console.log(`[Ingest] Indexed document: ${metadata.title}`);
}
