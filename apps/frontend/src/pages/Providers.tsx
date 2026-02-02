import { useNavigate } from "react-router-dom";

const mockProviders = [
  {
    id: "1",
    name: "Om Plumbing Services",
    experience: "8 years",
    rating: 4.5
  },
  {
    id: "2",
    name: "QuickFix Electricians",
    experience: "5 years",
    rating: 4.2
  }
];

const Providers = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Available Providers
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {mockProviders.map((provider) => (
          <div
            key={provider.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {provider.name}
            </h2>

            <p className="text-gray-600">
              Experience: {provider.experience}
            </p>

            <p className="text-gray-600 mb-4">
              Rating: ⭐ {provider.rating}
            </p>

            <button
              onClick={() => navigate(`/booking/${provider.id}`)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
