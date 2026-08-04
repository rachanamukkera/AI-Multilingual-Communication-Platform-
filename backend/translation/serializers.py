from rest_framework import serializers
from .models import Translation


class TranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translation
        fields = [
            "id",
            "source_text",
            "translated_text",
            "source_language",
            "target_language",
            "created_at",
        ]
        read_only_fields = [
            "translated_text",
            "created_at",
        ]