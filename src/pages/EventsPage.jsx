import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import FilterSidebar from "../components/FilterSidebar";
import { getAllEvents } from "../services/eventsApi";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilterChange = async (newFilters) => {
    // Update the local state so you always know which filters are active

    setLoading(true);
    try {
      let url = "http://localhost:3001/api/events/";
      const params = [];
      if (newFilters.location) params.push(`location=${newFilters.location}`);
      if (newFilters.topic) params.push(`topic=${newFilters.topic}`);
      if (params.length) url += "?" + params.join("&");

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data.results || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="container mx-auto px-4 md:px-0">
      {/* Event Section */}

      {loading && <p className="text-center text-gray-600">Loading events...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}

        <FilterSidebar onFilterChange={handleFilterChange} />

        {/* Event Grid */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-start mb-4">Showing All Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0
              ? events.map((event) => <EventCard key={event.id} event={event} />)
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
