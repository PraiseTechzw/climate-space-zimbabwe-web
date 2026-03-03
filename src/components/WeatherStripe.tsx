"use client";

import { useEffect, useState } from "react";
import { fetchSmartLocationsWeather, fetchFallbackWeather } from "@/lib/weather/smartStripe";
import { WeatherSnapshot } from "@/lib/weather/client";

interface WeatherDisplayItem {
    name: string;
    distance?: string;
    data: WeatherSnapshot | null;
}

export default function WeatherStripe() {
    const [weatherList, setWeatherList] = useState<WeatherDisplayItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initWeather() {
            try {
                // Fetch the user's approximate lat/lon using IP-based fast service 
                // This prevents annoying browser permission popups while still being very accurate
                const geoRes = await fetch("https://ipapi.co/json/");
                const geoData = await geoRes.json();

                if (geoData.latitude && geoData.longitude && geoData.country_code === "ZW") {
                    // They are in Zimbabwe! Fetch intelligently sorted nearby major and non-major cities
                    const sortedWeather = await fetchSmartLocationsWeather(geoData.latitude, geoData.longitude);
                    setWeatherList(sortedWeather);
                } else {
                    // Fallback to top major cities if they aren't in ZW or IP lookup fails
                    const fallback = await fetchFallbackWeather();
                    setWeatherList(fallback);
                }
            } catch (err) {
                console.error("Smart location failed, falling back...", err);
                const fallback = await fetchFallbackWeather();
                setWeatherList(fallback);
            } finally {
                setLoading(false);
            }
        }

        initWeather();
    }, []);

    if (loading || weatherList.length === 0) {
        return null; // Don't show until data is ready for a clean entrance
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90vw] md:w-auto max-w-4xl pointer-events-auto animate-in slide-in-from-bottom-[50px] fade-in duration-700">
            <div className="relative rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_12px_40px_rgba(16,185,129,0.15)] overflow-hidden flex items-center py-2 group hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-500 will-change-transform hover:shadow-[0_12px_50px_rgba(16,185,129,0.25)] hover:-translate-y-1">

                {/* Glowing edge sweep effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(90deg,transparent_0%,rgba(52,211,153,0.1)_50%,transparent_100%)]"></div>

                {/* Left gradient mask to fade text elegantly */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 pointer-events-none rounded-l-full"></div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes slide-infinite {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-ticker {
                        display: flex;
                        animation: slide-infinite 45s linear infinite;
                    }
                    .group:hover .animate-ticker {
                        animation-play-state: paused;
                    }
                `}} />

                {/* Scrolling Engine */}
                <div className="animate-ticker w-max flex items-center shrink-0 pl-12 pr-4 relative z-0">
                    {[...weatherList, ...weatherList].map((item, i) => (
                        <div key={`${item.name}-${i}`} className="flex items-center mx-6 gap-3 text-sm whitespace-nowrap">

                            <span className="font-bold tracking-wide text-[15px] bg-gradient-to-br from-emerald-600 to-teal-800 dark:from-emerald-400 dark:to-teal-200 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-1">
                                {item.name}
                                {item.distance && <span className="text-[10px] bg-emerald-100/50 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 px-1.5 py-0.5 rounded-md ml-1 tracking-tight drop-shadow-none">~{item.distance}km</span>}
                            </span>

                            {item.data ? (
                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                                    <span className="flex items-center gap-1.5 bg-white/60 dark:bg-black/30 px-3 py-1.5 rounded-full text-xs box-shadow-sm border border-black/5 dark:border-white/5">
                                        <span className="text-orange-500/90 text-sm">☀</span>
                                        {item.data.temp}°C
                                    </span>
                                    <span className="flex items-center gap-1.5 opacity-80 text-xs">
                                        <span className="text-blue-500/90 text-sm">💧</span>
                                        {item.data.humidity}%
                                    </span>
                                    <span className="flex items-center gap-1.5 opacity-80 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="text-emerald-500/80 text-sm">🍃</span>
                                        {item.data.wind} km/h
                                    </span>
                                </div>
                            ) : (
                                <span className="opacity-50 text-xs italic bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full">Offline</span>
                            )}

                            {/* Futuristic Dot separator */}
                            <div className="mx-2 h-1.5 w-1.5 rounded-full bg-emerald-200 dark:bg-emerald-800/50 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        </div>
                    ))}
                </div>

                {/* Right gradient mask to fade text elegantly */}
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white/90 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 pointer-events-none rounded-r-full"></div>
            </div>
        </div>
    );
}
