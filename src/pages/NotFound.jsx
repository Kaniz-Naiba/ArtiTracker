import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-white to-pink-50 text-center px-4">
      {/* Floating 404 */}
      <h1 className="text-[8rem] font-extrabold text-pink-500 leading-none animate-bounce drop-shadow-lg">
        404
      </h1>

      {/* Content Fade-in */}
      <div className="animate-fadeInUp">
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page not found
        </p>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for doesn’t exist or might have been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
