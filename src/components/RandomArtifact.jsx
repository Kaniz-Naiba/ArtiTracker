import { useState } from "react";

const RandomArtifact = () => {
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomArtifact = async () => {
    setLoading(true);
    setError("");
    setArtifact(null);

    try {
      const res = await fetch(
        "https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/random"
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch random artifact");
      }

      const data = await res.json();

      // Ensure artifact is an object, not array
      const artifactObj = Array.isArray(data) ? data[0] : data;

      if (!artifactObj) {
        setError("No artifact found.");
        return;
      }

      setArtifact(artifactObj);
    } catch (err) {
      console.error("Failed to fetch random artifact:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <button
        onClick={fetchRandomArtifact}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Show Random Artifact
      </button>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {artifact && !error && (
        <div className="text-center">
          <img
            src={artifact.image}
            alt={artifact.name}
            className="w-48 h-48 object-cover mx-auto rounded mb-2"
          />
          <h2 className="text-xl font-bold mt-2">{artifact.name}</h2>
          <p className="text-gray-600">{artifact.type}</p>
          {artifact.description && <p className="mt-2 text-gray-700">{artifact.description}</p>}
        </div>
      )}

      {!loading && !artifact && !error && (
        <p className="text-center text-gray-500">Click the button to see a random artifact!</p>
      )}
    </div>
  );
};

export default RandomArtifact;
