import { useNavigate } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
      onClick={handleNavigate}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col justify-between min-h-[300px]">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
          <p className="text-white mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {event.location}
          </p>
          <p className="text-white mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> {new Date(event.date).toDateString()}
          </p>
          <p className="text-white mb-4 line-clamp-2">{event.description}</p>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
