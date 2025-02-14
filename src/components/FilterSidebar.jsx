import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Import a proper search icon
import { toast } from "react-toastify";
import Button from "./ui/Button"; // Adjust the import path as needed
import { getAllEvents } from "../services/eventsApi";

function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({ location: "", search: "" });
  const [locations, setLocations] = useState([]);
  const [email, setEmail] = useState("");

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
    const emailInput = document.getElementById("email-input");
    if (emailInput.checkValidity()) {
      toast.success("Alerts added successfully!");
    } else {
      emailInput.reportValidity();
    }
  };

  return (
    <div className="w-full md:w-1/5 bg-gray-800 p-6 mt-12 shadow-lg rounded-lg flex flex-col gap-6 max-h-[68vh] overflow-y-auto">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search for event"
          value={filters.search}
          onChange={handleChange}
          className="w-full px-4 py-3 input input-bordered input-primary pl-10 text-gray-200 rounded-lg outline-none placeholder-gray-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
      </div>

      <div className="border-b border-gray-700 pb-4">
        <label className="block text-gray-200 font-semibold mb-2">Location</label>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="select select-bordered select-primary w-full px-4 py-2 rounded-lg text-gray-200"
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

      <div className="bg-gray-700 p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-200">Stay in the loop</h3>
        <p className="text-gray-400 text-sm mt-1">
          Get notified about new events, discounts, and much more!
        </p>
        <input
          id="email-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered input-primary w-full px-3 py-2 mt-3 rounded-lg text-gray-200"
          pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
          required
        />
        <Button
          type="button"
          text="Create alerts"
          className="btn-primary w-full py-2 mt-3"
          onClick={handleCreateAlerts}
        />
      </div>
    </div>
  );
}

export default FilterSidebar;
