from rest_framework import serializers


class SpeechSerializer(serializers.Serializer):
    audio = serializers.FileField()