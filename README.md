# Dashboard Monitoring IoT & AI

Dashboard monitoring profesional untuk kit praktikum IoT + AI: **ESP32**, sensor,
kamera dengan **YOLOv8**, dan rekomendasi berbasis **LLM** — dalam satu tampilan
light-white yang bersih dan formal.

- **Frontend:** Vue 3 + Vite + Vue Router + Lucide Icons (SVG chart custom, tanpa dependency charting)
- **Backend:** Python FastAPI + SQLAlchemy (siap **MySQL**, fallback SQLite untuk pengembangan)
- **Fitur:** 8 sensor real-time, kamera + deteksi objek, analisis AI, quick actions,
  recent alerts, grafik, kontrol output, input digital/analog, eksperimen, log,
  dan 4 modul pembelajaran.

## Struktur Proyek

```
IoT/
├── frontend/            # Vue 3 + Vite
│   └── src/
│       ├── App.vue        # Shell: sidebar + header + router
│       ├── store.js       # State global + simulasi data real-time
│       ├── styles/        # Design system (tokens, card, button, toggle…)
│       ├── components/    # Kartu dashboard (sensor, kamera, grafik, dsb.)
│       ├── views/         # Dashboard, IoT, Vision, Automation, Logs, dll.
│       └── data/learning.js
└── backend/             # Python FastAPI
    ├── run.py
    └── app/
        ├── main.py        # App + CORS + lifespan
        ├── config.py      # Konfigurasi dari env
        ├── database.py    # SQLAlchemy engine/session
        ├── models.py      # Tabel: sensor, output, alert, eksperimen, log
        ├── state.py       # Simulasi data sensor real-time di memori
        └── routers/       # Endpoint API
```

## Menjalankan Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

## Menjalankan Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows (Git Bash: source .venv/bin/activate)
pip install -r requirements.txt
python run.py                   # http://localhost:8000  (Swagger: /docs)
```

Vite sudah diarahkan ke `http://127.0.0.1:8000` untuk semua request `/api`.

### Menggunakan MySQL (opsional)

1. Siapkan database MySQL, misal `CREATE DATABASE iot_dashboard CHARACTER SET utf8mb4;`
2. Salin `.env.example` menjadi `.env`, set `APP_ENV=prod` dan isi `MYSQL_*`.
3. Jalankan backend. Tabel dibuat otomatis oleh SQLAlchemy saat app start.

Jika MySQL belum tersedia, aplikasi otomatis memakai SQLite (`iot_dev.db`)
sehingga tetap bisa dijalankan langsung.

## Endpoint API Utama

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| GET | `/api/health` | Status API + database |
| GET | `/api/sensors` | Nilai & tren semua sensor |
| GET | `/api/sensors/{id}/history` | Riwayat buffer sensor |
| GET/POST | `/api/outputs/{name}` | Baca/set output (LED, Relay, dsb.) |
| GET/POST | `/api/alerts` | Daftar / buat alert |
| GET/POST/PATCH/DELETE | `/api/experiments` | CRUD eksperimen |
| GET | `/api/logs` + `/api/logs/export` | Log & unduh CSV |
| POST | `/api/auth/login` | Login demo (`student` / `student123`) |

## Catatan Konsep Desain

- **90% warna netral** (putih, off-white, abu), **8% hijau lembut** (status aktif),
  **2% kuning/merah** (warning/danger) — hanya untuk info, bukan dekorasi.
- Semua kartu: `background #fff`, border `#E5E7EB`, radius 10–14px, bayangan halus.
- Icon garis (outline), monokrom; tanpa neon, gradient, atau warna rainbow.
- Data sensor di-simulasikan di `frontend/src/store.js` dan `backend/app/state.py`
  sehingga dashboard tetap hidup tanpa perangkat fisik.