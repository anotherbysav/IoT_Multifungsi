from fastapi import APIRouter, Query
from fastapi.responses import Response

from .. import state

router = APIRouter(prefix="/api/logs", tags=["logs"])


@router.get("")
def list_logs(limit: int = Query(100, ge=1, le=1000), level: str = "all"):
    rows = state.STATE["logs"]
    if level != "all":
        rows = [r for r in rows if r["level"] == level]
    return rows[:limit]


@router.get("/export")
def export_csv():
    head = "id,waktu,sumber,tingkat,pesan"
    lines = [head]
    for r in state.STATE["logs"]:
        lines.append(f'{r["id"]},{r["created_at"]},{r["source"]},{r["level"]},"{r["message"]}"')
    csv_text = "\ufeff" + "\n".join(lines)
    fname = "data-logs.csv"
    return Response(
        content=csv_text,
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{fname}"'},
    )