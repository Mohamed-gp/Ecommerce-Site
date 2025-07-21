import { useState, useEffect } from "react";
import customAxios from "../../utils/axios/customAxios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { FaPaperPlane, FaUser, FaEnvelope } from "react-icons/fa";

const ContactForm = () => {
  const { user } = useSelector((state: IRootState) => state.auth);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Debug user object - can be removed after fixing
  useEffect(() => {
    if (user) {
      console.log("Current user object:", user);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // For guest users, validate name and email
    if (!user) {
      if (!guestName.trim() || !guestEmail.trim()) {
        toast.error("Please provide your name and email");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(guestEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    try {
      setLoading(true);

      // Create the message payload
      let messageData;

      if (user) {
        // For logged-in users - check if user.id exists (some APIs use id instead of _id)
        const userId = user.id || user._id;

        if (!userId) {
          console.error("User object missing ID:", user);
          toast.error(
            "Unable to identify user. Please try logging out and back in."
          );
          setLoading(false);
          return;
        }

        messageData = {
          subject,
          message,
          userId,
        };

        console.log("Sending logged-in user message with data:", messageData);
      } else {
        // For guests
        messageData = {
          subject,
          message,
          guestName,
          guestEmail,
        };
      }

      const response = await customAxios.post("/messages/send", messageData);
      console.log("Message send response:", response.data);

      toast.success("Message sent successfully!");
      setMessage("");
      setSubject("");
      if (!user) {
        setGuestName("");
        setGuestEmail("");
      }
    } catch (error: any) {
      console.error("Contact form error details:", error.response?.data);
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

      {user && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            Sending message as:{" "}
            <span className="font-medium">
              {user.username || user.name || user.email}
            </span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Guest fields - only shown when not logged in */}
        {!user && (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Subject field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject <span className="text-red-500">*</span>
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

        {/* Message field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message <span className="text-red-500">*</span>
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-mainColor text-white py-3 px-4 rounded-lg hover:bg-mainColor/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 font-medium"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message <FaPaperPlane />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
