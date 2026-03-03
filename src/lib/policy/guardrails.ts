export interface PolicyCheckResult {
    passed: boolean;
    reason?: string;
    safeResponse?: string;
}

export function enforcePolicyGuardrails(response: string, hasCitations: boolean, usedWeather: boolean): PolicyCheckResult {
    const badPatterns = [
        /mix\s.*(?:parathion|cyanide|organophosphate)/i, // Harmful chemicals
        /cure.*(?:cancer|hiv|aids)/i, // Medical claims
        /burn\b.*\b(plastics|tyres)/i // Illegal/Harmful instructions
    ];

    for (const pattern of badPatterns) {
        if (pattern.test(response)) {
            return {
                passed: false,
                reason: "Detected disallowed safety, medical, or chemical instructions.",
                safeResponse: "I am unable to provide instructions involving restricted chemicals, unsafe burning practices, or medical diagnoses. Please consult local Agritex guidelines or authorities."
            };
        }
    }

    if (!hasCitations && response.includes("According to Agritex")) {
        return {
            passed: false,
            reason: "Hallucinated citation.",
            safeResponse: "I don't have enough verified local references to support this specific answer. Could you provide more context?"
        };
    }

    return { passed: true };
}
