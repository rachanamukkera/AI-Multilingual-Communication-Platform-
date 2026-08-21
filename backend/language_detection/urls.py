from django.urls import path
from .views import LanguageDetectionView

urlpatterns = [
    path("", LanguageDetectionView.as_view(), name="language-detection"),
]