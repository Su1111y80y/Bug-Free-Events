import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import FilterSidebar from "../components/FilterSidebar";
import { getAllEvents } from "../services/eventsApi";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ location: "", search: "" });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.results || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const eventsToDisplay = events.filter((event) => {
    const matchesLocation = filters.location ? event.location === filters.location : true;
    // Assuming each event has a `title` field.
    const matchesSearch = filters.search
      ? event.title.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchesLocation && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:px-0">
      {loading && <p className="text-center text-gray-600">Loading events...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row gap-8">
        <FilterSidebar onFilterChange={handleFilterChange} />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-start mb-4">
            {filters.location || filters.search
              ? `Showing Events${filters.location ? ` in ${filters.location}` : ""}${
                  filters.search ? ` matching "${filters.search}"` : ""
                }`
              : "Showing All Events"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsToDisplay.length > 0
              ? eventsToDisplay.map((event) => <EventCard key={event.id} event={event} />)
              : !loading && (
                  <p className="text-center text-gray-500 col-span-full">No events found.</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
