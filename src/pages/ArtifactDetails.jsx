import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsUpIcon } from "lucide-react";
const ArtifactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [artifact, setArtifact] = useState(null);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);  // new state to track if current user liked
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Artifact not found");

        setArtifact(data);
        setLikeCount(data.likeCount || 0);
        // Check if user email is in likedBy
        setLiked(data.likedBy?.includes(user.email) || false);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) fetchArtifact();
  }, [id, user]);

  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const endpoint = liked
        ? `https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}/unlike`
        : `https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}/like`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update like status");
      }

      const { likeCount: freshCount, likedBy } = await res.json();
      setLikeCount(freshCount);
      setLiked(likedBy.includes(user.email));

      toast.success(liked ? "You unliked the artifact." : "Thanks for the like!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <p className="text-center mt-10">Checking authentication...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load artifact: {error}
      </p>
    );

  if (!artifact)
    return <p className="text-center mt-10">Loading artifact details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded bg-yellow-800 shadow mt-8 text-white">
      <h1 className="text-3xl font-bold mb-6">{artifact.name}</h1>
      <img
        src={artifact.image}
        alt={artifact.name}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p><strong>Type:</strong> {artifact.artifactType}</p>
      <p><strong>Description:</strong> {artifact.description}</p>
      <p><strong>Created At:</strong> {new Date(artifact.createdAt).toLocaleDateString()}</p>
      <p><strong>Likes:</strong> {likeCount}</p>

      <button
  onClick={handleLikeToggle}
  disabled={loading}
  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium
    ${loading ? "bg-gray-200 cursor-not-allowed" : liked ? "bg-blue-100 text-blue-600 border-blue-300 hover:bg-blue-200" : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"}
  `}
>
  {loading ? (
    <span className="animate-pulse">{liked ? "Unliking" : "Liking"}...</span>
  ) : (
    <>
      {liked ? (
        <ThumbsUp fill="currentColor" className="w-4 h-4" />
      ) : (
        <ThumbsUp className="w-4 h-4" />
      )}
      <span>{liked ? "Liked" : "Like"}</span>
    </>
  )}
</button>
    </div>
  );
};

export default ArtifactDetails;
