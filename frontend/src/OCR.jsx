import { useState } from "react";
import api from "./api";

function OCR() {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOCR = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError("");
    setExtractedText("");

    try {
      const response = await api.post("ocr/", formData);

      setExtractedText(response.data.text);
    } catch (error) {
      console.error(error);
      setError("OCR failed. Please try another image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Image to Text 📷</h2>

      <form onSubmit={handleOCR}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Extracting..." : "Extract Text"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {extractedText && (
        <div>
          <h3>Extracted Text</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default OCR;