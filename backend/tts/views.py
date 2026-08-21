from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from gtts import gTTS
import os
import uuid

from django.conf import settings


class TextToSpeechView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        text = request.data.get("text")
        language = request.data.get("language", "en")

        if not text:
            return Response(
                {"error": "Text is required"},
                status=400
            )

        filename = f"{uuid.uuid4()}.mp3"

        output_dir = os.path.join(settings.MEDIA_ROOT, "tts")

        os.makedirs(output_dir, exist_ok=True)

        file_path = os.path.join(output_dir, filename)

        tts = gTTS(
            text=text,
            lang=language
        )

        tts.save(file_path)

        audio_url = request.build_absolute_uri(
            settings.MEDIA_URL + "tts/" + filename
        )

        return Response({
            "message": "Speech generated successfully",
            "audio_url": audio_url
        })