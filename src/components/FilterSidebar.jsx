import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import a proper search icon
import { toast } from "react-toastify";
import Button from "./ui/Button"; // Adjust the import path as needed
import { getAllEvents } from "../services/eventsApi";

function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({ location: "", search: "" });
  const [locations, setLocations] = useState([]);

  // Fetch events and extract unique locations when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        const results = data.results;
        const eventLocations = results.map((event) => event.location);
        // console.log(eventLocations);
        const uniqueLocations = [...new Set(eventLocations)].filter(Boolean);
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { location: "", search: "" };

    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleCreateAlerts = () => {
    toast.success("Alerts added successfully!");
  };

  return (
    <div
      className="w-full md:w-1/5 bg-white p-6 mt-12 shadow-lg rounded-lg flex flex-col gap-6 
    max-h-[65vh] overflow-y-auto"
    >
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search for event"
          value={filters.search}
          onChange={handleChange}
          className="w-full px-4 py-3 pl-10 text-gray-700 bg-gray-100 rounded-lg outline-none placeholder-gray-400"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="border-b pb-4">
        <label className="block text-gray-900 font-semibold mb-2">Location</label>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        text="Create filter"
        className="btn-neutral w-full py-3"
        onClick={handleClearFilters}
      />

      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-900">Stay in the loop</h3>
        <p className="text-gray-600 text-sm mt-1">
          Get notified about new events, discounts, and much more!
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 mt-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
        />
        <Button
          type="submit"
          text="Create alerts"
          className="btn-primary w-full py-2 mt-3"
          onClick={handleCreateAlerts}
        />
      </div>
    </div>
  );
}

export default FilterSidebar;
