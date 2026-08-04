from django.db import models
from django.contrib.auth.models import User


class Translation(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="translations"
    )

    source_text = models.TextField()

    translated_text = models.TextField()

    source_language = models.CharField(
        max_length=50
    )

    target_language = models.CharField(
        max_length=50
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.target_language}"