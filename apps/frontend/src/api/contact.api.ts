import axios from "axios";

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await axios.post(
    "http://localhost:4000/api/contact",
    data
  );
  return res.data;
};
