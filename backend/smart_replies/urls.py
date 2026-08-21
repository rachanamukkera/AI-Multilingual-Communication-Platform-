from django.urls import path
from .views import SmartRepliesView

urlpatterns = [
    path("", SmartRepliesView.as_view(), name="smart-replies"),
]