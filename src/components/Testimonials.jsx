import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sophia Martinez",
    role: "Historian",
    text: "Artifacts Tracker helped me discover rare artifacts and connect with experts worldwide. An invaluable resource for researchers!",
  },
  {
    id: 2,
    name: "Liam Johnson",
    role: "Collector",
    text: "I love how easy it is to browse and save my favorite historical finds. The platform is intuitive and beautifully designed.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Museum Curator",
    text: "The artifact details and community features have made preserving history much more collaborative and engaging.",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-20 px-6 max-w-7xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-12 text-yellow-600 dark:text-white text-center">
        What Our Users Say
      </h2>

      <Slider {...settings}>
        {testimonials.map(({ id, name, role, text }) => (
          <div key={id} className="px-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 flex flex-col">
              <FaQuoteLeft className="text-pink-500 text-4xl mb-6" />
              <p className="text-gray-700 dark:text-gray-300 italic flex-grow mb-8">"{text}"</p>
              <div className="flex items-center gap-4">
                <FaUserCircle className="text-pink-400 text-5xl" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
