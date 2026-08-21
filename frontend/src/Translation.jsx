import { useState } from "react";
import api from "./api";

function Translation() {
  const [sourceText, setSourceText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Telugu");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async (e) => {
    e.preventDefault();

    if (!sourceText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const response = await api.post("translation/", {
        source_text: sourceText,
        source_language: sourceLanguage,
        target_language: targetLanguage,
      });

      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.log(error);
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-content">
      <div className="feature-heading">
        <span className="feature-icon">🌐</span>
        <div>
          <h2>Text Translation</h2>
          <p>Translate text between supported languages using AI.</p>
        </div>
      </div>

      <form onSubmit={handleTranslate}>
        <div className="language-row">
          <div className="input-group">
            <label>Source Language</label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option>English</option>
              <option>Telugu</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </select>
          </div>

          <div className="input-group">
            <label>Target Language</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option>Telugu</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Enter Text</label>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            rows="5"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {translatedText && (
        <div className="result-box">
          <h3>Translation</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Translation;