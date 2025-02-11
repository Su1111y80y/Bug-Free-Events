const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage:
          "url('https://unsplash.com/photos/person-performing-heart-hand-gesture-hzgs56Ze49s')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Discover Amazing Events!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Explore exciting events or create your own to share with the world.
        </p>

        <div className="mt-6 space-x-4">
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
    </section>
  );
};

export default HeroSection;
