import os
import uuid
import speech_recognition as sr
from pydub import AudioSegment


def speech_to_text(audio_file):
    recognizer = sr.Recognizer()

    # Create unique temporary filenames
    unique_id = uuid.uuid4().hex

    input_path = f"temp_audio_{unique_id}.m4a"
    output_path = f"temp_audio_{unique_id}.wav"

    try:
        # Save uploaded M4A file
        with open(input_path, "wb") as file:
            for chunk in audio_file.chunks():
                file.write(chunk)

        # Convert M4A → WAV
        audio = AudioSegment.from_file(
            input_path,
            format="m4a"
        )

        audio.export(
            output_path,
            format="wav"
        )

        # Speech recognition
        with sr.AudioFile(output_path) as source:
            audio_data = recognizer.record(source)

        text = recognizer.recognize_google(audio_data)

        return text

    finally:
        # Delete temporary files
        if os.path.exists(input_path):
            os.remove(input_path)

        if os.path.exists(output_path):
            os.remove(output_path)