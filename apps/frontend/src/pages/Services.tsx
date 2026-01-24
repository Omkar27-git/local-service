import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "plumbing",
    name: "Plumbing",
    description: "Fix leaks, pipes, taps and bathroom fittings"
  },
  {
    id: "electrician",
    name: "Electrician",
    description: "Wiring, switches, lights and electrical repairs"
  },
  {
    id: "cleaning",
    name: "Cleaning",
    description: "Home, office and deep cleaning services"
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    description: "AC installation, repair and maintenance"
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Browse Services
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {service.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>

            <button
              onClick={() => navigate(`/services/${service.id}`)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              View Providers
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
