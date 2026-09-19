<script setup>
import { RefreshCw, Activity, Wifi, Signal, Clock3, Cpu, Pin } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import MiniChart from '../components/MiniChart.vue'
import { store } from '../store'

const weeklyLogs = () => store.logs.filter((l) => l.source === 'ESP32' || l.source === 'CV').slice(0, 7)
</script>

<template>
  <div>
    <PageHeader title="IoT (Sensors)" subtitle="Pemantauan sensor secara real-time">
      <template #actions>
        <button class="btn" @click="store.toast('Data sensor diperbarui')">
          <RefreshCw :size="15" /> Refresh
        </button>
      </template>
    </PageHeader>

    <div class="dev card rise rise-1">
      <div class="dev-cell">
        <span class="chip chip-green"><span class="dot dot-green"></span> Online</span>
      </div>
      <div class="dev-cell">
        <span class="dc-ic"><Wifi :size="15" /></span>
        <span>IP <strong class="mono">{{ store.device.ip }}</strong></span>
      </div>
      <div class="dev-cell">
        <span class="dc-ic"><Cpu :size="15" /></span>
        <span>Firmware <strong class="mono">{{ store.device.firmware }}</strong></span>
      </div>
      <div class="dev-cell">
        <span class="dc-ic"><Signal :size="15" /></span>
        <span>WiFi <strong>{{ store.device.wifi }} dBm</strong></span>
      </div>
      <div class="dev-cell">
        <span class="dc-ic"><Clock3 :size="15" /></span>
        <span>Uptime <strong class="mono">{{ store.device.uptime }}</strong></span>
      </div>
    </div>

    <div class="grid rise rise-2">
      <div v-for="s in store.sensors" :key="s.id" class="card s-card">
        <div class="s-top">
          <span class="s-ic"><Activity :size="17" /></span>
          <div class="s-head">
            <span class="s-name">{{ s.label }}</span>
            <span class="s-meta">{{ s.type }} · {{ s.pin }}</span>
          </div>
          <span class="s-val">{{ s.value }}<small>{{ s.unit }}</small></span>
        </div>
        <div class="chart">
          <MiniChart :data="s.history" color="#2f9e6e" :width="220" :height="56" />
        </div>
      </div>
    </div>

    <div class="card table-card rise rise-3">
      <div class="card-head">
        <h3 class="card-title"><Activity :size="16" /> Riwayat Pembacaan Terakhir</h3>
        <span class="chip chip-gray">7 entri</span>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Sumber</th>
            <th>Pesan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in weeklyLogs()" :key="l.id">
            <td class="mono">{{ l.time }}</td>
            <td>{{ l.source }}</td>
            <td>{{ l.message }}</td>
            <td>
              <span class="chip" :class="{ info: 'chip-green', warning: 'chip-amber', error: 'chip-red' }[l.level] || 'chip-gray'">
                {{ l.level }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dev {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 26px;
  align-items: center;
  padding: 14px 18px;
  margin-bottom: 18px;
}
.dev-cell { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-3); }
.dev-cell strong { color: var(--text-2); font-weight: 600; }
.dc-ic {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.s-card { padding: 14px 15px; transition: box-shadow 0.2s ease, transform 0.2s ease; }
.s-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.s-top { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
.s-ic {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
}
.s-head { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.s-name { font-size: 12.5px; font-weight: 700; }
.s-meta { font-size: 10.5px; color: var(--text-4); }
.s-val { font-size: 17px; font-weight: 800; color: var(--green-600); white-space: nowrap; }
.s-val small { font-size: 10.5px; color: var(--text-4); margin-left: 2px; }
.chart { height: 56px; }

@media (max-width: 1180px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 860px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
</style>