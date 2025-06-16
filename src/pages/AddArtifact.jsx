import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "",
    context: "",
    description: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  // State to track if image URL is valid (loads successfully)
  const [imageValid, setImageValid] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // If changing image URL, reset image validation
    if (e.target.name === "image") {
      setImageValid(true);
    }
  };

  // Function to check if image URL loads correctly
  const handleImageError = () => {
    setImageValid(false);
  };

  const handleImageLoad = () => {
    setImageValid(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageValid) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    const newArtifact = {
      ...formData,
      adderName: user.displayName,
      adderEmail: user.email,
      likeCount: 0,
    };

    try {
      const res = await fetch("https://artifacts-tracker-server-sigma.vercel.app/api/artifacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArtifact),
      });

      if (!res.ok) throw new Error("Failed to add artifact");

      toast.success("Artifact added successfully!");

      // Clear form
      setFormData({
        name: "",
        image: "",
        type: "",
        context: "",
        description: "",
        createdAt: "",
        discoveredAt: "",
        discoveredBy: "",
        presentLocation: "",
      });

      setImageValid(true);
    } catch (error) {
      toast.error("Failed to add artifact.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 px-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        Add a New Artifact
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow-md"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Artifact Name"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="image"
          value={formData.image}
          placeholder="Artifact Image URL"
          className={`w-full p-2 border rounded bg-blue-950 text-white ${
            !imageValid ? "border-red-500" : ""
          }`}
          onChange={handleChange}
          required
        />
        {/* Image preview */}
        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="max-h-48 object-contain rounded border"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            {!imageValid && (
              <p className="text-red-500 mt-1">Invalid image URL or image cannot be loaded.</p>
            )}
          </div>
        )}

        <select
          name="type"
          value={formData.type}
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        >
          <option value="">Select Artifact Type</option>
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Inscription">Inscription</option>
          <option value="Sculpture">Sculpture</option>
          <option value="Recording Device">Recording Device</option>
          <option value="Pottery">Pottery</option>
        </select>

        <textarea
          name="context"
          value={formData.context}
          placeholder="Historical Context"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Short Description"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="createdAt"
          value={formData.createdAt}
          placeholder="Created At (e.g., 100 BC)"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="discoveredAt"
          value={formData.discoveredAt}
          placeholder="Discovered At (e.g., 1799)"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="discoveredBy"
          value={formData.discoveredBy}
          placeholder="Discovered By"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="presentLocation"
          value={formData.presentLocation}
          placeholder="Present Location"
          className="w-full p-2 border rounded bg-blue-950 text-white"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-2 border rounded bg-blue-950 text-white"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-2 border rounded bg-blue-950 text-white"
        />

        <button
          type="submit"
          className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-800 transition"
        >
          Add Artifact
        </button>
      </form>
    </div>
  );
};

export default AddArtifact;
