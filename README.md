# AI Multilingual Communication Platform

An AI-powered web application designed to help users communicate across languages using translation, speech processing, OCR, language detection, AI chat, grammar correction, summarization, smart replies, and text-to-speech features.

## 🚀 Features

* 🔐 **User Authentication** — Secure login using JWT authentication.
* 🌐 **Text Translation** — Translate text between different languages using Google Gemini.
* 🎤 **Speech-to-Text** — Convert uploaded audio into text.
* 🔊 **Text-to-Speech** — Convert written text into speech.
* 📷 **OCR** — Extract text from uploaded images.
* 🔎 **Language Detection** — Identify the language of provided text.
* 🤖 **AI Chat** — Interact with an AI-powered conversational system.
* ✍️ **Grammar Correction** — Improve grammatical accuracy of text.
* 💬 **Smart Replies** — Generate suggested responses using AI.
* 📝 **Text Summarization** — Generate concise summaries of longer text.
* 👤 **User Profile** — Access authenticated user information.

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Axios
* Vite
* CSS

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* PostgreSQL
* Python Decouple

### AI & Processing

* Google Gemini API
* SpeechRecognition
* PyDub
* FFmpeg
* OCR processing

## 🏗️ Project Architecture

The application follows a frontend-backend architecture:

```text
React Frontend
      |
      | HTTP / REST API
      ↓
Django REST Backend
      |
      ├── Authentication
      ├── Translation
      ├── Speech-to-Text
      ├── Text-to-Speech
      ├── OCR
      ├── Language Detection
      ├── AI Chat
      ├── Smart Replies
      ├── Summarization
      └── Grammar Correction
              |
              ↓
        Gemini / AI Services
```

## 🔐 Authentication

The application uses JWT-based authentication.

After successful login:

1. Django authenticates the user.
2. The backend returns an access token and refresh token.
3. The React frontend stores the tokens in `localStorage`.
4. Axios automatically adds the access token to authenticated API requests.
5. Django REST Framework validates the token before allowing access to protected endpoints.

## 🔄 Frontend–Backend Communication

The React application communicates with Django through REST APIs using Axios.

The frontend API client uses:

```text
http://127.0.0.1:8000/api/
```

The JWT access token is automatically attached to requests using an Axios interceptor.

## 🤖 AI Integration

Google Gemini is used for AI-powered functionality such as translation and other language-processing features.

The Gemini API key is stored in an environment variable rather than directly inside the source code.

Example:

```text
GEMINI_API_KEY=your_api_key
```

Environment files containing secret API keys should not be committed to GitHub.

## 📁 Project Structure

```text
AI-Multilingual-Communication-Platform/
│
├── backend/
│   ├── config/
│   ├── accounts/
│   ├── ai_chat/
│   ├── grammar_correction/
│   ├── language_detection/
│   ├── ocr/
│   ├── smart_replies/
│   ├── speech/
│   ├── summarization/
│   ├── translation/
│   ├── tts/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── AIChat.jsx
│   │   ├── GrammarCorrection.jsx
│   │   ├── LanguageDetection.jsx
│   │   ├── Login.jsx
│   │   ├── OCR.jsx
│   │   ├── Profile.jsx
│   │   ├── SmartReplies.jsx
│   │   ├── Speech.jsx
│   │   ├── Summarization.jsx
│   │   ├── Translation.jsx
│   │   ├── App.jsx
│   │   └── api.js
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI-Multilingual-Communication-Platform
```

### 2. Backend setup

Open a terminal inside the `backend` directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory.

Add the required secret configuration, including the Gemini API key and Django secret key.

Example:

```text
SECRET_KEY=your_django_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Do not upload the `.env` file to GitHub.

### 4. Run Django

From the `backend` directory:

```bash
python manage.py migrate
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

### 5. Frontend setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will then be available at the URL shown by Vite in the terminal.

## 🔒 Security

* API keys are stored using environment variables.
* `.env` files are excluded from Git using `.gitignore`.
* JWT authentication protects authenticated API endpoints.
* Sensitive credentials should never be committed to the repository.

## 🔮 Future Improvements

* Real-time communication between multiple users.
* Automatic language selection instead of manually selecting languages.
* WebSocket-based live translation and communication.
* Improved speech recognition for multiple languages.
* Better error handling and API rate-limit management.
* Production deployment using a cloud platform.
* More advanced user profiles and communication history.

## 👩‍💻 Author

**Rachana Mukkera**

B.Tech — Electronics and Communication Engineering

---

⭐ This project demonstrates full-stack development using React, Django REST Framework, JWT authentication, AI APIs, and multiple language-processing technologies.
