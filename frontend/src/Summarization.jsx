import { useState } from "react";
import api from "./api";

function Summarization() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await api.post("summarization/", {
        text: text,
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      setError("Summarization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Text Summarization 📝</h2>

      <textarea
        rows="8"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p>{error}</p>}

      {summary && (
        <div>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarization;