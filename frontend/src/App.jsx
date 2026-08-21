import { useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import Translation from "./Translation";
import Speech from "./Speech";
import api from "./api";
import OCR from "./OCR";
import LanguageDetection from "./LanguageDetection";
import AIChat from "./AIChat";
import SmartReplies from "./SmartReplies";
import Summarization from "./Summarization";
import GrammarCorrection from "./GrammarCorrection";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [ttsText, setTtsText] = useState("");
  const [ttsLanguage, setTtsLanguage] = useState("en");
  const [audioUrl, setAudioUrl] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setLoggedIn(false);
  };

  const handleTextToSpeech = async () => {
    if (!ttsText.trim()) {
      alert("Please enter some text");
      return;
    }

    setTtsLoading(true);

    try {
      const response = await api.post("tts/", {
        text: ttsText,
        language: ttsLanguage,
      });

      setAudioUrl(response.data.audio_url);
    } catch (error) {
      console.error("TTS Error:", error);
      alert("Text-to-speech failed");
    } finally {
      setTtsLoading(false);
    }
  };

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>AI Multilingual Communication Platform</h1>
            <p>
              Communicate, translate, understand and generate content using AI.
            </p>
          </div>

          {loggedIn && (
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {loggedIn ? (
        <main className="dashboard">

          {/* PROFILE */}
          <div className="feature-card profile-card">
            <Profile />
          </div>

          {/* FEATURES */}
          <div className="feature-grid">

            {/* TRANSLATION */}
            <div className="feature-card">
              <Translation />
            </div>

            {/* SPEECH TO TEXT */}
            <div className="feature-card">
              <Speech />
            </div>

            {/* OCR */}
            <div className="feature-card">
              <OCR />
            </div>

            {/* LANGUAGE DETECTION */}
            <div className="feature-card">
              <LanguageDetection />
            </div>

            {/* AI CHAT */}
            <div className="feature-card large-feature">
              <AIChat />
            </div>

            {/* SMART REPLIES */}
            <div className="feature-card">
              <SmartReplies />
            </div>

            {/* SUMMARIZATION */}
            <div className="feature-card">
              <Summarization />
            </div>

            {/* GRAMMAR CORRECTION */}
            <div className="feature-card">
              <GrammarCorrection />
            </div>

            {/* TEXT TO SPEECH */}
            <div className="feature-card">
              <div className="feature-content">

                <div className="feature-heading">
                  <span className="feature-icon">🔊</span>

                  <div>
                    <h2>Text to Speech</h2>
                    <p>
                      Convert written text into natural speech.
                    </p>
                  </div>
                </div>

                <textarea
                  placeholder="Enter text to convert into speech..."
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  rows="5"
                />

                <select
                  value={ttsLanguage}
                  onChange={(e) => setTtsLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="te">Telugu</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="kn">Kannada</option>
                </select>

                <button
                  onClick={handleTextToSpeech}
                  disabled={ttsLoading}
                >
                  {ttsLoading ? "Generating..." : "Generate Speech"}
                </button>

                {audioUrl && (
                  <div className="result-box">
                    <h3>Generated Speech</h3>

                    <audio
                      controls
                      src={audioUrl}
                      className="audio-player"
                    />
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* FOOTER */}
          <footer className="footer">
            <p>
              AI Multilingual Communication Platform © 2026
            </p>
          </footer>

        </main>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}

    </div>
  );
}

export default App;