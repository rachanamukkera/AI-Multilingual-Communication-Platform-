"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    # Accounts APIs
    path("api/accounts/", include("accounts.urls")),

    # Translation APIs
    path("api/translation/", include("translation.urls")),

    #speech APIs
    path("api/speech/", include("speech.urls")),

    #tts 
    path("api/tts/", include("tts.urls")),

    #ocr path
    path("api/ocr/", include("ocr.urls")),

    #language detection
    path("api/language-detection/",include("language_detection.urls")),

    #ai_chat
    path("api/ai-chat/", include("ai_chat.urls")),

    #smart replies
    path("api/smart-replies/",include("smart_replies.urls")),

    #summarization
    path("api/summarization/",include("summarization.urls")),

    #grammar_correction
    path("api/grammar-correction/",include("grammar_correction.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
