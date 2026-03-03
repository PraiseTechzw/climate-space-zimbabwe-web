import { WeatherSnapshot } from "./client";

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
    snapshot: WeatherSnapshot;
    timestamp: number;
}

// In-memory cache for simplicity, could be Redis in production.
const cache = new Map<string, CacheEntry>();

export function getCachedWeather(location: string): WeatherSnapshot | null {
    const entry = cache.get(location.toLowerCase());
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_TTL) {
        cache.delete(location.toLowerCase()); // Expired
        return null;
    }

    return entry.snapshot;
}

export function setCachedWeather(location: string, snapshot: WeatherSnapshot): void {
    cache.set(location.toLowerCase(), {
        snapshot,
        timestamp: Date.now()
    });
}
