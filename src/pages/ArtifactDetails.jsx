import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ThumbsUp } from "lucide-react";

const ArtifactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  const [artifact, setArtifact] = useState(null);
  const [error, setError] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentLoading, setCommentLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Fetch artifact and comments
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        // Fetch artifact
        const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Artifact not found");

        setArtifact(data);
        setLikeCount(data.likeCount || 0);
        setLiked(data.likedBy?.includes(user.email) || false);

        // Fetch comments
        const resComments = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/comments/${id}`);
        const commentsData = await resComments.json();
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, [id, user]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Comment cannot be empty");
    if (rating < 1 || rating > 5) return toast.error("Rating must be 1–5");

    setCommentLoading(true);
    try {
      const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artifactId: id,
          userEmail: user.email,
          userName: user.displayName,
          text: newComment,
          rating,
        }),
      });

      if (!res.ok) throw new Error("Failed to post comment");
      const saved = await res.json();

      setComments((prev) => [saved, ...prev]);
      setNewComment("");
      setRating(0);
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCommentLoading(false);
    }
  };

  // Handle like
  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const endpoint = `https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}/like`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update like");

      setLikeCount(data.likeCount);
      setLiked(data.likedBy?.includes(user.email) || false);

      toast.success(liked ? "You unliked the artifact." : "Thanks for the like!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Failed to load artifact: {error}</p>;
  if (!artifact) return <p className="text-center mt-10">Loading artifact details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 border rounded bg-yellow-800 shadow mt-8 text-white">
      <h1 className="text-3xl font-bold mb-6">{artifact.name}</h1>
      <img src={artifact.image} alt={artifact.name} className="w-full h-64 object-cover rounded mb-6" />
      <p><strong>Type:</strong> {artifact.type}</p>
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
        {loading ? <span className="animate-pulse">{liked ? "Unliking" : "Liking"}...</span> : <><ThumbsUp className="w-4 h-4" /> <span>{liked ? "Liked" : "Like"}</span></>}
      </button>

      <hr className="my-6 border-gray-500" />
      <h2 className="text-2xl font-semibold mb-4">Comments & Reviews</h2>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-3 mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 rounded bg-gray-100 text-black"
          required
        ></textarea>

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rate (1–5)"
          className="w-24 p-2 rounded bg-gray-100 text-black"
          required
        />

        <button type="submit" disabled={commentLoading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {commentLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Display Comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-300">No comments yet. Be the first!</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border border-gray-600 p-3 rounded bg-yellow-900/40">
              <div className="flex justify-between">
                <p className="font-semibold">{c.userName}</p>
                <p className="text-yellow-400">{c.rating}★</p>
              </div>
              <p>{c.text}</p>
              <small className="text-gray-400">{new Date(c.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArtifactDetails;
