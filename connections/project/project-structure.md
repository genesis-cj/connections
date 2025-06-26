# GENESIS EI-OS Full-Stack Project Structure

## 📁 Recommended Project Structure

```
genesis-ei-os/
├── frontend/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── apps/                  # EI Applications
│   │   │   │   ├── EIDashboard.tsx
│   │   │   │   ├── DNAEngine.tsx
│   │   │   │   ├── VinLoreVault.tsx
│   │   │   │   ├── MemoryLayer.tsx
│   │   │   │   ├── NeuralMonitor.tsx
│   │   │   │   └── EmotionTracker.tsx
│   │   │   ├── ui/                    # Reusable UI Components
│   │   │   │   ├── Window.tsx
│   │   │   │   ├── Taskbar.tsx
│   │   │   │   ├── AppLauncher.tsx
│   │   │   │   └── DesktopWidget.tsx
│   │   │   ├── Desktop.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── WindowManager.tsx
│   │   ├── context/
│   │   │   ├── AppContext.tsx
│   │   │   ├── EmotionalContext.tsx
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   ├── useAPI.ts
│   │   │   ├── useWebSocket.ts
│   │   │   └── useEmotionalState.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── websocket.ts
│   │   │   └── auth.ts
│   │   ├── types/
│   │   │   ├── emotion.ts
│   │   │   ├── memory.ts
│   │   │   └── api.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── formatters.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                           # Python Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI app entry point
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py              # App configuration
│   │   │   ├── security.py            # Authentication & security
│   │   │   └── database.py            # Database connection
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── deps.py                # Dependencies
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── api.py             # API router
│   │   │       └── endpoints/
│   │   │           ├── __init__.py
│   │   │           ├── auth.py
│   │   │           ├── emotions.py
│   │   │           ├── memories.py
│   │   │           ├── dna_engine.py
│   │   │           └── neural_monitor.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── emotion.py
│   │   │   ├── memory.py
│   │   │   └── neural_data.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── emotion.py
│   │   │   ├── memory.py
│   │   │   └── neural_data.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── emotion_service.py
│   │   │   ├── memory_service.py
│   │   │   ├── dna_engine.py
│   │   │   └── neural_processor.py
│   │   ├── ai/
│   │   │   ├── __init__.py
│   │   │   ├── emotion_analyzer.py
│   │   │   ├── pattern_recognition.py
│   │   │   └── consciousness_bridge.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── helpers.py
│   │       └── validators.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py
│   │   └── test_services.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── shared/                            # Shared configurations
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .env.example
│
├── docs/                              # Documentation
│   ├── api.md
│   ├── setup.md
│   └── architecture.md
│
├── scripts/                           # Deployment & utility scripts
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🔧 Backend Setup (Python/FastAPI)

### 1. Core Dependencies (requirements.txt)
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
sqlalchemy==2.0.23
alembic==1.13.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
websockets==12.0
redis==5.0.1
numpy==1.24.3
scikit-learn==1.3.0
tensorflow==2.13.0
python-dotenv==1.0.0
psycopg2-binary==2.9.7
```

### 2. Main FastAPI App (backend/app/main.py)
```python
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title="GENESIS EI-OS API",
    description="Digital Nervous System for Emotional Intelligence",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # Real-time emotional data streaming
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 3. Configuration (backend/app/core/config.py)
```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "GENESIS EI-OS"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost/genesis_ei_os"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI/ML
    OPENAI_API_KEY: Optional[str] = None
    
    # Redis for caching
    REDIS_URL: str = "redis://localhost:6379"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## ⚛️ Frontend Setup (React/TypeScript)

### 1. API Service (frontend/src/services/api.ts)
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class APIService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('access_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Emotion endpoints
  async getEmotions() {
    return this.request('/emotions');
  }

  async createEmotion(emotion: EmotionCreate) {
    return this.request('/emotions', {
      method: 'POST',
      body: JSON.stringify(emotion),
    });
  }

  // Memory endpoints
  async getMemories() {
    return this.request('/memories');
  }

  async createMemory(memory: MemoryCreate) {
    return this.request('/memories', {
      method: 'POST',
      body: JSON.stringify(memory),
    });
  }

  // DNA Engine endpoints
  async getDNAStatus() {
    return this.request('/dna-engine/status');
  }

  async updateDNAConfig(config: DNAConfig) {
    return this.request('/dna-engine/config', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }
}

export const apiService = new APIService();
```

### 2. WebSocket Hook (frontend/src/hooks/useWebSocket.ts)
```typescript
import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Open' | 'Closing' | 'Closed'>('Connecting');

  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      setConnectionStatus('Open');
      setSocket(ws);
    };
    
    ws.onmessage = (event) => {
      setLastMessage(JSON.parse(event.data));
    };
    
    ws.onclose = () => {
      setConnectionStatus('Closed');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return { socket, lastMessage, connectionStatus, sendMessage };
};
```

### 3. Environment Configuration (frontend/.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_APP_NAME=GENESIS EI-OS
```

## 🐳 Docker Setup

### 1. Backend Dockerfile (backend/Dockerfile)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2. Docker Compose (shared/docker-compose.yml)
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000/api/v1

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/genesis_ei_os
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=genesis_ei_os
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

## 🚀 Development Workflow

### 1. Setup Script (scripts/setup.sh)
```bash
#!/bin/bash

echo "Setting up GENESIS EI-OS development environment..."

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install

# Database setup
cd ../backend
alembic upgrade head

echo "Setup complete! Run 'npm run dev' in frontend and 'uvicorn app.main:app --reload' in backend"
```

### 2. Package.json Scripts (frontend/package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "dev:full": "concurrently \"npm run dev\" \"cd ../backend && uvicorn app.main:app --reload\""
  }
}
```

## 🔗 Connection Points

### 1. Real-time Emotional Data
- **Frontend**: WebSocket connection for live emotional state updates
- **Backend**: WebSocket endpoint streaming neural data and emotional insights

### 2. API Integration
- **Authentication**: JWT tokens for secure API access
- **Data Sync**: RESTful endpoints for CRUD operations
- **File Upload**: Secure memory and emotional data storage

### 3. AI Processing
- **Emotion Analysis**: Python ML models processing emotional patterns
- **Memory Processing**: AI-powered memory categorization and insights
- **DNA Engine**: Adaptive learning algorithms

This structure provides a scalable, maintainable foundation for GENESIS EI-OS with clear separation of concerns and proper full-stack integration.