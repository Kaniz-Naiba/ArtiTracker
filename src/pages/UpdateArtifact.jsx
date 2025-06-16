import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateArtifact = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [artifactData, setArtifactData] = useState({
    name: "",
    image: "",
    type: "Tools", // default dropdown value
    historicalContext: "",
    description:"",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
    // likeCount and adder info are not included here to prevent update
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !token) return;

    fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch artifacts");
        return res.json();
      })
      .then((data) => {
        // Only load the fields we want to update
        setArtifactData({
          name: data.name || "",
          image: data.image || "",
          type: data.type || "Tools",
          historicalContext: data.historicalContext || "",
          description: data.description || "",
          createdAt: data.createdAt || "",
          discoveredAt: data.discoveredAt || "",
          discoveredBy: data.discoveredBy || "",
          presentLocation: data.presentLocation || "",
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load artifact.");
        setLoading(false);
      });
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  setArtifactData((prev) => ({
    ...prev,
    [name]: name === "image" ? value.trim() : value,
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure likeCount and adder info are NOT overwritten:
    // Fetch current artifact data first to preserve those fields
    fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch current artifact data");
        return res.json();
      })
      .then((existingData) => {
        // Prepare update payload merging existing fields to preserve likeCount and adder info
        const updatedPayload = {
          ...existingData,
          ...artifactData,
        };

        // PUT request to update artifact
        return fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPayload),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update artifact");
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Artifact updated successfully!",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/my-artifacts");
        });
      })
      .catch(() => {
        toast.error("Failed to update artifact.");
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading artifact data...</p>;
  }

  return (
  <div className="max-w-2xl mx-auto my-10 px-4">
    <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">
      Update Artifact
    </h2>

    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
    >
      {/* Artifact Name */}
      <input
        type="text"
        name="name"
        value={artifactData.name}
        placeholder="Artifact Name"
        className="w-full p-2 border rounded bg-blue-950 text-white"
        onChange={handleChange}
        required
      />

      {/* Artifact Image URL */}
      <input
        type="url"
        name="image"
        value={artifactData.image}
        placeholder="Artifact Image URL"
        className="w-full p-2 border rounded bg-blue-950 text-white"
        onChange={handleChange}
        required
        pattern="https?://.+"
        title="Please enter a valid URL starting with http:// or https://"
      />

      {/* Type Dropdown */}
      <select
        name="type"
        value={artifactData.type}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded bg-blue-950 text-white"
      >
        <option value="">Select Artifact Type</option>
        <option value="Tools">Tools</option>
        <option value="Weapons">Weapons</option>
        <option value="Inscription">Inscription</option>
        <option value="Sculpture">Sculpture</option>
        <option value="Recording Device">Recording Device</option>
        <option value="Pottery">Pottery</option>
      </select>

      {/* Historical Context */}
      <textarea
        name="historicalContext"
        value={artifactData.historicalContext}
        placeholder="Historical Context"
        onChange={handleChange}
        rows="3"
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Description */}
      <textarea
        name="description"
        value={artifactData.description}
        placeholder="Description"
        onChange={handleChange}
        rows="3"
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Created At */}
      <input
        type="text"
        name="createdAt"
        value={artifactData.createdAt}
        placeholder="Created At (e.g., 100 BC)"
        onChange={handleChange}
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Discovered At */}
      <input
        type="text"
        name="discoveredAt"
        value={artifactData.discoveredAt}
        placeholder="Discovered At (e.g., 1799)"
        onChange={handleChange}
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Discovered By */}
      <input
        type="text"
        name="discoveredBy"
        value={artifactData.discoveredBy}
        placeholder="Discovered By"
        onChange={handleChange}
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Present Location */}
      <input
        type="text"
        name="presentLocation"
        value={artifactData.presentLocation}
        placeholder="Present Location"
        onChange={handleChange}
        className="w-full p-2 border rounded bg-blue-950 text-white"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-600 text-white font-semibold py-2 rounded hover:bg-yellow-700"
      >
        Update Artifact
      </button>
    </form>
  </div>
);

};

export default UpdateArtifact;
