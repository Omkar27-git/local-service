import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import axios from "axios";
import { toast } from "react-toastify";

const Booking = () => {
  const { id } = useParams(); // business/service id
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // ⛔ if no id, don’t render
  if (!id) {
    return (
      <div className="text-center mt-20 text-red-600">
        Invalid booking link
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:4000/api/bookings/${id}`,
        {
          requestedDate: date,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Booking created successfully 🎉");
      navigate("/bookings");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          className="w-full border p-2 mb-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default Booking;
