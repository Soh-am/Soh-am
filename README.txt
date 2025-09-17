# Smart Tourist Safety System

## Setup Instructions

1. Install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```

2. Run backend:
   ```bash
   uvicorn backend.main:app --reload
   ```

3. Open `dashboard.html` in your browser.

4. Register a tourist:
   ```powershell
   Invoke-RestMethod -Uri "http://127.0.0.1:8000/register" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"name": "band-123", "lat": 26.40, "lon": 93.00, "safety_score": 80, "battery": 90}'
   ```

5. Simulate location update:
   ```powershell
   Invoke-RestMethod -Uri "http://127.0.0.1:8000/update-location" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"name": "band-123", "lat": 26.46, "lon": 93.04, "battery": 85}'
   ```

Dashboard will update live via WebSocket.
