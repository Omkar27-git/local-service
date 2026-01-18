import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";
import axios from "axios";

const Booking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to book a service");
      navigate("/login");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/${providerId}`,
        {
          requestedDate: date,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Booking created successfully!");
      navigate("/bookings");
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-indigo-700">
        Confirm Booking
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium text-gray-600">
          Select Date
        </label>
        <input
          type="date"
          className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="block mb-2 font-medium text-gray-600">
          Message (optional)
        </label>
        <textarea
          className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Add a message for the provider..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
