import pytesseract
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from PIL import Image

if os.name == "nt":
    pytesseract.pytesseract.tesseract_cmd = (
        r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    )


class OCRView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        image_file = request.FILES.get("image")

        if not image_file:
            return Response(
                {"error": "Please upload an image."},
                status=400
            )

        try:
            image = Image.open(image_file)

            extracted_text = pytesseract.image_to_string(image)

            return Response({
                "text": extracted_text.strip()
            })

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=500
            )