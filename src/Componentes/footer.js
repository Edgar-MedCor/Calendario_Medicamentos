import React from "react";
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Meditime</h2>
            <p className="text-gray-300">
              Dedicados al servicio medico!
            </p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-300">
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="#"
                title="Facebook"
                className="text-gray-300 hover:text-indigo-500"
              >
                <FaFacebookSquare size={32} />
              </a>
              <a
                href="#"
                title="Twitter"
                className="text-gray-300 hover:text-indigo-500"
              >
                <FaTwitterSquare size={32} />
              </a>
              <a
                href="#"
                title="Instagram"
                className="text-gray-300 hover:text-indigo-500"
              >
                <FaInstagram size={32} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4 text-center">
        <div className="container mx-auto text-gray-300">
          &copy; {new Date().getFullYear()} Meditime. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
