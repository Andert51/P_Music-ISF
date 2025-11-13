from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from routes import auth, users, songs, playlists, albums, upload
from database import engine, Base
from config import settings

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Music Streaming API",
    description="Spotify-like music streaming platform API",
    version="1.0.0"
)

# CORS debe estar ANTES de los routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Importante para audio streaming
)

# Crear directorio de uploads si no existe
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)