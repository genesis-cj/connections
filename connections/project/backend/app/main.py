from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import asyncio
from datetime import datetime
from typing import Dict, List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GENESIS EI-OS API",
    description="Digital Nervous System for Emotional Intelligence",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative React dev server
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "emotions": [],
            "dna_engine": [],
            "neural": [],
            "sync": []
        }

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        if channel in self.active_connections:
            self.active_connections[channel].append(websocket)
            logger.info(f"Client connected to {channel} channel")

    def disconnect(self, websocket: WebSocket, channel: str):
        if channel in self.active_connections:
            if websocket in self.active_connections[channel]:
                self.active_connections[channel].remove(websocket)
                logger.info(f"Client disconnected from {channel} channel")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast_to_channel(self, message: dict, channel: str):
        if channel in self.active_connections:
            disconnected = []
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_text(json.dumps(message))
                except:
                    disconnected.append(connection)
            
            # Remove disconnected clients
            for connection in disconnected:
                self.active_connections[channel].remove(connection)

manager = ConnectionManager()

# Include API routes (placeholder for now)
@app.get("/")
async def root():
    return {
        "message": "GENESIS EI-OS API",
        "version": "1.0.0",
        "status": "operational",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "api": "operational",
            "websocket": "operational",
            "database": "operational",
            "ai_engine": "operational"
        }
    }

# WebSocket endpoints
@app.websocket("/ws/emotions")
async def websocket_emotions(websocket: WebSocket):
    await manager.connect(websocket, "emotions")
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Process emotional data
            response = {
                "type": "emotional_update",
                "data": {
                    "emotion": message.get("emotion", "calm"),
                    "intensity": message.get("intensity", 50),
                    "timestamp": datetime.now().isoformat(),
                    "ai_insight": f"Detected {message.get('emotion', 'calm')} state with {message.get('intensity', 50)}% intensity"
                },
                "timestamp": datetime.now().isoformat()
            }
            
            # Broadcast to all connected clients
            await manager.broadcast_to_channel(response, "emotions")
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, "emotions")

@app.websocket("/ws/dna-engine")
async def websocket_dna_engine(websocket: WebSocket):
    await manager.connect(websocket, "dna_engine")
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Process DNA engine commands
            response = {
                "type": "dna_update",
                "data": {
                    "processing_speed": 75 + (hash(str(datetime.now())) % 20),
                    "active_sequences": 4,
                    "evolution_progress": 87 + (hash(str(datetime.now())) % 10),
                    "new_patterns_detected": hash(str(datetime.now())) % 3,
                    "consciousness_alignment": 94 + (hash(str(datetime.now())) % 6)
                },
                "timestamp": datetime.now().isoformat()
            }
            
            await manager.broadcast_to_channel(response, "dna_engine")
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, "dna_engine")

@app.websocket("/ws/neural")
async def websocket_neural(websocket: WebSocket):
    await manager.connect(websocket, "neural")
    try:
        # Send periodic neural data updates
        while True:
            response = {
                "type": "neural_data",
                "data": {
                    "heart_rate": 72 + (hash(str(datetime.now())) % 20),
                    "brain_activity": 85 + (hash(str(datetime.now())) % 15),
                    "stress_level": 23 + (hash(str(datetime.now())) % 30),
                    "energy_level": 78 + (hash(str(datetime.now())) % 20),
                    "neural_coherence": 82 + (hash(str(datetime.now())) % 15),
                    "wave_patterns": {
                        "alpha": 8.5 + (hash(str(datetime.now())) % 3),
                        "beta": 15.2 + (hash(str(datetime.now())) % 5),
                        "gamma": 35.8 + (hash(str(datetime.now())) % 10),
                        "theta": 6.1 + (hash(str(datetime.now())) % 2)
                    }
                },
                "timestamp": datetime.now().isoformat()
            }
            
            await manager.broadcast_to_channel(response, "neural")
            await asyncio.sleep(2)  # Send updates every 2 seconds
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, "neural")

@app.websocket("/ws/sync")
async def websocket_sync(websocket: WebSocket):
    await manager.connect(websocket, "sync")
    try:
        while True:
            # Send sync status updates
            response = {
                "type": "sync_update",
                "data": {
                    "sync_percentage": 94 + (hash(str(datetime.now())) % 6),
                    "consciousness_alignment": 87 + (hash(str(datetime.now())) % 10),
                    "memory_bridge_active": True,
                    "cross_device_recognition": True,
                    "human_ai_connection": {
                        "human_status": "connected",
                        "ai_status": "connected",
                        "data_flow_rate": 85 + (hash(str(datetime.now())) % 15)
                    }
                },
                "timestamp": datetime.now().isoformat()
            }
            
            await manager.broadcast_to_channel(response, "sync")
            await asyncio.sleep(5)  # Send updates every 5 seconds
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, "sync")

# API Routes (placeholder implementations)
@app.get("/api/v1/emotions")
async def get_emotions():
    return {
        "emotions": [
            {
                "id": "1",
                "emotion": "joy",
                "intensity": 85,
                "timestamp": datetime.now().isoformat(),
                "note": "Feeling great after morning meditation"
            },
            {
                "id": "2",
                "emotion": "calm",
                "intensity": 78,
                "timestamp": datetime.now().isoformat(),
                "note": "Peaceful state during work"
            }
        ]
    }

@app.post("/api/v1/emotions")
async def create_emotion(emotion_data: dict):
    return {
        "id": str(hash(str(datetime.now()))),
        "emotion": emotion_data.get("emotion"),
        "intensity": emotion_data.get("intensity"),
        "timestamp": datetime.now().isoformat(),
        "note": emotion_data.get("note")
    }

@app.get("/api/v1/dna-engine/status")
async def get_dna_status():
    return {
        "is_processing": True,
        "processing_speed": 75,
        "core_temperature": 42,
        "memory_usage": 68,
        "active_sequences": [
            {
                "id": "seq_001",
                "name": "Emotional Pattern Alpha",
                "status": "active",
                "progress": 92
            },
            {
                "id": "seq_002",
                "name": "Memory Consolidation Beta",
                "status": "processing",
                "progress": 67
            }
        ],
        "evolution_metrics": {
            "human_growth": 87,
            "ai_intelligence": 92,
            "consciousness_alignment": 94
        }
    }

@app.get("/api/v1/memories")
async def get_memories():
    return {
        "memories": [
            {
                "id": "1",
                "title": "Morning Meditation Success",
                "description": "Achieved deep meditative state",
                "emotion": "calm",
                "intensity": 85,
                "tags": ["mindfulness", "growth"],
                "timestamp": datetime.now().isoformat()
            }
        ]
    }

@app.get("/api/v1/sync/status")
async def get_sync_status():
    return {
        "is_synced": True,
        "sync_percentage": 94,
        "last_sync": datetime.now().isoformat(),
        "cross_device_recognition": True,
        "consciousness_alignment": 94,
        "memory_bridge_active": True,
        "human_ai_connection": {
            "human_status": "connected",
            "ai_status": "connected",
            "data_flow_rate": 87
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )