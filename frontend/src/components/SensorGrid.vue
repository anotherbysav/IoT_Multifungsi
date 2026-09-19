<script setup>
import { Thermometer, Droplets, Sun, Wind, Sprout, Gauge, Ruler, Activity, ArrowUp, ArrowDown } from 'lucide-vue-next'
import MiniChart from './MiniChart.vue'
import { store } from '../store'

const icons = {
  suhu: Thermometer,
  kelembapan: Droplets,
  cahaya: Sun,
  udara: Wind,
  tanah: Sprout,
  tekanan: Gauge,
  jarak: Ruler,
  getaran: Activity
}

function fmtValue(s) {
  if (s.id === 'getaran') return s.value.toFixed(2)
  if (['tekanan', 'cahaya', 'jarak'].includes(s.id)) return String(Math.round(s.value))
  return String(Math.round(s.value * 10) / 10)
}

function fmtChange(s) {
  const n = s.id === 'getaran' ? s.change.toFixed(2) : Math.round(s.change * 10) / 10
  return `${s.dir === 'up' ? '+' : '−'}${n}`
}
</script>

<template>
  <section class="sensor-grid">
    <div class="section-head">
      <h2>Data Sensor <span class="hint">(Real-time)</span></h2>
      <span class="chip chip-green"><span class="dot dot-green"></span> Live · 2 detik</span>
    </div>

    <div class="grid">
      <div v-for="(s, i) in store.sensors" :key="s.id" class="s-card card" :class="`rise rise-${i % 4}`">
        <div class="s-top">
          <span class="s-ic"><component :is="icons[s.id]" :size="17" stroke-width="1.9" /></span>
          <span class="s-name">{{ s.label }}</span>
        </div>
        <div class="s-main">
          <div class="s-left">
            <div class="s-val">
              {{ fmtValue(s) }}<span class="s-unit"> {{ s.unit }}</span>
            </div>
            <div class="s-delta" :class="s.dir">
              <component :is="s.dir === 'up' ? ArrowUp : ArrowDown" :size="12" />
              {{ fmtChange(s) }} {{ s.unit }}
            </div>
          </div>
          <div class="s-chart">
            <MiniChart :data="s.history" color="#2f9e6e" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sensor-grid { margin-bottom: 20px; }
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.section-head h2 { font-size: 15.5px; font-weight: 700; letter-spacing: -0.01em; }
.section-head .hint { color: var(--text-4); font-weight: 500; font-size: 13px; }

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.s-card {
  padding: 14px 15px;
  transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.s-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  border-color: var(--border-strong);
}

.s-top { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.s-ic {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
  flex: none;
}
.s-name { font-size: 12px; font-weight: 600; color: var(--text-3); }

.s-main { display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
.s-val { font-size: 21px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.s-unit { font-size: 12px; font-weight: 600; color: var(--text-4); }
.s-delta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-top: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--text-3);
}
.s-delta.up { color: var(--green-600); }
.s-delta.down { color: var(--text-4); }

.s-chart { width: 66px; height: 34px; flex: none; }

@media (max-width: 1180px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 860px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) {
  .grid { grid-template-columns: 1fr; }
}
</style>