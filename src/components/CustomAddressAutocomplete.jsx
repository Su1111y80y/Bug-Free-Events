import { useState, useEffect } from "react";
import { fetchAddressSuggestions } from "../services/adress";
import debounce from "lodash/debounce";

const CustomAddressAutocomplete = ({ onAddressSelect, value, name }) => {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState([]);

    // Debounced function to fetch suggestions
    const fetchSuggestions = debounce(async (value) => {
        if (!value) {
            setSuggestions([]);
            return;
        }

        const data = await fetchAddressSuggestions(value);

        console.log("thisi", data);
        console.log("thisiq", value);

        if (data.length > 0 && data[0].display_name === value) {
            setSuggestions([]);
        } else {
            setSuggestions(data);
        }
    }, 300);

    useEffect(() => {
        fetchSuggestions(query);
        return () => fetchSuggestions.cancel();
    }, [query]);

    useEffect(() => {
        setQuery(value);
    }, [value]);

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Enter address..."
                value={query}
                name={name}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-bordered input-primary w-full"
            />
            {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 z-[1000]">
                    {suggestions.map((item) => (
                        <div
                            key={item.place_id}
                            onClick={() => {
                                onAddressSelect(item.display_name);
                                setQuery(item.display_name);
                                setSuggestions([]);
                            }}
                            className="p-2 cursor-pointer"
                        >
                            {item.display_name}
                        </div>
                    ))}
                </div>
            )}
            <p className="text-sm text-gray-500">
                Your address details are not publicly visible.
            </p>
        </div>
    );
};

export default CustomAddressAutocomplete;
