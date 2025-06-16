import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://artifacts-tracker-server-sigma.vercel.app/api/artifacts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArtifacts(data);
        } else if (Array.isArray(data.artifacts)) {
          setArtifacts(data.artifacts);
        } else {
          setArtifacts([]);
          console.error("Unexpected response format:", data);
        }
      })
      .catch((err) => {
        console.error("Error loading artifacts:", err);
      })
      .finally(() => setLoading(false));
     
  }, []);

  const filteredArtifacts = artifacts.filter((artifact) =>
    artifact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center  text-yellow-500">
        All Artifacts
      </h1>

      {/* Search Input */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search by artifact name..."
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredArtifacts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No artifacts found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArtifacts.map(({ _id, name, description, image, likeCount }) => (
            <motion.div
              key={_id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer flex flex-col"
              onClick={() => navigate(`/artifacts/${_id}`)}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
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
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 flex-grow text-sm">
                  {description?.length > 100
                    ? description.slice(0, 100) + "..."
                    : description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    ❤️ {likeCount}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artifact/${_id}`);
                    }}
                    className="bg-orange-600 hover:bg-yellow-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllArtifacts;
