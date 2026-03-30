# KrishiAI – Smart Farmer Decision System

Production-style full-stack MVP for farmers with React + Express + MongoDB + FastAPI AI inference.

## Folder Structure

```
assingment-1/
├── frontend/                 # React + Vite + Tailwind + Framer Motion
│   ├── public/sw.js          # Offline service worker
│   └── src/
├── backend/                  # Express API + MongoDB + JWT
│   └── src/
├── ai-service/               # FastAPI disease detection microservice
│   └── app/
└── docker-compose.yml
```

## Features

- JWT auth (signup/login/me)
- 7-day weather from OpenWeather API
- Crop recommendation API based on soil/season/location
- Plant disease detection via FastAPI + TensorFlow model (with mock fallback)
- Mandi prices (seeded data; can be replaced with live government API ingestion)
- Government schemes with Bihar filter support
- AI chatbot via OpenAI API (Hindi + English)
- Voice input/output in browser (SpeechRecognition + SpeechSynthesis)
- Offline basics via service worker
- Push notifications backend endpoint + VAPID scaffolding

## Environment Setup

### 1) Backend

```bash
cp backend/.env.example backend/.env
```

Set:
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENWEATHER_API_KEY`
- `OPENAI_API_KEY`
- `AI_SERVICE_URL`
- `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY`

### 2) Frontend

```bash
cp frontend/.env.example frontend/.env
```

Set:
- `VITE_API_BASE_URL`
- `VITE_VAPID_PUBLIC_KEY`

### 3) AI Service

```bash
cp ai-service/.env.example ai-service/.env
```

Set:
- `MODEL_PATH` (TensorFlow .h5 model path)

## Run Locally

### Option A: Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- AI service: http://localhost:8000
- MongoDB: mongodb://localhost:27017

### Option B: Manual

```bash
# terminal 1
cd backend && npm install && npm run dev

# terminal 2
cd ai-service && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000

# terminal 3
cd frontend && npm install && npm run dev
```

## API Overview

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Core Features
- `GET /api/features/weather?lat=..&lon=..`
- `POST /api/features/crop-recommendation`
- `POST /api/features/disease-detection` (multipart: `image`)
- `GET /api/features/market-prices?state=Bihar`
- `GET /api/features/schemes?state=Bihar`
- `POST /api/features/chat`
- `POST /api/features/notifications/subscribe`

## Production Upgrade Notes

- Replace seeded mandi prices with AGMARKNET API sync job.
- Add Redis cache for weather and market APIs.
- Add role-based access controls and refresh token rotation.
- Replace mock model fallback by shipping real trained `.h5` model in object storage.
- Add CI/CD pipelines and container scanning.
