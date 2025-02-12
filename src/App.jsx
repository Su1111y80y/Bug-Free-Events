import { useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventDetails from "./components/EventDetails"; // Import Event Details
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </>
  );
}

export default App;
