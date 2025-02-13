const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start">
        {/* Logo & Description */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-indigo-500">EventManager</h2>
          <p className="mt-2 text-gray-400 max-w-sm">
            Your ultimate platform to discover and manage events effortlessly.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="text-left md:text-right">
          <h3 className="text-lg font-semibold text-indigo-400">Follow Us</h3>
          <div className="mt-2 flex flex-col space-y-2">
            <a href="#" className="hover:text-indigo-500">
              📘 Facebook
            </a>
            <a href="#" className="hover:text-indigo-500">
              🐦 Twitter
            </a>
            <a href="#" className="hover:text-indigo-500">
              📸 Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EventManager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
