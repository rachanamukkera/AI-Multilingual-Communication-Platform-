from google import genai
from decouple import config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)


class SummarizationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get("text")

        if not text:
            return Response(
                {"error": "Please provide text to summarize."},
                status=400
            )

        prompt = f"""
Summarize the following text clearly and concisely.

Text:
{text}

Rules:
- Keep the important information.
- Remove unnecessary repetition.
- Use simple and clear language.
- Return only the summary.
"""

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return Response({
                "summary": response.text.strip()
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )