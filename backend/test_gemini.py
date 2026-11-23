from google import genai
from decouple import config

client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)

try:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Write a short greeting."
    )

    print("Gemini API is working!")
    print(response.text)

except Exception as e:
    print("Gemini API error:")
    print(type(e).__name__)
    print(str(e))