from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .serializers import SpeechSerializer
from .services import speech_to_text


class SpeechToTextView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SpeechSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        audio_file = serializer.validated_data["audio"]

        try:
            text = speech_to_text(audio_file)

            return Response({
                "text": text
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )