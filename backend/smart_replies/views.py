from google import genai
from decouple import config

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


client = genai.Client(
    api_key=config("GEMINI_API_KEY")
)


class SmartRepliesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = request.data.get("message")

        if not message:
            return Response(
                {"error": "Please provide a message."},
                status=400
            )

        prompt = f"""
You are a smart reply assistant.

Given the following message, generate exactly 3 short,
natural replies that the user could send.

Message:
{message}

Rules:
- Return exactly 3 replies.
- Each reply should be short.
- Make the replies different in tone.
- Do not number them.
- Return each reply on a separate line.
- Do not add explanations.
"""

        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            replies = [
                reply.strip()
                for reply in response.text.splitlines()
                if reply.strip()
            ]

            return Response({
                "replies": replies[:3]
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )