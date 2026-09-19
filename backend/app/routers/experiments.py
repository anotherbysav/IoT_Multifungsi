from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .. import state

router = APIRouter(prefix="/api/experiments", tags=["experiments"])


class ExperimentPayload(BaseModel):
    name: str
    sensor: str = ""
    output: str = ""


class ExperimentStatus(BaseModel):
    status: str


@router.get("")
def list_experiments():
    return state.STATE["experiments"]


@router.post("")
def create_experiment(payload: ExperimentPayload):
    if not payload.name.strip():
        raise HTTPException(422, "Nama eksperimen tidak boleh kosong")
    state._next_id["exp"] += 1
    exp = {"id": state._next_id["exp"], "name": payload.name, "status": "idle", "progress": 0,
           "sensor": payload.sensor, "output": payload.output}
    state.STATE["experiments"].insert(0, exp)
    state.add_log("info", "User", f"Eksperimen '{payload.name}' dibuat")
    return exp


@router.patch("/{exp_id}")
def update_experiment_status(exp_id: int, payload: ExperimentStatus):
    for e in state.STATE["experiments"]:
        if e["id"] == exp_id:
            e["status"] = payload.status
            if payload.status == "completed":
                e["progress"] = 100
            return e
    raise HTTPException(404, "Eksperimen tidak ditemukan")


@router.delete("/{exp_id}")
def delete_experiment(exp_id: int):
    before = len(state.STATE["experiments"])
    state.STATE["experiments"] = [e for e in state.STATE["experiments"] if e["id"] != exp_id]
    if len(state.STATE["experiments"]) == before:
        raise HTTPException(404, "Eksperimen tidak ditemukan")
    return {"ok": True}