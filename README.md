# 🎵 P-Music TD - Music Streaming Platform

<div align="center">

A modern, full-stack music streaming application built with FastAPI and React, featuring audio playback, content management, and user authentication.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat&logo=postgresql)](https://www.postgresql.org)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Scripts & Commands](#-scripts--commands)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**P-Music TD** is a Spotify-like music streaming platform that allows users to discover, upload, and play music. Built with modern web technologies, it features a robust backend API, responsive frontend, and comprehensive music management capabilities.

### Key Highlights

- 🎵 **Full Audio Playback** - Stream music with Howler.js powered player
- 📤 **Content Upload** - Upload songs and albums with metadata
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- 🔐 **Secure Authentication** - JWT-based authentication system
- 👥 **Role-Based Access** - User, Creator, Premium, and Admin roles
- 📊 **Analytics** - Track plays and popular content
- 🎼 **Album Management** - Organize songs into albums
- ❤️ **Favorites** - Like and save favorite tracks
- 📋 **Playlists** - Create and manage custom playlists

---

## ✨ Features

### User Features
- ✅ User registration and authentication
- ✅ Browse songs, albums, and artists
- ✅ Search functionality across all content
- ✅ Audio playback with full controls (play, pause, skip, seek)
- ✅ Volume control with visual feedback
- ✅ Like songs and build favorites library
- ✅ Create and manage custom playlists
- ✅ View listening history

### Creator Features
- ✅ Upload individual songs with cover art
- ✅ Create and upload full albums
- ✅ Manage uploaded content
- ✅ View content approval status
- ✅ Track play counts and analytics

### Admin Features
- ✅ Content moderation and approval
- ✅ User management
- ✅ Full system access
- ✅ Platform analytics

---

## 🛠 Technology Stack

### Backend
- **Framework**: FastAPI 0.109.0
- **Language**: Python 3.12+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic
- **Authentication**: JWT (python-jose)
- **Password Hashing**: Bcrypt
- **Server**: Uvicorn (ASGI)
- **Validation**: Pydantic
- **File Upload**: python-multipart, aiofiles

### Frontend
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS 3.4.0
- **State Management**: Zustand 4.4.7
- **Routing**: React Router 6.21.1
- **HTTP Client**: Axios 1.6.5
- **Audio**: Howler.js 2.2.4
- **Animations**: Framer Motion 10.18.0
- **Notifications**: React Hot Toast 2.4.1
- **Icons**: Lucide React 0.303.0

### Development Tools
- **Linting**: ESLint, TypeScript ESLint
- **Testing**: Pytest, pytest-asyncio
- **Code Quality**: Autoprefixer, PostCSS

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.12+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **npm 10+** (comes with Node.js)
- **PostgreSQL** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** - [Download Git](https://git-scm.com/downloads)

### Verify Installation

```bash
python --version    # Should be 3.12+
node --version      # Should be v18+
npm --version       # Should be 10+
psql --version      # Verify PostgreSQL is installed
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Andert51/P-Music_td.git
cd P-Music_td
```

### 2. Database Setup

Create the PostgreSQL database:

```bash
# Using psql
psql -U postgres
CREATE DATABASE music_app;
\q

# Or using createdb command
createdb music_app
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```bash
# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/music_app

# Security
SECRET_KEY=your-secret-key-here-generate-a-secure-random-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# Upload Configuration
UPLOAD_DIR=./uploads
```

**Generate a secure SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 4. Automated Setup

The easiest way to get started is using the setup script:

```powershell
# Windows PowerShell
.\setup.ps1
```

This script will:
- Create Python virtual environment
- Install backend dependencies
- Install frontend dependencies
- Set up directory structure

### 5. Run Database Migrations

```powershell
.\migrate.ps1
```

Or manually:
```bash
# Activate virtual environment first
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Run migrations
alembic upgrade head
```

### 6. Start the Application

**Option 1: Using automated script (Recommended)**

```powershell
# Windows - Double click start.bat or run:
.\start.ps1
```

**Option 2: Manual start**

```bash
# Terminal 1 - Backend
cd src/backend
python main.py
# Or with uvicorn: uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd src/frontend
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### 8. Create Your First Account

1. Navigate to http://localhost:5173
2. Click "Register"
3. Choose role:
   - **User**: Basic streaming access
   - **Creator**: Can upload content
4. Start exploring!

#### Albums

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/albums/` | List all albums | No |
| GET | `/albums/{id}` | Get album with songs | No |
| POST | `/albums/` | Create album | Yes (Creator) |

#### Playlists

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/playlists/` | List user playlists | Yes |
| POST | `/playlists/` | Create playlist | Yes |
| GET | `/playlists/{id}` | Get playlist details | Yes |
| POST | `/playlists/{id}/songs/{song_id}` | Add song to playlist | Yes |
| DELETE | `/playlists/{id}/songs/{song_id}` | Remove song | Yes |

#### Upload (Creator/Admin only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/upload/song` | Upload single song | Yes (Creator) |
| POST | `/upload/album` | Upload full album | Yes (Creator) |
| GET | `/upload/my-uploads` | Get user uploads | Yes (Creator) |

### Request Examples

#### Register User

```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "newuser",
    "password": "securepassword123",
    "role": "user"
  }'
```

---

## 👨‍💻 Development

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   # Backend tests
   cd src/backend
   pytest
   
   # Frontend lint
   cd src/frontend
   npm run lint
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

#### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Keep functions focused and small

```python
def get_song_by_id(db: Session, song_id: int) -> Optional[Song]:
    """
    Retrieve a song by its ID.
    
    Args:
        db: Database session
        song_id: ID of the song to retrieve
        
    Returns:
        Song object or None if not found
    """
    return db.query(Song).filter(Song.id == song_id).first()
```

#### TypeScript (Frontend)
- Use TypeScript strict mode
- Define interfaces for data structures
- Use functional components with hooks


## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/P-Music_td.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Test thoroughly**
6. **Commit with clear messages**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines

- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and atomic
- Be respectful and collaborative

### Commit Message Convention

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---


## 🗺️ Roadmap

### Current Version (v1.0.0)
- ✅ Core authentication system
- ✅ Audio streaming and playback
- ✅ File upload system
- ✅ Album and playlist management
- ✅ Search functionality
- ✅ User favorites

### Upcoming Features (v1.1.0)
- 🔄 Real-time notifications
- 🔄 Social features (follow artists)
- 🔄 Advanced analytics dashboard
- 🔄 Recommendation engine
- 🔄 Mobile app (React Native)

### Future Enhancements (v2.0.0)
- 🔮 Lyrics integration
- 🔮 Live streaming support
- 🔮 Payment integration
- 🔮 Advanced audio features (equalizer, crossfade)
- 🔮 Podcast support

---

## 📊 Project Stats

- **Backend**: Python, FastAPI, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- **Lines of Code**: 10,000+
- **Components**: 20+
- **API Endpoints**: 30+
- **Database Tables**: 7

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

<div align="center">

**Built with ❤️ using FastAPI and React**

[⬆ Back to Top](#-p-music-td---music-streaming-platform)

</div>