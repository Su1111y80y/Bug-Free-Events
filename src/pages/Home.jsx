import HeroSection from "../components/HeroSection";
import EventCard from "../components/EventCard";
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSection />

            <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <EventCard />
            </div>
        </div>
    );
};

export default Home;
