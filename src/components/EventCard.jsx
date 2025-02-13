import React from "react";
import { useNavigate } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer hover:shadow-xl"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      {/* Image with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={"./src/images/conference.jpg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Event Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> {event.location}
        </p>
        <p className="text-gray-500 mb-2 flex items-center">
          <FaCalendarAlt className="mr-2" />{" "}
          {new Date(event.date).toDateString()}
        </p>

        {/* Description */}
        <p className="text-gray-500 mb-4 line-clamp-2">{event.description}</p>

        {/* View Details Button */}
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
