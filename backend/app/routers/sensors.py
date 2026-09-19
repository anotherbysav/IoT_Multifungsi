from fastapi import APIRouter, HTTPException, Query

from .. import state

router = APIRouter(prefix="/api/sensors", tags=["sensors"])


@router.get("")
def list_sensors():
    """Daftar semua sensor + nilai terbaru."""
    return [
        {k: v for k, v in s.items()}
        for s in state.STATE["sensors"].values()
    ]


@router.get("/{sensor_id}")
def get_sensor(sensor_id: str):
    s = state.STATE["sensors"].get(sensor_id)
    if not s:
        raise HTTPException(404, f"Sensor '{sensor_id}' tidak ditemukan")
    payload = {k: v for k, v in s.items()}
    payload.pop("history", None)
    return payload


@router.get("/{sensor_id}/history")
def sensor_history(sensor_id: str, limit: int = Query(60, ge=1, le=500)):
    s = state.STATE["sensors"].get(sensor_id)
    if not s:
        raise HTTPException(404, f"Sensor '{sensor_id}' tidak ditemukan")
    return {"sensor_id": sensor_id, "unit": s["unit"], "values": s["history"][-limit:]}