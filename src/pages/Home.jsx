import HeroSection from "../components/HeroSection";
import EventCard from "../components/EventCard";
const Home = ({ events }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <HeroSection />

      <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <EventCard key={event.id} event={event} />
      </div>
    </div>
  );
};

export default Home;
