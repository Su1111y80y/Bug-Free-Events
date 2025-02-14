import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import EventCard from "../components/EventCard";
import { getUpcomingEvents } from "../services/eventsApi";
import Button from "../components/ui/Button";
import { Link } from "react-router";
import { eventHandler } from "../services/events.handler";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        const cleanData = data.results.map((event) => eventHandler.processEventData(event));
        // console.log("cleanData", cleanData);
        setEvents(cleanData || []);
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
    <div className="min-h-screen ">
      <HeroSection />

      <div id="event-section" className=" container mx-auto mt-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-6 mt-10 tracking-wide leading-tight">
          Upcoming Events
        </h2>

        {loading && <p className="text-center text-gray-600 mt-4">Loading events...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
          {events.length > 0
            ? events.map((event) => <EventCard key={event.id} event={event} />)
            : !loading && (
                <p className="text-center text-gray-500 col-span-full">No events found.</p>
              )}
        </div>
        <Link to="/events">
          <Button text="See All Events" className="btn-primary w-full m-4" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
