import os

from dotenv import load_dotenv

load_dotenv()

APP_ENV = os.getenv("APP_ENV", "dev")

# ----------------------------------------------------------------------
# URI database.
# Default (dev): SQLite agar aplikasi langsung jalan tanpa server MySQL.
# Untuk MySQL cukup set APP_ENV=prod (atau isi DB_URL secara manual).
# ----------------------------------------------------------------------
_env_db = os.getenv("DB_URL", "").strip()
if _env_db:
    DATABASE_URL = _env_db
elif APP_ENV == "prod":
    DATABASE_URL = (
        f"mysql+pymysql://{os.getenv('MYSQL_USER', 'root')}"
        f":{os.getenv('MYSQL_PASSWORD', '')}"
        f"@{os.getenv('MYSQL_HOST', '127.0.0.1')}"
        f":{os.getenv('MYSQL_PORT', '3306')}"
        f"/{os.getenv('MYSQL_DB', 'iot_dashboard')}"
        f"?charset={os.getenv('MYSQL_CHARSET', 'utf8mb4')}"
    )
else:
    DATABASE_URL = "sqlite:///./iot_dev.db"

CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if o.strip()]

AUTH_USERNAME = os.getenv("AUTH_USERNAME", "student")
AUTH_PASSWORD = os.getenv("AUTH_PASSWORD", "student123")

SIM_INTERVAL = float(os.getenv("SIM_INTERVAL", "2.0"))
SIM_BUFFER = 60