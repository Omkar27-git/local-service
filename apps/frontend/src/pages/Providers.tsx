import { useParams, useNavigate } from "react-router-dom";

const mockProviders = [
  {
    id: "1",
    name: "QuickFix Services",
    location: "Mumbai",
    description: "Experienced professionals with fast service"
  },
  {
    id: "2",
    name: "HomeCare Experts",
    location: "Pune",
    description: "Trusted home service providers"
  },
  {
    id: "3",
    name: "Urban Helpers",
    location: "Bangalore",
    description: "Affordable and reliable services"
  }
];

const Providers = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        {serviceId?.replace("-", " ")} Providers
      </h1>

      <p className="text-gray-600 mb-8">
        Choose a service provider and book instantly
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProviders.map((provider) => (
          <div
            key={provider.id}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-1">
              {provider.name}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              📍 {provider.location}
            </p>

            <p className="text-gray-600 mb-4">
              {provider.description}
            </p>

            <button
              onClick={() => navigate(`/booking/${provider.id}`)}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
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
