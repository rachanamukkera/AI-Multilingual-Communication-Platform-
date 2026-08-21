from django.urls import path
from .views import GrammarCorrectionView

urlpatterns = [
    path("", GrammarCorrectionView.as_view(), name="grammar-correction"),
]