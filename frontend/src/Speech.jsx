import { useState } from "react";
import api from "./api";

function Speech() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Telugu");
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);

  const handleSpeechToText = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      setError("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioFile);

    setLoading(true);
    setError("");
    setTranscript("");
    setTranslatedText("");
    setAudioUrl("");

    try {
      const response = await api.post("speech/", formData);

      const text = response.data.text;

      setTranscript(text);

      const translationResponse = await api.post("translation/", {
      source_text: text,
      source_language: "English",
      target_language: targetLanguage,
    });

      setTranslatedText(translationResponse.data.translated_text);
    } catch (error) {
      console.log(error);
      setError("Speech-to-text failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleSpeakTranslation = async () => {
  if (!translatedText) {
    return;
  }

  setTtsLoading(true);
  setError("");

  try {
    const languageMap = {
      Telugu: "te",
      English: "en",
      Hindi: "hi",
      Tamil: "ta",
      Kannada: "kn",
    };

    const response = await api.post("tts/", {
      text: translatedText,
      language: languageMap[targetLanguage],
    });

    setAudioUrl(response.data.audio_url);
  } catch (error) {
    console.log(error);
    setError("Text-to-speech failed. Please try again.");
  } finally {
    setTtsLoading(false);
  }
};


  return (
    <div>
      <h2>Speech to Text 🎤</h2>

      <form onSubmit={handleSpeechToText}>
        <input
          type="file"
          accept=".m4a,.wav,.mp3,audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />

        <label>Target Language</label>

      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="Telugu">Telugu</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Tamil">Tamil</option>
        <option value="Kannada">Kannada</option>
      </select>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Convert to Text"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {translatedText && (
  <div>
    <h3>Translated Text</h3>

    <p>{translatedText}</p>

    <button
      onClick={handleSpeakTranslation}
      disabled={ttsLoading}
    >
      {ttsLoading ? "Generating Speech..." : "🔊 Speak Translation"}
    </button>

    {audioUrl && (
      <div>
        <h3>Audio</h3>
        <audio controls src={audioUrl} />
      </div>
    )}
  </div>
)}
    </div>
  );
}

export default Speech;