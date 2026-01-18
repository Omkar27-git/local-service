import { useState } from "react";
import { sendContactMessage } from "../api/contact.api";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await sendContactMessage({ name, email, message });
      toast.success("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        Contact Us
      </h1>

      <div className="max-w-xl mx-auto bg-[#111827] border border-slate-700 rounded-xl p-6 space-y-4">
        <input
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2"
          placeholder="Your message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 py-2 rounded-md hover:bg-indigo-700"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Contact;
