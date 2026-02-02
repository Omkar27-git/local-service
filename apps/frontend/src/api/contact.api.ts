import api from "./axios";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await api.post("/contact", data);
  return res.data;
};
