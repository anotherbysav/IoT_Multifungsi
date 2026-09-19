<script setup>
import { ref, computed } from 'vue'
import { Database, Download, Search, FileText, AlertTriangle, AlertCircle } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import { store } from '../store'

const tab = ref('Semua')
const q = ref('')
const tabs = ['Semua', 'info', 'warning', 'error']

const filtered = computed(() =>
  store.logs.filter((l) => {
    if (tab.value !== 'Semua' && l.level !== tab.value) return false
    if (q.value && !`${l.message} ${l.source}`.toLowerCase().includes(q.value.toLowerCase())) return false
    return true
  })
)

const counts = computed(() => ({
  all: store.logs.length,
  warning: store.logs.filter((l) => l.level === 'warning').length,
  error: store.logs.filter((l) => l.level === 'error').length
}))

function chipFor(level) {
  return { info: 'chip-green', warning: 'chip-amber', error: 'chip-red' }[level] || 'chip-gray'
}

function exportCsv() {
  const head = 'Waktu,Sumber,Tingkat,Pesan'
  const rows = filtered.value.map((l) => `${l.time},${l.source},${l.level},"${l.message}"`)
  const blob = new Blob([`\uFEFF${head}\n${rows.join('\n')}`], { type: 'text/csv;charset=utf-8;' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `data-logs-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
  store.toast('Log diekspor sebagai CSV')
}
</script>

<template>
  <div>
    <PageHeader title="Data & Logs" subtitle="Riwayat data sensor, peristiwa, dan peringatan" />

    <div class="cards rise rise-1">
      <div class="card mini-stat">
        <span class="ms-ic"><Database :size="17" /></span>
        <div><strong>{{ counts.all }}</strong><span>Total Log</span></div>
      </div>
      <div class="card mini-stat">
        <span class="ms-ic amber"><AlertTriangle :size="17" /></span>
        <div><strong>{{ counts.warning }}</strong><span>Warning</span></div>
      </div>
      <div class="card mini-stat">
        <span class="ms-ic red"><AlertCircle :size="17" /></span>
        <div><strong>{{ counts.error }}</strong><span>Error</span></div>
      </div>
    </div>

    <div class="card table-card rise rise-2">
      <div class="card-head">
        <h3 class="card-title"><FileText :size="16" /> Riwayat Log</h3>
        <div class="toolbar">
          <div class="tabs">
            <button v-for="t in tabs" :key="t" class="tab" :class="{ active: tab === t }" @click="tab = t">
              {{ t === 'Semua' ? 'Semua' : t.charAt(0).toUpperCase() + t.slice(1) }}
            </button>
          </div>
          <div class="search">
            <Search :size="14" />
            <input v-model="q" type="text" placeholder="Cari log..." class="input" />
          </div>
          <button class="btn btn-sm btn-soft" @click="exportCsv">
            <Download :size="13" /> Export CSV
          </button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Waktu</th>
            <th>Sumber</th>
            <th>Tingkat</th>
            <th>Pesan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in filtered" :key="l.id">
            <td class="mono">{{ l.id }}</td>
            <td class="mono">{{ l.time }}</td>
            <td>{{ l.source }}</td>
            <td><span class="chip" :class="chipFor(l.level)">{{ l.level }}</span></td>
            <td>{{ l.message }}</td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="5" class="empty">Tidak ada log yang cocok.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}
.mini-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
}
.ms-ic {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
}
.ms-ic.amber { background: var(--amber-soft); color: var(--amber); }
.ms-ic.red { background: var(--red-soft); color: var(--red); }
.mini-stat div { display: flex; flex-direction: column; }
.mini-stat strong { font-size: 20px; font-weight: 800; line-height: 1.1; }
.mini-stat span { font-size: 11.5px; color: var(--text-3); }

.toolbar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.tabs { display: flex; background: var(--surface-3); border-radius: 8px; padding: 3px; gap: 2px; }
.tab {
  border: none;
  background: transparent;
  color: var(--text-3);
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}
.tab.active { background: #fff; color: var(--green-600); box-shadow: var(--shadow); }
.search { position: relative; }
.search svg { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: var(--text-4); }
.search .input { padding-left: 30px; width: 190px; }
.empty { text-align: center; color: var(--text-4); padding: 26px 0; }

@media (max-width: 760px) {
  .cards { grid-template-columns: 1fr; }
}
</style>