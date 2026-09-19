from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import config, state
from .database import init_db
from .routers import alerts, auth, experiments, logs, outputs, sensors


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    await state.start_simulation(app)
    yield
    app.state.sim_task.cancel()


app = FastAPI(
    title="IoT & AI Dashboard API",
    version="1.0.0",
    description="Backend dashboard monitoring IoT (ESP32) + AI (YOLOv8/LLM).",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensors.router)
app.include_router(outputs.router)
app.include_router(alerts.router)
app.include_router(experiments.router)
app.include_router(logs.router)
app.include_router(auth.router)


@app.get("/api/health")
def health():
    return {"status": "ok", "app": "iot-ai-dashboard", "db": config.DATABASE_URL.split("@")[-1], "online": True}