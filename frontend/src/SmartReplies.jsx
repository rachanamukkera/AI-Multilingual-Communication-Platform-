import { useState } from "react";
import api from "./api";

function SmartReplies() {
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateReplies = async () => {
    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    setLoading(true);
    setError("");
    setReplies([]);

    try {
      const response = await api.post("smart-replies/", {
        message: message,
      });

      setReplies(response.data.replies);
    } catch (error) {
      console.error(error);
      setError("Could not generate smart replies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Smart Replies 💡</h2>

      <textarea
        rows="4"
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br />

      <button onClick={generateReplies} disabled={loading}>
        {loading ? "Generating..." : "Generate Smart Replies"}
      </button>

      {error && <p>{error}</p>}

      {replies.length > 0 && (
        <div>
          <h3>Suggested Replies</h3>

          {replies.map((reply, index) => (
            <button
              key={index}
              onClick={() => setMessage(reply)}
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SmartReplies;