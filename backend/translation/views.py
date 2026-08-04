from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Translation
from .serializers import TranslationSerializer
from .services import translate_text


class TranslationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        source_text = request.data.get("source_text")
        source_language = request.data.get("source_language")
        target_language = request.data.get("target_language")

        translated_text = translate_text(
            source_text,
            source_language,
            target_language,
        )

        translation = Translation.objects.create(
            user=request.user,
            source_text=source_text,
            translated_text=translated_text,
            source_language=source_language,
            target_language=target_language,
        )

        serializer = TranslationSerializer(translation)  #converts the model into JSON and returns to frontend

        return Response(serializer.data)