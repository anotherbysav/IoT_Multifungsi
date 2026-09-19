<script setup>
import { ref } from 'vue'
import { ScanEye, Settings2, Video, Timer, Crosshair } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import CameraCard from '../components/CameraCard.vue'
import AiVisionCard from '../components/AiVisionCard.vue'
import { store } from '../store'

const threshold = ref(70)
const autoAlert = ref(true)
const mode = ref('Normal')
const histories = ref([
  { label: 'Person', conf: 96, time: '14:28:12', cls: 'green' },
  { label: 'Person', conf: 88, time: '14:24:40', cls: 'green' },
  { label: 'Unknown', conf: 61, time: '14:12:03', cls: 'amber' },
  { label: 'Person', conf: 93, time: '13:58:21', cls: 'green' }
])

const models = ['Object Detection (YOLOv8)', 'Face Recognition', 'Image Classification', 'Custom Model']

function capture() {
  const conf = Math.round(80 + Math.random() * 18)
  histories.value.unshift({
    label: conf > 72 ? 'Person' : 'Unknown',
    conf,
    time: new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date()),
    cls: conf > 72 ? 'green' : 'amber'
  })
  store.detection.confidence = conf
  store.toast('Deteksi baru ditambahkan', 'success')
}
</script>

<template>
  <div>
    <PageHeader title="Computer Vision (AI)" subtitle="Deteksi objek real-time menggunakan YOLOv8" />

    <div class="layout">
      <div class="col-main">
        <CameraCard />

        <div class="card hist-card rise rise-2">
          <div class="card-head">
            <h3 class="card-title"><Timer :size="16" /> Riwayat Deteksi</h3>
            <button class="btn btn-sm" @click="capture">
              <Crosshair :size="13" /> Tangkap Deteksi
            </button>
          </div>
          <div class="hist-list">
            <div v-for="(h, i) in histories" :key="i" class="hist-item" :class="h.cls">
              <span class="h-ball" :class="h.cls"></span>
              <span class="h-label">{{ h.label }}</span>
              <span class="h-conf">{{ h.conf }}%</span>
              <span class="h-time mono">{{ h.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <aside class="col-side">
        <AiVisionCard />

        <div class="card set-card rise rise-2">
          <div class="card-head">
            <h3 class="card-title"><Settings2 :size="16" /> Pengaturan Deteksi</h3>
          </div>
          <div class="set-body">
            <label class="field">Model</label>
            <select v-model="store.activeModel" class="select">
              <option v-for="m in models" :key="m" :value="m">{{ m }}</option>
            </select>

            <label class="field" style="margin-top: 14px">Confidence Threshold — <strong>{{ threshold }}%</strong></label>
            <input v-model.number="threshold" type="range" min="40" max="99" class="range"
              :style="{ '--fill': threshold + '%' }" />

            <label class="field" style="margin-top: 14px">Mode Kamera</label>
            <div class="mode-row">
              <button
                v-for="m in ['Normal', 'Keamanan']"
                :key="m"
                class="mode-btn"
                :class="{ active: mode === m }"
                @click="mode = m"
              >
                {{ m }}
              </button>
            </div>

            <div class="toggle-row" @click="autoAlert = !autoAlert">
              <span>Notifikasi otomatis saat anomali</span>
              <button class="switch" :class="{ on: autoAlert }"><span class="knob"></span></button>
            </div>
          </div>
        </div>

        <div class="card info-card rise rise-3">
          <div class="card-head">
            <h3 class="card-title"><Video :size="16" /> Info Model</h3>
          </div>
          <div class="info-body">
            <div class="info-row"><span>Framework</span><strong class="mono">YOLOv8n</strong></div>
            <div class="info-row"><span>Input</span><strong class="mono">640×640</strong></div>
            <div class="info-row"><span>FPS inferensi</span><strong>~24</strong></div>
            <div class="info-row"><span>Kelas terdeteksi</span><strong>Person, Box, Botol</strong></div>
            <div class="info-row"><span>Status</span><span class="chip chip-green">Siap</span></div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 336px; gap: 20px; align-items: start; }
.col-side { position: sticky; top: calc(var(--header-h) + 20px); }
@media (max-width: 1240px) {
  .layout { grid-template-columns: 1fr; }
  .col-side { position: static; }
}

.hist-card { margin-bottom: 20px; }
.hist-list { padding: 6px 8px; }
.hist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  margin: 2px 4px;
  transition: background 0.15s ease;
}
.hist-item:hover { background: var(--surface-2); }
.h-ball { width: 9px; height: 9px; border-radius: 50%; flex: none; }
.h-ball.green { background: var(--green); }
.h-ball.amber { background: var(--amber-500); }
.h-label { font-size: 13px; font-weight: 600; }
.h-conf { font-size: 12px; color: var(--text-3); }
.h-time { margin-left: auto; font-size: 11.5px; color: var(--text-4); }

.set-card, .info-card { margin-bottom: 16px; }
.set-body { padding: 16px 18px; }
.range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  margin-top: 10px;
  background: linear-gradient(to right, var(--green) 0%, var(--green) var(--fill), var(--surface-4) var(--fill));
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--green);
  cursor: pointer;
}
.mode-row { display: flex; gap: 8px; }
.mode-btn {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-3);
  font-size: 12.5px;
  font-weight: 600;
  transition: all 0.16s ease;
}
.mode-btn.active {
  background: var(--green-soft);
  border-color: var(--green);
  color: var(--green-600);
}
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 12.5px;
  color: var(--text-2);
  cursor: pointer;
}

.info-body { padding: 10px 18px 14px; }
.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--surface-3);
  font-size: 12.5px;
  color: var(--text-3);
}
.info-row:last-child { border-bottom: none; }
.info-row strong { color: var(--text-2); font-weight: 600; }
</style>