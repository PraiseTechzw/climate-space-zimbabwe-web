export interface WeatherSnapshot {
    location: string;
    observedAt: string;
    temp: number;
    humidity: number;
    rainfall: number;
    wind: number;
    forecastSummary?: string;
    alerts?: string[];
}

import { getCachedWeather, setCachedWeather } from "./cache";

export async function fetchWeather(location: string): Promise<WeatherSnapshot | null> {
    // Check Cache first
    const cached = getCachedWeather(location);
    if (cached) return cached;

    try {
        // API Call Mock for Zimbabwe MSD / OpenWeatherMap
        // Real API URL integration goes here.
        console.log("[Weather] Fetching new weather data for", location);

        // Simulate Fetch Delay
        await new Promise(r => setTimeout(r, 500));

        // Simulated Response
        const snapshot: WeatherSnapshot = {
            location,
            observedAt: new Date().toISOString(),
            temp: 24.5,
            humidity: 60,
            rainfall: 0,
            wind: 12,
            forecastSummary: "Partly cloudy with scattered showers later in the week.",
            alerts: []
        };

        setCachedWeather(location, snapshot);
        return snapshot;
    } catch (err) {
        console.error(`[Weather] Unavailable for location: ${location}`, err);
        return null; // Must fail safely and not hallucinate
    }
}
