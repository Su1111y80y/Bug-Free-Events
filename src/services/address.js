export const fetchCoordinates = async (address) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address
            )}`
        );
        const data = await response.json();
        if (data.length > 0) {
            return { lat: data[0].lat, lon: data[0].lon };
        } else {
            return { lat: null, lon: null };
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return { lat: null, lon: null };
    }
};

export const fetchAddressSuggestions = async (value) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                value
            )}&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
};
