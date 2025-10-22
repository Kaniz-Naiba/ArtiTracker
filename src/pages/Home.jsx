import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from 'react-simple-typewriter';
import { FaClock, FaShieldAlt, FaTasks } from "react-icons/fa";
import Testimonials from "../components/Testimonials"
const bannerSlides = [
  {
    title: "Discover Rare Artifacts",
    description: "Explore the treasures of history with detailed artifact info.",
    imageUrl: "https://i.ibb.co/hxCr55t8/Greek-artifacts-returned-March-21-2023-IMG-2724-scaled.jpg",
  },
  {
    title: "Connect With History",
    description: "Learn stories behind each artifact and preserve the past.",
    imageUrl: "https://i.ibb.co/yFZChBXf/istockphoto-1902111171-612x612.jpg",
  },
  {
    title: "Your Artifact Explorer",
    description: "Easily browse, filter, and save your favorite historical finds.",
    imageUrl: "https://i.ibb.co/W4F7Czvf/d8ef37dd6a3613a875f332a65d05784b-28770-naples-archaeological-museum-of-naples-private-tour-02.jpg",
  },
];


const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return null; // You can add a toggle button if needed
};

const Home = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopArtifacts() {
      try {
        // Fetch top 6 artifacts sorted by likeCount desc
        const response = await fetch('https://artifacts-tracker-server-sigma.vercel.app/api/artifacts?featured=true'); // make sure this URL returns JSON

        const data = await response.json();
        setArtifacts(data);
      } catch (error) {
        console.error("", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopArtifacts();
  }, []);
  const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  pauseOnHover: true,
};

  return (
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      <ThemeToggle />

      {/* Typewriter Intro Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-700 dark:text-yellow-400 font-[Cinzel_Decorative] animate-reveal">
          Welcome to{" "}
          <span className="text-purple-600 dark:text-purple-400">
            <Typewriter
              words={["Artifact Vault", "Timeless Treasures", "History Unveiled"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </span>
        </h1>
        <p className="text-lg md:text-xl text-black dark:text-gray-300 max-w-3xl mx-auto">
          Browse artifacts, uncover their stories, and preserve history together.
        </p>
      </section>

      {/* Banner/Slider */}
      <section className="relative w-full h-[70vh] md:h-[80vh]">
        <Slider {...sliderSettings}>
          {bannerSlides.map(({ title, description, imageUrl }, index) => (
            <div key={index} className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-b-xl">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20 text-white">
                <motion.h2
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
                >
                  {title}
                </motion.h2>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-lg md:text-xl max-w-3xl drop-shadow-md"
                >
                  {description}
                </motion.p>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Artifacts */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <motion.h2
          className="text-3xl  text-yellow-600 font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Artifacts
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading artifacts...</p>
        ) : artifacts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No artifacts found.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {artifacts.map(({ _id, name, description, image, likeCount }) => (
              <motion.div
                key={_id}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/artifacts/${_id}`)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <img
                  src={image}
                  alt={name}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow">
                    {description?.length > 100
                      ? description.slice(0, 100) + "..."
                      : description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      ❤️ {likeCount}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/artifact/${_id}`);
                      }}
                      className="bg-orange-600 hover:bg-yellow-700 text-white text-sm font-semibold py-2 px-4 rounded transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/all-artifacts")}
            className="inline-block bg-red-400 hover:bg-pink-300 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            See All
          </button>
        </div>
      </section>

      {/* Extra Section 1 - Why Explore Artifacts? */}
      <motion.section
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-20 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-700">Why Explore Artifacts?</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Artifacts offer a unique window into our past, helping us understand cultures,
            civilizations, and the stories that shaped humanity. Our platform makes it easy
            and engaging to discover these priceless treasures.
          </p>
        </div>
      </motion.section>

      {/* Extra Section 2 - Join Our Community */}
      <motion.section
        className="py-20 px-6 bg-gray-100 dark:bg-gray-800"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6  text-yellow-600 dark:text-white">Join Our Community</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300">
            Connect with historians, collectors, and enthusiasts worldwide. Share insights,
            ask questions, and contribute to preserving history through collaboration.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Explore Community
          </button>
        </div>
      </motion.section>
      

<motion.section
  className="py-20 px-6 bg-white dark:bg-gray-900"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-12 text-yellow-600 dark:text-white">Artifact Timeline</h2>
    <div className="space-y-12">
      {[
        {
          era: "Ancient Egypt (c. 3000 BCE)",
          text: "Discover artifacts like hieroglyphic scrolls, mummies, and tools from the Nile Valley civilization.",
        },
        {
          era: "Classical Greece (c. 500 BCE)",
          text: "Explore sculptures, pottery, and architectural fragments that inspired Western art.",
        },
        {
          era: "Medieval Europe (c. 1200 CE)",
          text: "Unearth swords, manuscripts, and religious relics from castles and abbeys.",
        },
        {
          era: "19th Century Industrial Age",
          text: "View machines, vintage items, and tools from the beginning of the modern age.",
        },
      ].map(({ era, text }, index) => (
        <motion.div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-2 text-blue-700 dark:text-blue-300">{era}</h3>
          <p className="text-black dark:text-gray-300">{text}</p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>
            <Testimonials />
    </div>
  );
};

export default Home;
