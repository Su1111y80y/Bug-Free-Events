import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router";
import { tokenService } from "../services/token.service";

const HeroSection = () => {
  const images = [
    "./src/images/concert.jpg",
    "./src/images/opera.jpg",
    "./src/images/conference.jpg",
  ];
  const token = tokenService.getToken();
  const navigate = useNavigate();

  const handleCreateEventClick = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen  ">
              <img src={image} alt="Event" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white p-5">
                  <h1 className="text-4xl md:text-5xl font-bold">Discover Amazing Events!</h1>
                  <p className="mt-2 text-lg md:text-xl">
                    Join the best events happening near you.
                  </p>
                  <div className="mt-4 flex justify-center gap-4">
                    <a
                      href="/events"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                    >
                      Explore Events
                    </a>
                    <a
                      href="/create-event"
                      className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                    >
                      Create an Event
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
