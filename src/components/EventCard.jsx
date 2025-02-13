import React from "react";
import { useNavigate } from "react-router";

const EventCard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
      onClick={() => navigate(`/event/`)}
    >
      {/* Event Image */}
      <img
        src={"./src/images/conference.jpg"}
        alt={event.title}
        className="w-full h-56 object-cover"
      />

      {/* Event Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">
          {"Hard Coded Title"}
        </h3>
        <p className="text-gray-600 mt-1">📍 Location also</p>
        <p className="text-gray-500 mt-1">📅 Date as well</p>
        <p className="text-gray-700 mt-1 font-medium">👤 Organized by:</p>

        {/* Description */}
        <p className="text-gray-500 mt-2 line-clamp-2">
          {"This is a short event description..."}
        </p>

        {/* View Details Button */}
        <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
