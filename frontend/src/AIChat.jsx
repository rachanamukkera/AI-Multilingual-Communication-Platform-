import { useState } from "react";
import api from "./api";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      return;
    }

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("ai-chat/", {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Chat 🤖</h2>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              {msg.sender === "user" ? "You" : "AI"}:
            </strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <textarea
        placeholder="Ask the AI something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
      />

      <br />

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}

export default AIChat;