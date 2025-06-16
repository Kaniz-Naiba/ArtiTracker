import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyArtifacts = () => {
  const { user, token } = useContext(AuthContext);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchArtifacts = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch artifacts");

        const data = await res.json();
        setArtifacts(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load your artifacts.");
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, [user?.email, token]);
  
  
  

  const handleDelete = async (artifactId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this artifact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://artifacts-tracker-server-sigma.vercel.app/api/artifacts/${artifactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setArtifacts(prev => prev.filter(a => a._id !== artifactId));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your artifact has been deleted.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete artifact.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while deleting the artifact.",
      });
    }
  };
  

  const handleUpdate = (id) => navigate(`/update-artifact/${id}`);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <p className="text-lg animate-pulse text-gray-700">Loading your artifacts...</p>
      </div>
    );
  }

  if (!artifacts.length) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        <p>You haven't added any artifacts yet.</p>
        <p className="text-sm text-gray-500">Start by adding a historical piece to the collection.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-4 text-center text-yellow-700 ">My Artifacts</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 bg-orange-500">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Discovered At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact) => (
            <tr key={artifact._id} className="text-center">
              <td className="border px-4 py-2">{artifact.name}</td>
              <td className="border px-4 py-2">{artifact.type}</td>
              <td className="border px-4 py-2">{artifact.createdAt}</td>
              <td className="border px-4 py-2">{artifact.discoveredAt}</td>
              <td className="border px-4  flex justify-center gap-2 flex-wrap py-2">
                <button
                  onClick={() => handleUpdate(artifact._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyArtifacts;
