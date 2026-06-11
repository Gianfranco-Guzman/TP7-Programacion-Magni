import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "sqlite:///./participantes.db"

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://lobularly-unprosaical-nedra.ngrok-free.dev",
]

MP_ACCESS_TOKEN = os.environ.get("MP_ACCESS_TOKEN", "")
NGROK_URL = os.environ.get("NGROK_URL", "https://lobularly-unprosaical-nedra.ngrok-free.dev")
