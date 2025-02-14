import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-footerBg text-white p-6 mt-8">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">Bug-Free Events 🐛</h3>
          <p className="text-sm mt-2">Your go-to platform for event management without the bugs!</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-blue-500 hover:text-blue-400"><FaFacebook size={30} /></a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300"><FaTwitter size={30} /></a>
            <a href="https://instagram.com" className="text-pink-500 hover:text-pink-400"><FaInstagram size={30} /></a>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>123 Fake Street</p>
          <p>Faketown, FT 12345</p>
          <p>contact@bugfreeevents.com</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400 mt-4">
        &copy; 2025 Bug-Free Events. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
