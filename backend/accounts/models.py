from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True
    )

    preferred_language = models.CharField(
        max_length=50,
        default="English"
    )

    country = models.CharField(
        max_length=100,
        blank=True
    )

    timezone = models.CharField(
        max_length=100,
        default="Asia/Kolkata"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.user.username