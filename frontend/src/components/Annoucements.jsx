import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFileUpload,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Announcements() {
  const [message, setMessage] = useState("");

  // Handles input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Clears input text
  const handleClear = () => {
    setMessage("");
  };

  // Handles message send
  const handleSend = () => {
    if (message.trim()) {
      console.log("Sent:", message); // Replace with actual send logic
      setMessage(""); // Clear after sending
    }
  };

  return (
    <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col text-sm h-96">
      {/* Messages List */}
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        {/* Example Message */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faGlobe}
            className="p-2 bg-amber-600 text-white rounded-full"
          />
          <div className="bg-amber-600 text-white px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md">
            <div className="text-xs text-amber-300 flex justify-between">
              <div>Ms. Liza</div>
              <div>10:00 A.M 27/02/24</div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              malesuada lorem et nunc.
            </div>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 mt-4 bg-white px-3 py-2 rounded-full shadow-md border-2 border-gray-200 focus-within:border-indigo-500">
        {/* Upload Button */}
        <button className="p-2 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center hover:bg-indigo-700 transition">
          <FontAwesomeIcon icon={faFileUpload} />
        </button>

        {/* Text Input with Auto-expand */}
        <div className="relative flex-1">
          <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="w-full p-2 text-gray-700 resize-none border-none outline-none bg-transparent focus:ring-0"
            rows={1}
            style={{ minHeight: "2rem", maxHeight: "6rem" }} // Limits height
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          {message && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className={`p-2 rounded-full h-8 w-8 flex items-center justify-center transition ${
            message.trim()
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!message.trim()}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{ width: "12px", height: "12px" }}
          />
        </button>
      </div>
    </div>
  );
}
