import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      const res = await loginApi({ email, password });
      login(res.token);
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login Failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">
      <div className="w-full max-w-sm rounded-xl bg-[#111827] border border-slate-700 p-6 text-white">
        <h1 className="mb-6 text-center text-2xl font-bold">Welcome Back</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4 text-right">
          <a href="#" className="text-sm text-indigo-400 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full rounded-md bg-indigo-600 py-2.5 font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <span className="bg-[#111827] px-3 text-sm text-gray-400">
            Or continue with
          </span>
          <div className="absolute left-0 top-1/2 h-px w-full bg-slate-700 -z-10"></div>
        </div>

        {/* Google Sign In button (UI only) */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-800 py-2 hover:bg-slate-700 transition"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Register redirect */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
