<script setup>
import { BrainCircuit, ScanSearch, ScanFace, Image, UploadCloud, ChevronRight, Check } from 'lucide-vue-next'
import { store } from '../store'

const models = [
  { name: 'Object Detection (YOLOv8)', desc: 'Deteksi objek, orang, kendaraan', icon: ScanSearch, slug: 'Object Detection (YOLOv8)' },
  { name: 'Face Recognition', desc: 'Identifikasi wajah', icon: ScanFace, slug: 'Face Recognition' },
  { name: 'Image Classification', desc: 'Klasifikasi gambar', icon: Image, slug: 'Image Classification' },
  { name: 'Custom Model', desc: 'Upload model sendiri', icon: UploadCloud, slug: 'Custom Model' }
]

function select(m) {
  store.activeModel = m.slug
  store.toast(`Model ${m.name} diaktifkan`)
}
</script>

<template>
  <section class="card vision-card rise rise-3">
    <div class="card-head">
      <h3 class="card-title"><BrainCircuit :size="16" /> AI Vision (Model)</h3>
      <span class="chip chip-green"><span class="dot dot-green"></span> Aktif: {{ store.activeModel.replace(' (YOLOv8)', '') }}</span>
    </div>
    <div class="v-list">
      <button
        v-for="m in models"
        :key="m.slug"
        class="v-item"
        :class="{ selected: store.activeModel === m.slug }"
        @click="select(m)"
      >
        <span class="v-ic"><component :is="m.icon" :size="17" stroke-width="1.8" /></span>
        <span class="v-main">
          <span class="v-name">{{ m.name }}</span>
          <span class="v-desc">{{ m.desc }}</span>
        </span>
        <span v-if="store.activeModel === m.slug" class="v-check"><Check :size="13" /></span>
        <ChevronRight v-else :size="16" class="v-chev" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.vision-card { margin-bottom: 0; }
.v-list { display: flex; flex-direction: column; padding: 6px 8px 8px; }
.v-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  text-align: left;
  transition: all 0.16s ease;
  width: 100%;
}
.v-item:hover { background: var(--surface-2); border-color: var(--border); }
.v-item.selected { background: var(--green-soft); border-color: var(--green-line); }
.v-ic {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
  flex: none;
}
.v-item.selected .v-ic { background: #fff; color: var(--green); }
.v-main { flex: 1; display: flex; flex-direction: column; }
.v-name { font-size: 13px; font-weight: 600; color: var(--text-2); }
.v-desc { font-size: 11.5px; color: var(--text-4); margin-top: 1px; }
.v-check {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: var(--green);
  color: #fff;
  display: grid;
  place-items: center;
  flex: none;
}
.v-chev { color: var(--text-4); flex: none; transition: transform 0.16s ease; }
.v-item:hover .v-chev { transform: translateX(3px); }
</style>