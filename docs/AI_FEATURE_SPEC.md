# Product Spec: Climate Space AI Assistant

## 1. Feature Overview
**Name:** Climate Space AI (The "Agri-Search Engine")
**Type:** Retrieval-Augmented Generation (RAG) Chatbot & Insight Engine
**Goal:** To democratize access to climate science and agricultural expertise for Zimbabweans, enabling data-driven adaptation decisions.

## 2. Target Audience
1.  **Small-Scale Farmers (Primary):** Need immediate, practical advice on planting, pest control, and weather patterns specific to their region (e.g., Masvingo, Manicaland).
2.  **Students & Researchers:** Need summaries of local climate reports, definitions of terms, and data trends.
3.  **Community Leaders:** Need strategies for water conservation and disaster preparedness to share with their villages.

## 3. Core Capabilities (What the AI Does)
*   **Localized Advisory:** Answers agricultural questions based on specific Zimbabwean regions and soil types.
*   **Weather Interpretation:** Translates raw weather data (e.g., "50mm rainfall expected") into actionable advice (e.g., "Good time to plant sunflowers, bad for drying maize").
*   **Pest & Disease ID:** Identifies common local threats (Fall Armyworm, Tuta Absoluta) from descriptions and suggests eco-friendly remedies.
*   **Climate Education:** Simplifies complex concepts (El Niño, Carbon Sequestration) into plain English, Shona, or Ndebele (future capability).

## 4. Example User Prompts
*   **The Farmer:** "I live in Domboshava. The rains are late. Should I still plant maize, or switch to sorghum?"
*   **The Student:** "Summarize the impact of the 2024 El Niño on Zimbabwe's water table."
*   **The Community Member:** "How can we build a low-cost rainwater harvesting system using local materials?"
*   **The Creative:** "Give me 5 metaphors to describe climate change to a grandmother."

## 5. Limitations (What it Does NOT Do)
*   **No Real-Time Forecasting:** It does *not* generate its own weather predictions. It retrieves existing forecasts from the Meteorological Services Department (MSD).
*   **No Legal/Financial Advice:** It cannot advise on land disputes, loan applications, or insurance claims.
*   **No Absolute Guarantees:** It provides *probabilities* and *best practices*, not guarantees of harvest success.
*   **No Medical Advice:** It cannot treat heatstroke or waterborne diseases; it must refer users to clinics.

## 6. Ethical Considerations & Guardrails
*   **Source Truth:** The AI must prioritize Zimbabwe-specific data sources (Agritex manuals, local university research) over generic global data which may not apply.
*   **Language & Tone:** Must remain respectful, empowering, and non-alarmist. Avoid "doom-mongering."
*   **Data Privacy:** Farmers' specific locations and yield data must be anonymized.
*   **Hallucination Handling:** If the AI does not know the answer (e.g., specific soil pH of a random plot), it must explicitly say "I don't know" rather than guessing.
*   **Disaster Protocol:** If a user reports an immediate emergency (flood, fire), the AI must immediately direct them to national emergency hotlines (CPU).

## 7. Technical Requirements (High Level)
*   **Input:** Text (Voice input planned for V2).
*   **Model:** LLM optimized for reasoning and instruction following.
*   **Context Window:** Sufficient for analyzing long agricultural manuals.
*   **Latency:** Low latency required for low-bandwidth environments (2G/3G).
