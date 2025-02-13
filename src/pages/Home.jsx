import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events/");
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

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />

      <div id="event-section" className=" container mx-auto mt-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-6 mt-10 tracking-wide leading-tight">
          Upcoming Events
        </h2>

        {loading && (
          <p className="text-center text-gray-600 mt-4">Loading events...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {events.length > 0
            ? events.map((event) => <EventCard key={event.id} event={event} />)
            : !loading && (
                <p className="text-center text-gray-500 col-span-full">
                  No events found.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default Home;
