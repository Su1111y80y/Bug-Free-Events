import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-white"
        >
          EventManager
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Home
          </Link>

          <Link
            to="/create-event"
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Create Event
          </Link>
        </div>

        {/* Authentication Buttons (Static for Now) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            state={{ isLogin: true }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800"
          >
            Login
          </Link>
          <Link
            to="/login"
            state={{ isLogin: false }}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md p-4 space-y-4">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/create-event" className="block">
            Create Event
          </Link>
          <Link
            to="/login"
            state={{ isLogin: true }}
            className="block bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/login"
            state={{ isLogin: false }}
            className="block border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
