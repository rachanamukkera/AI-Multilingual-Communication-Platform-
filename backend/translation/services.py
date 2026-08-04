from google import genai
from decouple import config

client = genai.Client(api_key=config("GEMINI_API_KEY"))


def translate_text(source_text, source_language, target_language):
    prompt = f"""
    Translate the following text.

    Source Language: {source_language}
    Target Language: {target_language}

    Text:
    {source_text}

    Return only the translated text.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text.strip()