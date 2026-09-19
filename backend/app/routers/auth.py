from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .. import config, state

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginPayload(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(payload: LoginPayload):
    if payload.username == config.AUTH_USERNAME and payload.password == config.AUTH_PASSWORD:
        return {
            "token": "demo-token-2026",
            "user": {"username": payload.username, "name": "Student", "role": "Learning Mode"},
        }
    raise HTTPException(401, "Username atau password salah")


@router.get("/me")
def me():
    return {"username": config.AUTH_USERNAME, "name": "Student", "role": "Learning Mode", "ip": state.STATE["device"]["ip"]}