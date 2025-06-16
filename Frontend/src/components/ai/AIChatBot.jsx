import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { handleChat } from "../../services/aiService";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        { text: "Hello! How can I help you with your BetWise account today?" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", parts: [{ text: input }] };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // We only send the recent history to the API to keep it concise
      const history = messages.slice(-6);
      const response = await handleChat(input, history);
      const modelMessage = { role: "model", parts: [{ text: response.reply }] };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage = {
        role: "model",
        parts: [{ text: "Sorry, I'm having trouble connecting right now." }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50">
          <header className="bg-gray-800 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold text-lg">BetWise AI Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {msg.parts[0].text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <Spinner size="sm" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t dark:border-gray-700 flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500"
              disabled={loading}
            />
            <Button type="submit" loading={loading} className="ml-2">
              <FaPaperPlane />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Action Button to open chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 transition-transform transform hover:scale-110 z-50"
        aria-label="Open AI Chat"
      >
        <SiGooglegemini size={24} />
      </button>
    </>
  );
};

export default AIChatBot;
