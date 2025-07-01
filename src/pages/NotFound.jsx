import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#f8f8f8] text-center px-4">
      <h1 className="text-[8rem] font-extrabold text-pink-500 leading-none">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Oops! Page not found</p>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
