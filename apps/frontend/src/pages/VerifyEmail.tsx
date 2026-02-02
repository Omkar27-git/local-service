import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Email Verified ✅
        </h2>
        <p className="mb-6">
          Your email has been successfully verified. You can now log in.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
