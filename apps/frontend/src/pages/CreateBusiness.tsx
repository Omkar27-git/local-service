import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBusinessApi } from "../api/business.api";

const CreateBusiness = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !category || !description) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createBusinessApi({ name, category, description });
      toast.success("Business created successfully");
      navigate("/my-businesses");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to create business"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Business
      </h2>

      <input
        type="text"
        placeholder="Business Name"
        className="w-full border p-2 mb-4 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category (Plumbing, Electrician...)"
        className="w-full border p-2 mb-4 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full border p-2 mb-4 rounded"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Business"}
      </button>
    </div>
  );
};

export default CreateBusiness;
