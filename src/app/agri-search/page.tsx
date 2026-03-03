"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, MapPin, Leaf, FileImage, Loader2, Bot, User, CheckCircle2, ShieldAlert } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    isInitial?: boolean;
    citations?: { title: string; pageOrSection?: string; url?: string }[];
    checklist?: string[];
    weatherNote?: string;
    followUpQuestions?: string[];
    providerTrace?: string;
};

export default function AgriSearchPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "intro",
            role: "assistant",
            content: "Hello! I am the **Climate Space Agri-Search Assistant**. Ask me about planting, pest identification, weather, and localized Zimbabwean farming best practices. You can also upload a photo for pest/disease analysis!",
            isInitial: true,
        }
    ]);
    const [input, setInput] = useState("");
    const [location, setLocation] = useState("Harare");
    const [crop, setCrop] = useState("Maize");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() && !selectedFile) return;

        const query = input.trim();
        const photo = selectedFile;

        setInput("");
        setSelectedFile(null);

        // Optimistic user bubble
        const userMessageDetail = query + (photo ? `\n\n[Uploaded Image: ${photo.name}]` : "");
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMessageDetail }]);
        setIsLoading(true);

        try {
            let resData;

            // Decide which endpoint to hit.
            if (photo) {
                // Multi-part vision endpoint
                const formData = new FormData();
                formData.append("image", photo);
                if (query) formData.append("userQuery", query);

                const res = await fetch("/api/ai/pest", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();

                // Transform the structured pest logic to chat messages
                resData = {
                    answerMarkdown: data.recommendedActionContext || `Identified Pest: **${data.pestName}** (Confidence: ${(data.confidence * 100).toFixed(1)}%). Candidates: ${data.candidates?.join(", ")}.`,
                    followUpQuestions: ["How do I manage this pest safely?", "Which crop varieties are resistant?"],
                };
            } else {
                // Standard JSON query
                const res = await fetch("/api/ai/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userQuery: query,
                        location,
                        crop
                    })
                });
                resData = await res.json();
            }

            if (resData.error) {
                throw new Error(resData.error);
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: resData.answerMarkdown,
                citations: resData.citations,
                checklist: resData.actionChecklist,
                weatherNote: resData.weatherNote,
                followUpQuestions: resData.followUpQuestions,
                providerTrace: resData.providerTrace,
            }]);

        } catch (error: any) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I encountered an error connecting to the Agri-Search core engine. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFollowUp = (q: string) => {
        setInput(q);
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-col md:flex-row font-sans">

            {/* Sidebar for Location/Crop Preferences */}
            <aside className="w-full md:w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-8 shrink-0">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-emerald-600 p-2 rounded-xl">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Agri-Search</h1>
                            <p className="text-xs text-slate-500 font-medium">Climate Space AI Module</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                Current Location
                            </label>
                            <select
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Harare">Harare</option>
                                <option value="Bulawayo">Bulawayo</option>
                                <option value="Mashonaland West">Mashonaland West</option>
                                <option value="Manicaland">Manicaland</option>
                                <option value="Masvingo">Masvingo</option>
                                <option value="Matabeleland South">Matabeleland South</option>
                                <option value="">No Location</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Leaf className="w-4 h-4 text-emerald-500" />
                                Focus Crop context
                            </label>
                            <select
                                value={crop}
                                onChange={e => setCrop(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Maize">Maize</option>
                                <option value="Tobacco">Tobacco</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Sorghum">Sorghum</option>
                                <option value="Wheat">Wheat</option>
                                <option value="">General Farming</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                    <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> Policy Engine
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-500 leading-relaxed">
                        Answers are grounded on official Agritex manuals via Vector Search. Safety guardrails enforce medical & chemical constraints. Let's grow confidently. 🌱
                    </p>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-900 h-full overflow-hidden">

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {messages.map((m) => (
                        <div key={m.id} className={`flex max-w-3xl ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>

                            {m.role === "assistant" && (
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4 shrink-0 shadow-sm border border-emerald-200 dark:border-emerald-800">
                                    <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            )}

                            <div className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"} max-w-full`}>
                                <div
                                    className={`px-6 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed relative ${m.role === "user"
                                            ? "bg-slate-800 text-white rounded-br-sm max-w-[85%]"
                                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-bl-sm"
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap">{m.content}</div>

                                    {m.weatherNote && (
                                        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs flex items-start gap-2 border border-slate-100 dark:border-slate-700">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600 dark:text-slate-400">{m.weatherNote}</span>
                                        </div>
                                    )}

                                    {m.checklist && m.checklist.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Action Checklist</p>
                                            <ul className="space-y-2">
                                                {m.checklist.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {m.citations && m.citations.length > 0 && (
                                        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2 text-xs">
                                            <span className="font-semibold text-slate-500 mt-1">Sources:</span>
                                            {m.citations.map((c, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
                                                    {c.title} {c.pageOrSection ? `(${c.pageOrSection})` : ""}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {m.providerTrace && (
                                        <div className="absolute -bottom-6 left-2 text-[10px] text-slate-400 font-mono tracking-wider">
                                            Provider: {m.providerTrace}
                                        </div>
                                    )}
                                </div>

                                {m.followUpQuestions && m.followUpQuestions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2 ml-4">
                                        {m.followUpQuestions.map((fq, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleFollowUp(fq)}
                                                className="text-xs font-medium px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full transition-colors border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm"
                                            >
                                                {fq}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {m.role === "user" && (
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center ml-4 shrink-0 shadow-sm">
                                    <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium mr-auto max-w-3xl animate-pulse">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </div>
                            Processing through Agri-Search Orchestrator...
                        </div>
                    )}
                </div>

                {/* Dynamic Input Frame */}
                <div className="p-4 md:p-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 relative z-10 w-full">
                    <div className="max-w-4xl mx-auto flex flex-col gap-2 relative">

                        {/* Image attachment preview */}
                        {selectedFile && (
                            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg w-max mb-1">
                                <FileImage className="w-4 h-4 text-emerald-600" />
                                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{selectedFile.name}</span>
                                <button onClick={() => setSelectedFile(null)} className="ml-2 text-emerald-800/50 hover:text-emerald-800 font-bold">&times;</button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="relative flex items-end overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">

                            <div className="flex items-center justify-center p-3 shrink-0">
                                <label htmlFor="file-upload" className="cursor-pointer text-slate-400 hover:text-emerald-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                    <ImageIcon className="w-5 h-5" />
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    />
                                </label>
                            </div>

                            <textarea
                                placeholder="Ask about crops, soils, weather, or upload a pest photo..."
                                className="w-full bg-transparent border-none py-4 px-2 text-[15px] max-h-48 resize-none focus:outline-none focus:ring-0 dark:placeholder-slate-500 placeholder-slate-400"
                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />

                            <div className="p-3 shrink-0 flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={isLoading || (!input.trim() && !selectedFile)}
                                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-2 text-[11px] text-slate-400 font-medium">
                            Agri-Search can make mistakes. Always verify information with your local Agritex officer before applying chemicals.
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
