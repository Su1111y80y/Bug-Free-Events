import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getEventById } from "../services/eventsApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { eventHandler } from "../services/events.handler";
import EventActions from "../components/EventActions";
import { tokenService } from "../services/token.service";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        const processedEvent = eventHandler.processEventData(data);
        setEvent(processedEvent);
      } catch (err) {
        setError("Failed to load event details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const user = tokenService.getUser();
  const isOwner = user?.id === event?.organizerId;

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!event) return <div className="text-center p-8">Event not found</div>;

  const mapPosition = [event.latitude, event.longitude];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-base-200 flex items-center justify-center">
              <span className="text-base-content/50">No image available</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-300/90 to-transparent p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-base-content">{event.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details Section */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">About this event</h2>
                <p className="text-base-content/80 whitespace-pre-line">{event.description}</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Event Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-base-200 rounded-lg">
                    <div className="w-32 text-base-content/70">Date & Time</div>
                    <div className="text-base-content">{new Date(event.date).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center p-3 bg-base-200 rounded-lg">
                    <div className="w-32 text-base-content/70">Location</div>
                    <div className="text-base-content">{event.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Actions Section */}
            {user && <EventActions event={event} isOwner={isOwner} />}
          </div>

          {/* Map Section */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Location</h2>
              <div className="h-[500px] rounded-xl overflow-hidden border border-base-300">
                <MapContainer
                  center={mapPosition}
                  zoom={13}
                  className="h-full w-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapPosition}>
                    <Popup>
                      <div className="text-center p-2">
                        <strong className="block text-lg mb-1">{event.title}</strong>
                        <span className="text-sm text-base-content/70">{event.location}</span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
