<script setup>
import { ref, computed } from 'vue'
import { Camera, Maximize2, Video } from 'lucide-vue-next'
import { store } from '../store'

const cams = ['Kamera 1 - Ruang Lab', 'Kamera 2 - Koridor', 'Kamera 3 - Pintu Masuk']
const flash = ref(false)
const previewRef = ref(null)

const timeStr = computed(() =>
  new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(store.clock)
)

function capture() {
  flash.value = true
  store.toast('Snapshot berhasil diambil')
  setTimeout(() => (flash.value = false), 260)
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    previewRef.value?.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}
</script>

<template>
  <section class="card cam-card rise rise-2">
    <div class="card-head">
      <h3 class="card-title"><Video :size="16" /> Kamera</h3>
      <span class="chip chip-green"><span class="dot dot-green"></span> Online</span>
    </div>

    <div class="cam-body">
      <div ref="previewRef" class="preview">
        <!-- simulated CCTV scene -->
        <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" class="scene">
          <defs>
            <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#eef0f3" />
              <stop offset="100%" stop-color="#e2e5ea" />
            </linearGradient>
          </defs>
          <rect width="640" height="360" fill="url(#wall)" />
          <rect y="252" width="640" height="108" fill="#d8dbe0" />

          <!-- window -->
          <rect x="40" y="52" width="108" height="128" rx="4" fill="#dfe3e8" stroke="#c9cdd4" stroke-width="3" />
          <line x1="94" y1="52" x2="94" y2="180" stroke="#c9cdd4" stroke-width="2" />
          <line x1="40" y1="116" x2="148" y2="116" stroke="#c9cdd4" stroke-width="2" />
          <rect x="52" y="62" width="30" height="44" rx="2" fill="#c4cad2" opacity="0.8" />
          <rect x="106" y="62" width="30" height="44" rx="2" fill="#c4cad2" opacity="0.8" />

          <!-- door -->
          <rect x="536" y="120" width="70" height="132" rx="3" fill="#d3d6dc" stroke="#c2c6ce" stroke-width="3" />
          <circle cx="590" cy="188" r="4" fill="#aeb3bc" />

          <!-- shelf -->
          <rect x="180" y="70" width="120" height="70" rx="4" fill="#d6d9df" stroke="#c6cad1" stroke-width="2" />
          <rect x="186" y="78" width="34" height="26" rx="3" fill="#cbd0d7" />
          <rect x="226" y="78" width="26" height="26" rx="3" fill="#c1c7cf" />
          <rect x="186" y="110" width="40" height="20" rx="3" fill="#cbd0d7" />
          <rect x="232" y="110" width="30" height="20" rx="3" fill="#c1c7cf" />

          <!-- desk + monitor -->
          <rect x="300" y="214" width="200" height="10" rx="2" fill="#c6cbd2" />
          <rect x="316" y="224" width="14" height="28" fill="#c6cbd2" />
          <rect x="468" y="224" width="14" height="28" fill="#c6cbd2" />
          <rect x="352" y="144" width="92" height="62" rx="3" fill="#b9bfc8" />
          <rect x="358" y="150" width="80" height="50" rx="2" fill="#a7aeb9" />
          <rect x="352" y="206" width="92" height="8" rx="2" fill="#aeb4be" />
          <rect x="438" y="160" width="14" height="46" rx="2" fill="#9fb0a6" />

          <!-- plant -->
          <g transform="translate(232 250)">
            <rect x="0" y="8" width="34" height="20" rx="4" fill="#c6cbd2" />
            <path d="M17 8 C17 -4 10 -10 6 -18 C14 -14 21 -14 25 -6 C28 -12 34 -8 32 0 C30 4 24 8 17 8 Z" fill="#9fb0a6" />
          </g>

          <!-- person detected -->
          <g class="person">
            <rect class="det-box" x="352" y="96" width="96" height="196" rx="4" stroke="#2f9e6e" fill="rgba(47,158,110,0.08)" stroke-width="2.6" />
            <g transform="translate(400 272) scale(1.06)">
              <circle cx="0" cy="-74" r="20" fill="#8d949f" />
              <path d="M-30 -52 C-30 -66 -18 -72 0 -72 C18 -72 30 -66 30 -52 L33 -4 L-33 -4 Z" fill="#8d949f" />
              <path d="M-26 -4 L-34 24 M26 -4 L34 24" stroke="#8d949f" stroke-width="12" stroke-linecap="round" />
            </g>
            <text x="352" y="88" fill="#1b241f" font-size="15" font-weight="700" font-family="Inter, sans-serif">Person 96%</text>
          </g>
          <rect x="352" y="292" width="96" height="3" rx="2" fill="none" />
        </svg>

        <div class="ov ov-top">
          <span class="ov-cam">{{ store.camera.label }}</span>
          <span class="ov-res">{{ store.camera.resolution }} · 30 FPS</span>
        </div>
        <div class="ov ov-bottom">
          <span class="rec"><i></i>REC</span>
          <span class="ov-time mono">{{ timeStr }}</span>
          <span class="ov-id">ID: CAM-01</span>
        </div>

        <div class="scanline" aria-hidden="true"></div>
        <div v-if="flash" class="flash"></div>
      </div>

      <div class="cam-controls">
        <div class="cam-select">
          <label class="field">Sumber Kamera</label>
          <select v-model="store.camera.label" class="select">
            <option v-for="c in cams" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="cam-btns">
          <button class="btn btn-soft" title="Ambil Gambar" @click="capture">
            <Camera :size="15" /> Ambil
          </button>
          <button class="btn" title="Mode Layar Penuh" @click="toggleFullscreen">
            <Maximize2 :size="15" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cam-card { margin-bottom: 20px; }
