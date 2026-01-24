import api from "./axios";

// REGISTER
export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN (cookie is set by backend)
export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// GOOGLE LOGIN
export const googleSignInApi = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};
