# Module 1: AI & Core Engine - Climate Space Agri-Search

## Architecture Diagram (Components & Data Flow)

```text
[Frontend / Client] 
      │ 
      ├──> POST /api/ai/pest (Image)  --> [AgentOrchestrator]
      │                                       ├──> [PestVisionAgent] (Tool: cvInfer)
      │                                       └──> [AgronomyAnswerAgent]
      │
      ├──> POST /api/ai/search (Query + Location) --> [AgentOrchestrator]
      │                                                   │
      │                                                   ├──> 1. [WeatherAgent] (Tool: weatherFetch) -> Snapshot
      │                                                   ├──> 2. [RetrievalAgent] (Tool: vectorSearch) -> RAG Context
      │                                                   │
      │                                                   └──> 3. [AgronomyAnswerAgent]
      │                                                             └──> [IntelligentRouter]
      │                                                                    ├──> Filter by capabilities (JSON/Vision)
      │                                                                    ├──> Circuit breaker checks
      │                                                                    └──> Selects Provider (OpenAI/Anthropic/Meta/Ollama/Gemini)
      │
      └──> 4. [PolicyGuardAgent] -> Validate output (Safety, Cites, Hallucinated Climate Check)
                  │
                  └──> Final JSON Response -> [Frontend]
```

## Setup Env Vars

Create a `.env.local` file with the following configurations:

```env
# Cloud Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# Meta/OpenAI Compatible
META_API_KEY=sk-...
META_BASE_URL=https://api.meta-compatible.com/v1

# Local Llama Runtime
OLLAMA_BASE_URL=http://127.0.0.1:11434

# Vector DB
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=ey...

# Router Options
AI_PRIVACY_MODE_DEFAULT=false    # Set true to enforce 'local_only' models
AI_ROUTER_POLICY_DEFAULT=balanced # "local_first", "lowest_cost", "highest_quality"

# Health check admin
ADMIN_SECRET=super_secret_token
```

## Extensible Agent System

The core engine contains self-contained agents that hold precise logic with explicitly allowed tools:
- **RetrievalAgent**: Maps search semantics to Agritex pgvector storage. Can only use `vectorSearch`.
- **WeatherAgent**: Looks up location bounding boxes and fetches real-time climate data. Can only use `weatherFetch`.
- **PestVisionAgent**: Detects objects natively safely.
- **AgronomyAnswerAgent**: Merges contexts into structured JSON formatting. No IO tool access.
- **PolicyGuardAgent**: Uses hard regex and logic layers to strip out dangerous content / enforce required RAG citations.

## Extensible AI Router

The engine leverages `IProvider` logic enabling us to swap adapters trivially:
- **OpenAI**: Primary fallback for High Quality / Tools
- **Anthropic (Claude)**: Cheap summarizing + Classifying
- **Gemini**: Cheap Multimodal vision mapping
- **Meta/Llama**: Used iteratively when configured
- **Ollama**: Enforced strictly for `PrivacyTier: "local_only"` runs.

## Running Data & Example `curl`

### Run Dev Server
```bash
npm run dev
```

### Search Endpoint Query
**Request:**
```bash
curl -X POST http://localhost:3000/api/ai/search \
  -H 'Content-Type: application/json' \
  -d '{
    "userQuery": "When should I plant maize and how much fertilizer do I need?",
    "location": "Mashonaland West",
    "crop": "Maize"
  }'
```

**Response:**
*(Trace output is `undefined` in production safely mapping traces only to devs)*
```json
{
  "answerMarkdown": "According to [Source 1], Maize should be planted between November 15 and December 15 in Zimbabwe. Apply Compound D fertilizer at 300kg/ha at planting.",
  "actionChecklist": [
    "Secure Compound D Fertilizer",
    "Prepare field by November 1"
  ],
  "citations": [
    {
      "title": "Agritex Maize Production Manual",
      "pageOrSection": "Page 12"
    }
  ],
  "confidenceLevel": "high",
  "followUpQuestions": [
    "How much fertilizer do I need applied next?",
    "When is the best time to irrigate?"
  ],
  "usedWeather": false,
  "weatherNote": "Weather unavailable",
  "providerTrace": "openai"
}
```

### Server Health & AI Circuit Breakers
```bash
curl -H "Authorization: Bearer super_secret_token" http://localhost:3000/api/ai/health
```

**Response:**
```json
{
  "health": {
    "openai": "ok",
    "anthropic": "ok",
    "gemini": "circuit_open",
    "ollama": "ok",
    "meta": "ok"
  }
}
```
