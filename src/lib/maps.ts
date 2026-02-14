
export interface PlaceResult {
    id: string;
    name: string;
    type: string;
    lat: number;
    lng: number;
    vicinity?: string; // Address
    category?: string;
    distance?: number;
}

interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address?: any;
}

export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const searchNearbyPlaces = async (
    location: { lat: number; lng: number },
    query: string
): Promise<PlaceResult[]> => {
    try {
        // Nominatim Search API (Free, OpenStreetMap)
        // We use a viewbox to bias results towards the user's location
        // Approximately 0.1 degree is roughly 10km
        const viewbox = [
            location.lng - 0.1, // left
            location.lat + 0.1, // top
            location.lng + 0.1, // right
            location.lat - 0.1  // bottom
        ].join(',');

        const params = new URLSearchParams({
            q: query,
            format: 'json',
            limit: '20',
            viewbox: viewbox,
            bounded: '1', // restrict to viewbox as much as possible
            addressdetails: '1'
        });

        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
            headers: {
                'User-Agent': 'NexusAI-StudentApp/1.0' // Nominatim requires a User-Agent
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim API Error: ${response.statusText}`);
        }

        const results: NominatimResult[] = await response.json();

        return results.map((place) => ({
            id: place.place_id.toString(),
            name: place.display_name.split(',')[0], // Take first part as name
            type: place.type.replace(/_/g, ' '),
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            vicinity: place.display_name.split(',').slice(1).join(',').trim(), // Rest is address
            category: place.class
        }));

    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
};
