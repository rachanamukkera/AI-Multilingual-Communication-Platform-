from google import genai
from decouple import config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)


class AIChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = request.data.get("message")

        if not message:
            return Response(
                {"error": "Please enter a message."},
                status=400
            )

        prompt = f"""
You are a helpful multilingual AI assistant.

Answer the user's question clearly and naturally.

User message:
{message}

Give a helpful response.
"""

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return Response({
                "response": response.text.strip()
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )