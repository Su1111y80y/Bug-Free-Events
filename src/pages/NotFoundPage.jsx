import { useEffect, useState } from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger fade-in on mount
        setLoaded(true);
    }, []);

    return (
        <div
            className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-r 
        from-teal-400 to-blue-500 dark:from-gray-900 dark:to-gray-700 
        transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
        }`}
        >
            <div className="text-center transform transition-all duration-500 hover:scale-105">
                <h1
                    className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-indigo-600 
            animate-bounce dark:text-indigo-400"
                >
                    404
                </h1>
                <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    Page Not Found
                </h2>
                <p className="mt-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    Oops! This page got lost chasing digital squirrels 🐿️.
                </p>
                <Link
                    to="/"
                    aria-label="Go Home"
                    className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium 
          rounded-full hover:bg-indigo-700 transition duration-300 focus:outline-none 
          focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-indigo-600 
          hover:animate-pulse"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
