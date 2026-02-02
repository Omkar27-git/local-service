import api from "./axios";

export const createBusinessApi = async (data: {
  name: string;
  category: string;
  description: string;
}) => {
  const res = await api.post("/businesses", data); // ✅ FIX
  return res.data;
};

export const getMyBusinessesApi = async () => {
  const res = await api.get("/businesses/me"); // ✅ FIX
  return res.data;
};
