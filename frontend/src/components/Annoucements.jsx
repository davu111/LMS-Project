import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faGlobe,
  faPastafarianism,
  faFileUpload,
  faFlushed,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

export default function Annoucements() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
      adjustTextareaHeight();
    }
  };

  const handleClear = () => {
    setMessage("");
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="shadow-inner p-6 rounded-lg bg-gray-50 flex flex-col text-sm h-96 ">
      <div className="flex flex-wrap items-start justify-start gap-4 flex-col flex-1">
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
              Lipsum dolor sit amet, consectetur adipiscing elit. Donec
              malesuada lorem et nunc.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faFlushed}
            className="p-2 bg-indigo-600 text-white rounded-full"
            style={{ width: "14px", height: "14px" }}
          />
          <div className="text-indigo-700 px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md outline-2 outline-indigo-500">
            <div className="text-xs text-indigo-500 flex justify-between">
              <div>John Doe</div>
              <div>10:05 A.M 27/02/24</div>
            </div>
            <div>
              Lipsum dolor sit amet, consectetur adipiscing elit. Donec
              malesuada lorem et nunc.
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2">
            <div className="text-slate-700 px-4 py-2 rounded-2xl flex flex-col gap-1 shadow-md outline-2 outline-slate-500">
              <div className="text-xs text-slate-500 flex justify-between">
                <div>John Doe</div>
                <div>10:05 A.M 27/02/24</div>
              </div>
              <div>
                Lipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada lorem et nunc.
              </div>
            </div>
            <FontAwesomeIcon
              icon={faFlushed}
              className="p-2 bg-slate-600 text-white rounded-full"
              style={{ width: "14px", height: "14px" }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 bg-white px-2 py-1 rounded-full shadow-md border border-gray-200 focus-within:border-indigo-500">
        {/* Upload Button */}
        <button className="p-2 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center hover:bg-indigo-700 transition">
          <FontAwesomeIcon icon={faFileUpload} />
        </button>

        {/* Text Input with Auto-expand */}
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="w-full p-2 text-gray-700 resize-none border-none outline-none bg-transparent focus:ring-0 transition-all duration-300 ease-in-out flex "
            rows={1}
            style={{ minHeight: "2rem", maxHeight: "6rem", overflow: "hidden" }} // Limits height
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
