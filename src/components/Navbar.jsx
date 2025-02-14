import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { tokenService } from "../services/token.service";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white p-6 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold flex items-center">
        <span className="text-accent">Bug-Free</span> Events 🐛
      </div>
      <ul className="flex space-x-8">
        <li><a href="/" className="flex items-center space-x-2 hover:text-blue-300"><FaHome /> <span>Home</span></a></li>
        <li><a href="/events" className="flex items-center space-x-2 hover:text-blue-300"><FaCalendarAlt /> <span>Events</span></a></li>
        <li><a href="/login" className="flex items-center space-x-2 hover:text-blue-300"><FaSignInAlt /> <span>Login</span></a></li>
        <li><a href="/signup" className="flex items-center space-x-2 hover:text-blue-300"><FaUserPlus /> <span>Sign Up</span></a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
