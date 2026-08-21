import { useState } from "react";
import api from "./api";

function LanguageDetection() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDetectLanguage = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setLanguage("");

    try {
      const response = await api.post("language-detection/", {
        text: text,
      });

      setLanguage(response.data.language);
    } catch (error) {
      console.error(error);
      setError("Language detection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Language Detection 🌐</h2>

      <textarea
        placeholder="Enter text to detect its language"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
      />

      <br />

      <button
        onClick={handleDetectLanguage}
        disabled={loading}
      >
        {loading ? "Detecting..." : "Detect Language"}
      </button>

      {error && <p>{error}</p>}

      {language && (
        <div>
          <h3>Detected Language</h3>
          <p>{language}</p>
        </div>
      )}
    </div>
  );
}

export default LanguageDetection;