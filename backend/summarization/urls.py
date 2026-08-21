from django.urls import path
from .views import SummarizationView

urlpatterns = [
    path("", SummarizationView.as_view(), name="summarization"),
]