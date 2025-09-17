from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import json
import asyncio
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
conn = sqlite3.connect("tourists.db", check_same_thread=False)
c = conn.cursor()
c.execute("""CREATE TABLE IF NOT EXISTS tourists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    lat REAL,
    lon REAL,
    safety_score INTEGER,
    battery INTEGER
)""")
conn.commit()

# ThreadPoolExecutor for SQLite operations
executor = ThreadPoolExecutor(max_workers=5)

class Tourist(BaseModel):
    name: str
    lat: float
    lon: float
    safety_score: int = 70
    battery: int = 100

# ---------- Helper functions to run DB queries in thread pool ----------
async def db_execute(query, params=()):
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(executor, lambda: c.execute(query, params))

async def db_fetchall(query, params=()):
    loop = asyncio.get_running_loop()
    def _fetch():
        c.execute(query, params)
        return c.fetchall()
    return await loop.run_in_executor(executor, _fetch)

async def db_commit():
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(executor, conn.commit)

# ---------- API Endpoints ----------
@app.post("/register")
async def register_tourist(tourist: Tourist):
    try:
        await db_execute(
            "INSERT OR IGNORE INTO tourists (name, lat, lon, safety_score, battery) VALUES (?, ?, ?, ?, ?)",
            (tourist.name, tourist.lat, tourist.lon, tourist.safety_score, tourist.battery)
        )
        await db_commit()
        print(f"[REGISTER] Tourist {tourist.name} registered at ({tourist.lat}, {tourist.lon})")
        return {"message": "Tourist registered successfully"}
    except Exception as e:
        print(f"[ERROR] register failed: {e}")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

@app.get("/tourists")
async def get_tourists():
    rows = await db_fetchall("SELECT * FROM tourists")
    return [{"id": r[0], "name": r[1], "lat": r[2], "lon": r[3], "safety_score": r[4], "battery": r[5]} for r in rows]

@app.post("/update-location")
async def update_location(data: dict):
    try:
        name = data.get("name")
        lat = data.get("lat")
        lon = data.get("lon")
        battery = data.get("battery", 100)

        if not name:
            raise HTTPException(status_code=400, detail="Name (device id) required")

        result = await db_fetchall("SELECT id FROM tourists WHERE name=?", (name,))
        if not result:
            raise HTTPException(status_code=404, detail=f"Tourist '{name}' not found. Please register first.")

        await db_execute("UPDATE tourists SET lat=?, lon=?, battery=? WHERE name=?", (lat, lon, battery, name))
        await db_commit()

        print(f"[UPDATE] {name} moved to lat={lat}, lon={lon}, battery={battery}")

        # Broadcast to all connected websocket clients
        message = json.dumps({
            "type": "update",
            "name": name,
            "lat": lat,
            "lon": lon,
            "battery": battery
        })
        await broadcast(message)

        return {"message": "Location updated successfully"}
    except Exception as e:
        print(f"[ERROR] update-location failed: {e}")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")

# ---------- WebSocket ----------
clients = set()

async def broadcast(message: str):
    disconnected = []
    for client in clients:
        try:
            await client.send_text(message)
        except:
            disconnected.append(client)
    for d in disconnected:
        clients.remove(d)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    print(f"[WS] New client connected. Total clients: {len(clients)}")
    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        clients.remove(websocket)
        print(f"[WS] Client disconnected. Total clients: {len(clients)}")
