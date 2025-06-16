import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LikedArtifactsPage = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to like an artifact (no JWT, just simple PATCH)
  const likedArtifact = async (artifactId) => {
    try {
      const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${artifactId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // No need to send email or token in body or headers
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to like artifact");
      }

      return data; // contains updated likeCount
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!user?.email) {
      setLikedArtifacts([]);
      setLoading(false);
      return;
    }

    const fetchLikedArtifacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const encodedEmail = encodeURIComponent(user.email);
        const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/liked?email=${encodedEmail}`);

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch liked artifacts");
        }

        const data = await res.json();
        setLikedArtifacts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user?.email]);

  if (loading) return <p>Loading liked artifacts...</p>;
  if (error) return <p>Error: {error}</p>;

  if (likedArtifacts.length === 0) {
    return <p>You have not liked any artifacts yet.</p>;
  }

 return (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800">
      Your Liked Artifacts 
    </h1>
    {likedArtifacts.length === 0 ? (
      <p className="text-center text-gray-500">You haven’t liked any artifacts yet.</p>
    ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedArtifacts.map((artifact) => (
          <li
            key={artifact._id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">{artifact.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Type: {artifact.type}</p>
            <p className="text-sm text-gray-600 mb-3">
              Likes: {artifact.likeCount || 0}
            </p>
            
          </li>
        ))}
      </ul>
    )}
  </div>
);


};

export default LikedArtifactsPage;
