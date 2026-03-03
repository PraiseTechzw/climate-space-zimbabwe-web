"use server";

import { fetchWeather } from "./client";

const ZIM_PLACES = [
    { name: "Harare", lat: -17.8292, lon: 31.0522 },
    { name: "Bulawayo", lat: -20.1436, lon: 28.5818 },
    { name: "Mutare", lat: -18.9728, lon: 32.6695 },
    { name: "Gweru", lat: -19.45, lon: 29.8167 },
    { name: "Kwekwe", lat: -18.9281, lon: 29.8149 },
    { name: "Kadoma", lat: -18.3333, lon: 29.9167 },
    { name: "Masvingo", lat: -20.0744, lon: 30.8328 },
    { name: "Chinhoyi", lat: -17.3667, lon: 30.2 },
    { name: "Marondera", lat: -18.1833, lon: 31.55 },
    { name: "Norton", lat: -17.8833, lon: 30.7 },
    { name: "Chegutu", lat: -18.1333, lon: 30.15 },
    { name: "Bindura", lat: -17.3, lon: 31.3333 },
    { name: "Zvishavane", lat: -20.3267, lon: 30.0665 },
    { name: "Victoria Falls", lat: -18.9286, lon: 25.8203 },
    { name: "Chitungwiza", lat: -18.0125, lon: 31.0756 },
    { name: "Ruwa", lat: -17.8893, lon: 31.2447 },
    { name: "Epworth", lat: -17.89, lon: 31.1475 },
    { name: "Kariba", lat: -16.5167, lon: 28.8 },
    { name: "Hwange", lat: -18.3647, lon: 26.5019 },
    { name: "Beitbridge", lat: -22.2167, lon: 30.0 },
    { name: "Plumtree", lat: -20.4869, lon: 27.8105 },
    { name: "Gokwe", lat: -18.2048, lon: 28.9349 },
    { name: "Mt Darwin", lat: -16.7806, lon: 31.5833 },
    { name: "Mutoko", lat: -17.4083, lon: 32.2269 },
    { name: "Nyanga", lat: -18.2167, lon: 32.7333 },
    { name: "Chipinge", lat: -20.1883, lon: 32.6236 },
    { name: "Chiredzi", lat: -21.05, lon: 31.6667 },
    { name: "Shurugwi", lat: -19.6702, lon: 30.0059 },
    { name: "Redcliff", lat: -19.0333, lon: 29.7833 },
    { name: "Karoi", lat: -16.8099, lon: 29.6925 }
];

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export async function fetchSmartLocationsWeather(userLat: number, userLon: number) {
    // Sort cities by actual geographic proximity to user
    const nearbyPlaces = ZIM_PLACES.map(place => ({
        ...place,
        distance: getDistance(userLat, userLon, place.lat, place.lon)
    })).sort((a, b) => a.distance - b.distance);

    // Take the closest 8 places
    const closest8 = nearbyPlaces.slice(0, 8);

    const weatherList = await Promise.all(
        closest8.map(async (place) => {
            // Pass coordinates but name it gracefully
            const data = await fetchWeather(`${place.lat},${place.lon}`, `${place.name}, ZW`);
            return {
                name: place.name,
                distance: place.distance.toFixed(0), // Provide distance tracking if needed
                data
            };
        })
    );

    return weatherList;
}

export async function fetchFallbackWeather() {
    // If no coordinates provided, fallback to top 8 major defaults
    const default8 = ZIM_PLACES.slice(0, 8);
    return Promise.all(
        default8.map(async (place) => {
            const data = await fetchWeather(`${place.lat},${place.lon}`, `${place.name}, ZW`);
            return { name: place.name, data };
        })
    );
}
