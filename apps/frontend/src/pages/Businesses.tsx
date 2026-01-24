import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Business = {
  _id: string;
  name: string;
  category: string;
  description: string;
};

const Businesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      const res = await axios.get("http://localhost:4000/api/business");
      setBusinesses(res.data);
    };
    fetchBusinesses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Service Providers
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {businesses.map((b) => (
          <div
            key={b._id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">{b.name}</h2>
            <p className="text-sm text-indigo-500 mb-2">{b.category}</p>
            <p className="text-gray-600 mb-4">{b.description}</p>

            <button
              onClick={() => navigate(`/services/${b._id}`)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Book Service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Businesses;
