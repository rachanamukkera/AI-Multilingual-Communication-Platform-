import { useState } from "react";
import api from "./api";

function GrammarCorrection() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCorrection = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setCorrectedText("");

    try {
      const response = await api.post("grammar-correction/", {
        text: text,
      });

      setCorrectedText(response.data.corrected_text);
    } catch (error) {
      console.error(error);
      setError("Grammar correction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Grammar Correction ✍️</h2>

      <textarea
        rows="7"
        placeholder="Enter text with grammatical mistakes..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleCorrection} disabled={loading}>
        {loading ? "Correcting..." : "Correct Grammar"}
      </button>

      {error && <p>{error}</p>}

      {correctedText && (
        <div>
          <h3>Corrected Text</h3>
          <p>{correctedText}</p>
        </div>
      )}
    </div>
  );
}

export default GrammarCorrection;