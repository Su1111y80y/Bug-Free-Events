import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EventDetails() {
  const { id } = useParams(); // Get event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://api.example.com/events/${id}`); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Event not found");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Event Details</h2>
      {event ? (
        <div>
          <h3 className="text-xl font-semibold">{event.name}</h3>
          <p className="text-lg">{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
        </div>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
}

export default EventDetails;