.cam-body { padding: 14px 16px 16px; }
.preview {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background: #e2e5ea;
  aspect-ratio: 16 / 9;
  max-height: 300px;
  max-width: 560px;
  border: 1px solid var(--border);
}
.scene { width: 100%; height: 100%; display: block; }
.det-box { animation: breathe 3.2s ease-in-out infinite; transform-origin: center; }
@keyframes breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}

.ov { position: absolute; left: 0; right: 0; display: flex; align-items: center; gap: 10px; padding: 10px 12px; pointer-events: none; }
.ov-top { top: 0; justify-content: space-between; background: linear-gradient(180deg, rgba(20,24,30,0.32), transparent); color: #fff; font-size: 12px; }
.ov-cam { font-weight: 700; }
.ov-res { font-size: 11px; opacity: 0.85; }
.ov-bottom { bottom: 0; background: linear-gradient(0deg, rgba(20,24,30,0.38), transparent); color: #fff; font-size: 11.5px; }
.rec { display: inline-flex; align-items: center; gap: 6px; font-weight: 700; color: #ff6b6b; }
.rec i { width: 8px; height: 8px; border-radius: 50%; background: #ff6b6b; animation: blink 1.2s infinite; }
@keyframes blink { 50% { opacity: 0.25; } }
.ov-time { font-family: 'JetBrains Mono', monospace; margin-left: auto; }
.ov-id { opacity: 0.85; }

.scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.28);
  animation: scan 4.5s linear infinite;
  pointer-events: none;
}
@keyframes scan {
  0% { top: 4%; }
  50% { top: 96%; }
  100% { top: 4%; }
}

.flash {
  position: absolute;
  inset: 0;
  background: #fff;
  animation: fadeout 0.26s ease forwards;
  pointer-events: none;
}
@keyframes fadeout { to { opacity: 0; } }

.cam-controls {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-top: 14px;
}
.cam-select { flex: 1; min-width: 0; padding-bottom: 2px; }
.cam-btns { display: flex; gap: 8px; }
</style>