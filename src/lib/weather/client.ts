export interface WeatherSnapshot {
    location: string;
    observedAt: string;
    temp: number;
    humidity: number;
    rainfall: number;
    wind: number;
    forecastSummary?: string;
    alerts?: string[];
    unavailable?: boolean;
}

import { getCachedWeather, setCachedWeather } from "./cache";

export async function fetchWeather(location: string, customDisplayName?: string): Promise<WeatherSnapshot | null> {
    const cached = getCachedWeather(location);
    if (cached) return cached;

    try {
        console.log("[Weather] Fetching real weather data for", location);

        let lat = -17.8292; // default Harare
        let lon = 31.0522;
        let resolvedLocation = location;

        // Check if location is "lat,lon" format using a regex or simple float check
        if (location.includes(',')) {
            const parts = location.split(',');
            const potentialLat = parseFloat(parts[0]);
            const potentialLon = parseFloat(parts[1]);

            if (!isNaN(potentialLat) && !isNaN(potentialLon)) {
                lat = potentialLat;
                lon = potentialLon;
                resolvedLocation = `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`;
            } else {
                // If it's a city string like "Chinhoyi, ZW", we fallback to geocoding
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
                const geoData = await geoRes.json();
                if (geoData.results && geoData.results.length > 0) {
                    lat = geoData.results[0].latitude;
                    lon = geoData.results[0].longitude;
                    resolvedLocation = `${geoData.results[0].name}, ${geoData.results[0].country}`;
                }
            }
        } else {
            // Use open-meteo geocoding API to resolve the city name
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();
            if (geoData.results && geoData.results.length > 0) {
                lat = geoData.results[0].latitude;
                lon = geoData.results[0].longitude;
                resolvedLocation = `${geoData.results[0].name}, ${geoData.results[0].country}`;
            }
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&timezone=Africa%2FHarare`);
        const weatherData = await weatherRes.json();
        const current = weatherData.current;

        if (!current) {
            throw new Error("Weather data missing 'current' field");
        }

        const snapshot: WeatherSnapshot = {
            location: customDisplayName || resolvedLocation,
            observedAt: current.time,
            temp: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            rainfall: current.precipitation,
            wind: current.wind_speed_10m,
            forecastSummary: `Currently ${current.temperature_2m}°C with ${current.precipitation}mm rainfall.`,
            alerts: []
        };

        setCachedWeather(location, snapshot);
        return snapshot;
    } catch (err) {
        console.error(`[Weather] Unavailable for location: ${location}`, err);
        return null; // Must fail safely and not hallucinate
    }
}
