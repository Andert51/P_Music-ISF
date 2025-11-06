from pydantic_settings import BaseSettings
from typing import Optional
import os
from pathlib import Path

# Obtener la raiz del proyecto
PROJECT_ROOT = Path(__file__).parent.parent.parent
ENV_FILE = PROJECT_ROOT / ".env"


