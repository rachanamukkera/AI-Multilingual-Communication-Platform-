from google import genai
from decouple import config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)


class LanguageDetectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get("text")

        if not text:
            return Response(
                {"error": "Please provide some text."},
                status=400
            )

        prompt = f"""
Detect the language of the following text.

Return only the language name.

Text:
{text}
"""

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            detected_language = response.text.strip()

            return Response({
                "language": detected_language
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )