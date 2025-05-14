import { useState } from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { FaPaperPlane } from "react-icons/fa";

const ContactForm = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await customAxios.post("/messages/send", {
        subject,
        message,
        userId: user?._id,
      });
      toast.success("Message sent successfully!");
      setMessage("");
      setSubject("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
            placeholder="Enter message subject"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading || !user}
          className="w-full bg-mainColor text-white py-2 px-4 rounded-lg hover:bg-mainColor/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Message <FaPaperPlane />
            </>
          )}
        </button>
        {!user && (
          <p className="text-sm text-red-500 text-center">
            Please log in to send a message
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
