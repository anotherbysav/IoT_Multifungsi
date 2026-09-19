<script setup>
import { ref } from 'vue'
import { Workflow, Plus, Trash2, Power, BellRing, Gauge } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import OutputControlCard from '../components/OutputControlCard.vue'
import { store } from '../store'

const showForm = ref(false)
const form = ref({ condition: 'Suhu', operator: '>', threshold: 30, action: 'Nyalakan', target: 'Kipas' })

const conditions = store.sensors.map((s) => s.label).filter((l) => !['Jarak (Ultrasonik)', 'Getaran'].includes(l))
const operators = [
  { v: '>', l: '> (lebih dari)' },
  { v: '<', l: '< (kurang dari)' },
  { v: 'detected', l: 'terdeteksi' }
]
const targets = Object.entries(store.outputs).map(([k, o]) => o.label)

function ruleText(r) {
  const cond = r.operator === 'detected' ? `${r.condition} terdeteksi` : `${r.condition} ${r.operator} ${r.threshold}`
  return `Jika ${cond}, maka ${r.action.toLowerCase()} ${r.target}`
}

function addRule() {
  const f = form.value
  if (f.operator === 'detected') f.threshold = 0
  store.rules.push({ id: Date.now(), ...f, on: true })
  store.toast('Aturan otomasi ditambahkan')
  showForm.value = false
}

function removeRule(id) {
  store.rules = store.rules.filter((r) => r.id !== id)
  store.toast('Aturan dihapus', 'warning')
}

function setRule(id, on) {
  const r = store.rules.find((x) => x.id === id)
  if (r) {
    r.on = on
    store.toast(`Aturan ${on ? 'diaktifkan' : 'dinonaktifkan'}`)
  }
}

function toggleAll(on) {
  for (const k in store.outputs) store.outputs[k].on = on
  store.toast(on ? 'Semua output diaktifkan' : 'Semua output dimatikan', 'warning')
}
</script>

<template>
  <div>
    <PageHeader title="Automation (Output)" subtitle="Kontrol aktuator dan aturan otomatisasi" />

    <div class="layout">
      <div class="col-main">
        <OutputControlCard />

        <div class="card rule-card rise rise-2">
          <div class="card-head">
            <h3 class="card-title"><Workflow :size="16" /> Automation Rules <span class="count">(Rule & Relay)</span></h3>
            <button class="btn btn-sm btn-soft" @click="showForm = !showForm">
              <Plus :size="13" /> Tambah Rule
            </button>
          </div>

          <div v-if="showForm" class="rule-form">
            <div class="rf-grid">
              <div>
                <label class="field">Kondisi Sensor</label>
                <select v-model="form.condition" class="select">
                  <option v-for="c in conditions" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div>
                <label class="field">Operator</label>
                <select v-model="form.operator" class="select">
                  <option v-for="o in operators" :key="o.v" :value="o.v">{{ o.l }}</option>
                </select>
              </div>
              <div v-if="form.operator !== 'detected'">
                <label class="field">Ambang Batas</label>
                <input v-model.number="form.threshold" type="number" class="input" />
              </div>
              <div>
                <label class="field">Aksi</label>
                <select v-model="form.action" class="select">
                  <option>Nyalakan</option>
                  <option>Matikan</option>
                </select>
              </div>
              <div>
                <label class="field">Target Output</label>
                <select v-model="form.target" class="select">
                  <option v-for="t in targets" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
            </div>
            <div class="rf-action">
              <button class="btn btn-primary btn-sm" @click="addRule"><Plus :size="13" /> Simpan Aturan</button>
              <button class="btn btn-sm" @click="showForm = false">Batal</button>
            </div>
          </div>

          <div class="rule-list">
            <div v-for="r in store.rules" :key="r.id" class="rule-item" :class="{ off: !r.on }">
              <span class="r-num">{{ String(r.id).slice(-3) }}</span>
              <div class="r-main">
                <span class="r-text">{{ ruleText(r) }}</span>
                <span class="r-badge" :class="r.on ? 'on' : ''">
                  <span class="dot" :class="r.on ? 'dot-green' : 'dot-gray'"></span>
                  {{ r.on ? 'Aktif' : 'Nonaktif' }}
                </span>
              </div>
              <button class="btn-icon btn" @click="setRule(r.id, !r.on)">
                <Power :size="15" />
              </button>
              <button class="btn-icon btn" @click="removeRule(r.id)">
                <Trash2 :size="15" />
              </button>
            </div>
            <p v-if="!store.rules.length" class="empty">Belum ada aturan. Tambahkan rule pertama Anda.</p>
          </div>
        </div>
      </div>

      <aside class="col-side">
        <div class="card rise rise-1">
          <div class="card-head">
            <h3 class="card-title"><Gauge :size="16" /> Status Otomasi</h3>
          </div>
          <div class="auto-body">
            <div class="stat">
              <span class="stat-val">{{ store.rules.filter((r) => r.on).length }}<small>/{{ store.rules.length }}</small></span>
              <span class="stat-lab">Aturan aktif</span>
            </div>
            <div class="stat">
              <span class="stat-val">{{ Object.values(store.outputs).filter((o) => o.on).length }}<small>/8</small></span>
              <span class="stat-lab">Output menyala</span>
            </div>
            <div class="stat-row">
              <BellRing :size="14" />
              <span>Terakhir dipicu: <strong>Relay 1 (13:18)</strong></span>
            </div>
            <button class="btn btn-soft" @click="toggleAll(true)" style="width: 100%">
              <Power :size="14" /> Aktifkan Semua
            </button>
            <button class="btn btn-danger" @click="toggleAll(false)" style="width: 100%; margin-top: 8px">
              <Power :size="14" /> Matikan Semua
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 20px; align-items: start; }
.col-side { position: sticky; top: calc(var(--header-h) + 20px); }
@media (max-width: 1240px) {
  .layout { grid-template-columns: 1fr; }
  .col-side { position: static; }
}

.count { font-size: 12px; color: var(--text-4); font-weight: 500; }
.rule-card { margin-bottom: 20px; }
.rule-form {
  margin: 14px 16px;
  padding: 14px;
  background: var(--surface-2);
  border: 1px dashed var(--border-strong);
  border-radius: 10px;
}
.rf-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.rf-action { display: flex; gap: 8px; margin-top: 14px; }

.rule-list { padding: 6px 8px 8px; }
.rule-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border-radius: 9px;
  margin: 2px 4px;
  transition: background 0.15s ease;
}
.rule-item:hover { background: var(--surface-2); }
.rule-item.off { opacity: 0.62; }
.r-num {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--surface-3);
  color: var(--text-3);
  font-size: 11px;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex: none;
  font-family: 'JetBrains Mono', monospace;
}
.r-main { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.r-text { font-size: 13px; color: var(--text-2); }
.r-badge { font-size: 10.5px; display: inline-flex; align-items: center; gap: 5px; color: var(--text-4); font-weight: 600; }
.r-badge.on { color: var(--green-600); }
.empty { padding: 18px; text-align: center; color: var(--text-4); font-size: 12.5px; }

.auto-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; }
.stat {
  display: flex;
  flex-direction: column;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px 14px;
}
.stat-val { font-size: 22px; font-weight: 800; color: var(--text); }
.stat-val small { font-size: 12px; color: var(--text-4); font-weight: 600; }
.stat-lab { font-size: 11.5px; color: var(--text-3); }
.stat-row {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: var(--text-3);
  padding: 10px 2px;
}
.stat-row svg { color: var(--amber-500); flex: none; }
.stat-row strong { color: var(--text-2); }
</style>