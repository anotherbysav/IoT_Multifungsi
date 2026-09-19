from fastapi import APIRouter
from pydantic import BaseModel

from .. import state

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


class AlertPayload(BaseModel):
    title: str
    status: str = "info"


@router.get("")
def list_alerts(limit: int = 20):
    return state.STATE["alerts"][:limit]


@router.post("")
def create_alert(payload: AlertPayload):
    a = state.add_alert(payload.title, payload.status)
    return a