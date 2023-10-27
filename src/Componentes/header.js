import React from "react";
import Logo from "./Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white dark:bg-[#3b0764]">
      <div className="container mx-auto max-w-screen-xl">
        <nav className="flex items-center justify-between py-4 lg:py-6 px-4 lg:px-6">
          <div className="flex items-center">
            <img src={Logo} className="h-10 sm:h-12 mr-2" alt="Flowbite Logo" />
            <Link
              to="/"
              className="text-2xl font-semibold text-indigo-600 dark:text-white"
            >
              Meditime
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6">
            <Link to="/Login"> {/* Corregir la URL de redirección */}
              <button className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 border-b-4 border-violet-700 hover:border-violet-500 rounded">
                INICIAR SESION
              </button>
            </Link>
            <Link to="/Signup"> {/* Corregir la URL de redirección */}
              <button className="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 border-b-4 border-violet-700 hover:border-violet-500 rounded">
                REGISTRARTE
              </button>
            </Link>
          </div>
          <button className="lg:hidden focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
