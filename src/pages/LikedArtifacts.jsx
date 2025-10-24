import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const LikedArtifactsPage = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) {
      setLikedArtifacts([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchLikedArtifacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const encodedEmail = encodeURIComponent(user.email);
        const res = await fetch(
          `https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/liked?email=${encodedEmail}`
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to fetch liked artifacts");
        }

        const data = await res.json();
        if (isMounted) setLikedArtifacts(data || []);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLikedArtifacts();
    return () => (isMounted = false);
  }, [user?.email]);

  if (loading) return <p>Loading liked artifacts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-800">
        Your Liked Artifacts
      </h1>

      {likedArtifacts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t liked any artifacts yet.
        </p>
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
              <h3 className="text-xl font-semibold text-gray-700">
                {artifact.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Type: {artifact.type}
              </p>
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
