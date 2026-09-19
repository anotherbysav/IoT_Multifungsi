<script setup>
import { ref, watch } from 'vue'
import { BarChart3, Thermometer, Sun } from 'lucide-vue-next'
import LineChart from './LineChart.vue'
import { store } from '../store'

const periods = [
  { key: '1h', label: '1 Jam' },
  { key: '7d', label: '7 Hari' },
  { key: '30d', label: '30 Hari' }
]

const G = { temp: '#2f9e6e', hum: '#70798c', lux: '#c98a2e' }

function series(len, base, amp, cycles, noise) {
  const arr = []
  for (let i = 0; i < len; i++) {
    const t = i / len
    const wave = Math.sin(t * Math.PI * 2 * cycles) * amp
    const nz = (Math.random() - 0.5) * noise
    arr.push(Number((base + wave + nz).toFixed(1)))
  }
  return arr
}

function build(period) {
  if (period === '1h') {
    const n = 60
    const labels = []
    const now = new Date()
    for (let i = 0; i < n; i++) {
      const d = new Date(now.getTime() - (n - 1 - i) * 60000)
      labels.push(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
    }
    return {
      labels,
      temp: series(n, 28.6, 1.4, 2, 0.5),
      hum: series(n, 72, 3, 2, 1.2),
      lux: series(n, 430, 90, 2, 20)
    }
  }
  if (period === '7d') {
    const n = 7 * 24
    const labels = []
    const now = new Date()
    for (let i = 0; i < n; i++) {
      const d = new Date(now.getTime() - (n - 1 - i) * 3600000)
      labels.push(`${String(d.getDate()).padStart(2, '0')}/` + `${String(d.getMonth() + 1).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}00`)
    }
    return {
      labels,
      temp: series(n, 28.2, 2.6, 7, 0.6),
      hum: series(n, 74, 5, 7, 1.5),
      lux: series(n, 420, 150, 7, 25)
    }
  }
  const n = 30
  const labels = []
  const now = new Date()
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getTime() - (n - 1 - i) * 86400000)
    labels.push(`${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return {
    labels,
    temp: series(n, 27.8, 3, 2, 0.8),
    hum: series(n, 75, 6, 2, 2),
    lux: series(n, 400, 180, 2, 30)
  }
}

const data = ref(build(store.period))
watch(() => store.period, (p) => { data.value = build(p) })
</script>

<template>
  <section class="card chart-card rise rise-3">
    <div class="card-head">
      <h3 class="card-title"><BarChart3 :size="16" /> Grafik Data</h3>
      <div class="seg">
        <button
          v-for="p in periods"
          :key="p.key"
          class="seg-btn"
          :class="{ active: store.period === p.key }"
          @click="store.period = p.key"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <div class="charts">
      <div class="chart-box">
        <div class="chart-title">
          <span class="ct-ic"><Thermometer :size="15" /></span>
          <strong>Suhu & Kelembapan</strong>
          <span class="legend">
            <span class="lg"><i style="background: #2f9e6e"></i>Suhu (°C)</span>
            <span class="lg"><i style="background: #70798c"></i>Kelembapan (%)</span>
          </span>
        </div>
        <LineChart
          :series="[
            { name: 'Suhu', color: G.temp, data: data.temp },
            { name: 'Kelembapan', color: G.hum, data: data.hum }
          ]"
          :labels="data.labels"
          :height="238"
          y-suffix=""
        />
      </div>

      <div class="chart-box">
        <div class="chart-title">
          <span class="ct-ic"><Sun :size="15" /></span>
          <strong>Intensitas Cahaya</strong>
          <span class="legend">
            <span class="lg"><i style="background: #c98a2e"></i>Lux</span>
          </span>
        </div>
        <LineChart
          :series="[{ name: 'Lux', color: G.lux, data: data.lux }]"
          :labels="data.labels"
          :height="238"
          y-suffix=""
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart-card { margin-bottom: 20px; }

.seg {
  display: flex;
  background: var(--surface-3);
  border-radius: 9px;
  padding: 3px;
  gap: 2px;
}
.seg-btn {
  border: none;
  background: transparent;
  color: var(--text-3);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 7px;
  transition: all 0.18s ease;
}
.seg-btn:hover { color: var(--text-2); }
.seg-btn.active {
  background: #fff;
  color: var(--green-600);
  box-shadow: var(--shadow);
}

.charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
.chart-box { padding: 16px 18px 14px; min-width: 0; }
.chart-box:first-child { border-right: 1px solid var(--border); }
.chart-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-2);
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.ct-ic {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
}
.legend {
  margin-left: auto;
  display: flex;
  gap: 12px;
}
.lg { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text-3); }
.lg i { width: 9px; height: 9px; border-radius: 3px; display: inline-block; }

@media (max-width: 1120px) {
  .charts { grid-template-columns: 1fr; }
  .chart-box:first-child { border-right: none; border-bottom: 1px solid var(--border); }
}
</style>