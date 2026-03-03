import { aiRouter } from "../ai/routing/router";
import { supabaseAdmin } from "../supabase";

export interface RetrievedDoc {
    content: string;
    metadata: Record<string, any>;
    similarity: number;
}

export async function retrieveContext(query: string, topK: number = 8, threshold: number = 0.76): Promise<RetrievedDoc[]> {
    try {
        const queryEmbeddings = await aiRouter.embed({ texts: [query] });
        const embedding = queryEmbeddings.embeddings[0];

        if (!embedding || embedding.length === 0) {
            console.warn("[Retrieval] Empty embedding returned, skipping vector search.");
            return [];
        }

        // match_documents is a Postgres RPC using pgvector
        const { data, error } = await supabaseAdmin.rpc("match_documents", {
            query_embedding: embedding,
            match_threshold: threshold,
            match_count: topK
        });

        if (error) {
            console.error("[Retrieval] Database search error", error);
            return [];
        }

        return (data || []).map((row: any) => ({
            content: row.content,
            metadata: row.metadata,
            similarity: row.similarity
        }));
    } catch (e: any) {
        console.warn(`[Retrieval] Context retrieval unavailable: ${e.message}. Proceeding without RAG context.`);
        return [];
    }
}
