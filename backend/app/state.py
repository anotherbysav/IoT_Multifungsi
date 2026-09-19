"""State dalam-memory + simulasi data real-time.

Frontend dapat langsung memakai endpoint ini (tanpa perlu perangkat nyata).
Ketika MySQL sudah tersedia, data tetap bisa disimpan via router (opsional).
"""

import asyncio
import random
from datetime import datetime

from . import config

SENSORS = [
    {"id": "suhu", "label": "Suhu", "unit": "°C", "value": 28.6, "amp": 0.9, "type": "DHT22", "pin": "D4",
     "bounds": (22, 34)},
    {"id": "kelembapan", "label": "Kelembapan", "unit": "%", "value": 72, "amp": 3, "type": "DHT22", "pin": "D4",
     "bounds": (45, 90)},
    {"id": "cahaya", "label": "Intensitas Cahaya", "unit": "lux", "value": 430, "amp": 40, "type": "BH1750",
     "pin": "I2C", "bounds": (120, 760)},
    {"id": "udara", "label": "Kualitas Udara", "unit": "ppm", "value": 12, "amp": 2, "type": "MQ-135", "pin": "A0",
     "bounds": (5, 40)},
    {"id": "tanah", "label": "Kelembapan Tanah", "unit": "%", "value": 65, "amp": 4, "type": "Capacitive", "pin": "A1",
     "bounds": (25, 95)},
    {"id": "tekanan", "label": "Tekanan Udara", "unit": "hPa", "value": 1012, "amp": 2, "type": "BMP280", "pin": "I2C",
     "bounds": (995, 1030)},
    {"id": "jarak", "label": "Jarak (Ultrasonik)", "unit": "cm", "value": 24, "amp": 3, "type": "HC-SR04", "pin": "D5",
     "bounds": (4, 140)},
    {"id": "getaran", "label": "Getaran", "unit": "g", "value": 0.03, "amp": 0.02, "type": "SW-420", "pin": "D2",
     "bounds": (0, 0.5)},
]

STATE = {
    "sensors": {},
    "device": {"online": True, "ip": "192.168.1.100", "name": "ESP32 Smart Lab", "firmware": "v2.4.1"},
    "outputs": {k: False for k in ("led", "rgb", "relay1", "relay2", "servo", "buzzer", "motor", "fan")},
    "alerts": [
        {"id": 4, "title": "Orang terdeteksi di kamera", "status": "info", "created_at": datetime.now().isoformat()},
        {"id": 3, "title": "Suhu tinggi (> 30°C)", "status": "warning", "created_at": datetime.now().isoformat()},
        {"id": 2, "title": "Sensor tidak merespons (DHT22)", "status": "critical", "created_at": datetime.now().isoformat()},
        {"id": 1, "title": "Intensitas cahaya rendah", "status": "warning", "created_at": datetime.now().isoformat()},
    ],
    "logs": [
        {"id": 1, "level": "info", "source": "System", "message": "API backend berhasil dimulai",
         "created_at": datetime.now().isoformat()},
    ],
    "experiments": [
        {"id": 1, "name": "Kontrol Suhu Otomatis", "status": "running", "progress": 62, "sensor": "Suhu",
         "output": "Kipas"},
        {"id": 2, "name": "Monitoring Cahaya Ruangan", "status": "paused", "progress": 34, "sensor": "Intensitas Cahaya",
         "output": "LED"},
        {"id": 3, "name": "Deteksi Wajah di Pintu", "status": "completed", "progress": 100, "sensor": "Kamera",
         "output": "Buzzer"},
    ],
}

_next_id = {"alert": 100, "log": 100, "exp": 100}


def seed():
    for s in SENSORS:
        history = []
        v = s["value"]
        for _ in range(config.SIM_BUFFER):
            v += random.uniform(-1, 1) * s["amp"] * 0.5
            lo, hi = s["bounds"]
            v = min(hi, max(lo, v))
            history.append(round(v, 2))
        STATE["sensors"][s["id"]] = {
            "id": s["id"], "label": s["label"], "unit": s["unit"], "type": s["type"], "pin": s["pin"],
            "value": round(s["value"], 4), "change": 0.0, "dir": "up", "history": history,
        }


def tick():
    for s in SENSORS:
        buf = STATE["sensors"][s["id"]]
        prev = buf["value"]
        nxt = prev + random.uniform(-1, 1) * s["amp"] * 0.6 + s["amp"] * 0.04
        lo, hi = s["bounds"]
        nxt = min(hi, max(lo, nxt))
        buf["value"] = round(nxt, 4)
        buf["change"] = round(abs(nxt - prev), 2)
        buf["dir"] = "up" if nxt >= prev else "down"
        buf["history"].append(round(nxt, 2))
        if len(buf["history"]) > config.SIM_BUFFER:
            buf["history"].pop(0)


async def _loop():
    while True:
        tick()
        await asyncio.sleep(config.SIM_INTERVAL)


async def start_simulation(app):
    seed()
    app.state.sim_task = asyncio.create_task(_loop())
    print(f"[SIM] Simulasi sensor berjalan tiap {config.SIM_INTERVAL}s")


def add_alert(title, status="info"):
    _next_id["alert"] += 1
    a = {"id": _next_id["alert"], "title": title, "status": status, "created_at": datetime.now().isoformat()}
    STATE["alerts"].insert(0, a)
    return a


def add_log(level, source, message):
    _next_id["log"] += 1
    l = {"id": _next_id["log"], "level": level, "source": source, "message": message,
         "created_at": datetime.now().isoformat()}
    STATE["logs"].insert(0, l)
    return l