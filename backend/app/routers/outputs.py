from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .. import state
from ..database import SessionLocal
from ..models import OutputState

router = APIRouter(prefix="/api/outputs", tags=["outputs"])

NAMES = ["led", "rgb", "relay1", "relay2", "servo", "buzzer", "motor", "fan"]


class OutputPayload(BaseModel):
    state: bool


@router.get("")
def list_outputs():
    out = []
    for name in NAMES:
        out.append({"name": name, "state": state.STATE["outputs"].get(name, False)})
    return out


@router.post("/{name}")
def set_output(name: str, payload: OutputPayload):
    if name not in state.STATE["outputs"]:
        raise HTTPException(404, f"Output '{name}' tidak dikenal")
    state.STATE["outputs"][name] = payload.state
    state.add_log("info", "User", f"Output {name} di-set ke {'ON' if payload.state else 'OFF'}")
    # simpan ke database bila tersedia
    try:
        db = SessionLocal()
        row = db.query(OutputState).filter_by(name=name).first()
        if row is None:
            row = OutputState(name=name)
            db.add(row)
        row.state = payload.state
        db.commit()
        db.close()
    except Exception:
        pass
    return {"name": name, "state": payload.state}