from google import genai
from decouple import config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)


class GrammarCorrectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get("text")

        if not text:
            return Response(
                {"error": "Please provide text."},
                status=400
            )

        prompt = f"""
Correct the grammar of the following text.

Text:
{text}

Rules:
- Correct grammar, spelling, punctuation, and sentence structure.
- Preserve the original meaning.
- Do not add new information.
- Return only the corrected text.
"""

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return Response({
                "corrected_text": response.text.strip()
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )