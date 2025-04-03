import React, { useState, useRef } from "react";
import { SiChatbot } from "react-icons/si";

const FunChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to help you. Ask me anything! 😊" },
  ]);
  const chatWindowRef = useRef(null); 

  const handleUserMessage = (text) => {
    const staticResponses = {
      hello: "Hi there! 👋 How can I assist you today?",
      help: "Of course! Let me know what you need help with. 🤔",
      portfolio: "Your portfolio is looking fantastic! 📈 Keep up the good work!",
      joke: "Why don't programmers like nature? It has too many bugs! 😂",
      bye: "Goodbye! Have a great day! 👋",
    };

    const botReply =
      staticResponses[text.toLowerCase()] ||
      "I didn't quite get that. Could you rephrase? 🤷‍♀️";

    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "bot", text: botReply },
    ]);
  };

  const calculateChatWindowPosition = () => {
    if (chatWindowRef.current) {
      const chatWindowHeight = chatWindowRef.current.offsetHeight;
      return {
        bottom: `calc(4rem + ${chatWindowHeight}px)`, 
        right: "1rem",
      };
    }
    return { bottom: "auto", right: "1rem" };
  };

  const chatWindowPosition = calculateChatWindowPosition();

  return (
    <div className="fixed bottom-4 right-4 z-50">
    
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="bg-white border shadow-lg p-4 rounded-lg w-80 h-96 flex flex-col justify-between"
          style={{
            position: "fixed",
            bottom: chatWindowPosition.bottom,
            right: chatWindowPosition.right,
          }}
        >
        
          <div className="border-b pb-2 mb-2 font-bold text-lg text-blue-600 flex justify-between">
            <span>Chatbot</span>
            <button
              className="text-red-500 font-bold"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-1 p-2 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-200 text-left text-gray-700"
                    : "bg-blue-500 text-white text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            className="w-full border rounded-lg p-2 mt-2"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                handleUserMessage(e.target.value);
                e.target.value = ""; 
              }
            }}
          />
        </div>
      )}

     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        title="Chat with us"
      >
        <SiChatbot size={24} />
      </button>
    </div>
  );
};

export default FunChatbot;