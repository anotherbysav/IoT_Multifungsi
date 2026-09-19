<script setup>
import { useRouter } from 'vue-router'
import { ScanEye, FolderArchive, Image, Activity } from 'lucide-vue-next'
import { store } from '../store'

const router = useRouter()
</script>

<template>
  <section class="card sum-card">
    <div class="card-head">
      <h3 class="card-title"><Activity :size="16" /> Ringkasan Deteksi</h3>
      <span class="chip chip-green"><span class="dot dot-green"></span> Hari Ini</span>
    </div>

    <div class="sum-body">
      <div class="stats">
        <div class="st">
          <strong>27</strong>
          <span>Objek terdeteksi</span>
        </div>
        <div class="st">
          <strong>14</strong>
          <span>Snapshot</span>
        </div>
        <div class="st">
          <strong>{{ store.detection.confidence }}%</strong>
          <span>Confidence terakhir</span>
        </div>
      </div>

      <div class="rows">
        <div class="row">
          <span class="r-ic"><FolderArchive :size="14" /></span>
          <span>Model aktif</span>
          <strong class="chip chip-gray">{{ store.activeModel.replace(' (YOLOv8)', '') }}</strong>
        </div>
        <div class="row">
          <span class="r-ic"><Image :size="14" /></span>
          <span>Kamera</span>
          <strong class="chip chip-gray">{{ store.camera.label }}</strong>
        </div>
      </div>

      <button class="btn btn-soft full" @click="router.push('/vision')">
        <ScanEye :size="15" /> Buka Halaman Vision
      </button>
    </div>
  </section>
</template>

<style scoped>
.sum-card { height: 100%; display: flex; flex-direction: column; }
.sum-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 14px; flex: 1; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.st {
  display: flex;
  flex-direction: column;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 10px;
  text-align: center;
}
.st strong { font-size: 19px; font-weight: 800; color: var(--green-600); letter-spacing: -0.02em; }
.st span { font-size: 10.5px; color: var(--text-4); margin-top: 3px; line-height: 1.3; }

.rows { display: flex; flex-direction: column; gap: 6px; }
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-3);
  padding: 8px 10px;
  border-radius: 9px;
  background: var(--surface-2);
  border: 1px solid var(--border);
}
.r-ic { color: var(--text-4); display: grid; place-items: center; }
.row .chip { margin-left: auto; }

.full { width: 100%; }
</style>