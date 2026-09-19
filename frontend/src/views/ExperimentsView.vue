<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { FlaskConical, Play, Pause, Square, Trash2, Plus, X, Clock3, Gauge } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import { store } from '../store'

const modal = ref(false)
const form = ref({ name: '', sensor: store.sensors[0].label, output: 'Kipas' })

const statusChip = {
  running: 'chip-green',
  paused: 'chip-amber',
  completed: 'chip-gray',
  idle: 'chip-gray'
}
const statusLabel = {
  running: 'Berjalan',
  paused: 'Dijeda',
  completed: 'Selesai',
  idle: 'Siap'
}

function startTimer() {
  return setInterval(() => {
    for (const e of store.experiments) {
      if (e.status === 'running' && e.progress < 100) {
        e.progress += 1
        if (e.progress >= 100) {
          e.status = 'completed'
          store.addLog({ level: 'info', source: 'System', message: `Eksperimen "${e.name}" selesai` })
        }
      }
    }
  }, 2500)
}
let timer
onMounted(() => (timer = startTimer()))
onBeforeUnmount(() => clearInterval(timer))

function setStatus(id, status) {
  const e = store.experiments.find((x) => x.id === id)
  if (!e) return
  e.status = status
  if (status === 'running') store.toast(`Eksperimen ${e.name} dilanjutkan`)
  if (status === 'paused') store.toast(`Eksperimen ${e.name} dijeda`, 'warning')
  if (status === 'completed') {
    e.progress = 100
    store.toast(`Eksperimen ${e.name} selesai`, 'success')
  }
}

function remove(id) {
  store.experiments = store.experiments.filter((x) => x.id !== id)
  store.toast('Eksperimen dihapus', 'warning')
}

function create() {
  if (!form.value.name.trim()) {
    store.toast('Nama eksperimen wajib diisi', 'error')
    return
  }
  store.experiments.unshift({
    id: Date.now(),
    name: form.value.name,
    status: 'idle',
    progress: 0,
    duration: '—',
    sensor: form.value.sensor,
    output: form.value.output,
    created: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  })
  store.addLog({ level: 'info', source: 'User', message: `Eksperimen "${form.value.name}" dibuat` })
  store.toast('Eksperimen baru dibuat')
  modal.value = false
  form.value.name = ''
}
</script>

<template>
  <div>
    <PageHeader title="Experiments" subtitle="Jalankan dan pantau eksperimen IoT">
      <template #actions>
        <button class="btn btn-primary" @click="modal = true">
          <Plus :size="15" /> Buat Eksperimen
        </button>
      </template>
    </PageHeader>

    <div class="eg-grid">
      <article v-for="(e, i) in store.experiments" :key="e.id" class="card eg-card rise" :class="`rise-${i % 4}`">
        <div class="eg-head">
          <span class="eg-ic"><FlaskConical :size="18" /></span>
          <div class="eg-title">
            <h3>{{ e.name }}</h3>
            <span>{{ e.created }}</span>
          </div>
          <span class="chip" :class="statusChip[e.status]">
            <span class="dot" :class="e.status === 'running' ? 'dot-green' : e.status === 'paused' ? 'dot-amber' : 'dot-gray'"></span>
            {{ statusLabel[e.status] }}
          </span>
        </div>

        <div class="eg-meta">
          <span><Gauge :size="13" /> Sensor: <strong>{{ e.sensor }}</strong></span>
          <span><FlaskConical :size="13" /> Output: <strong>{{ e.output }}</strong></span>
        </div>

        <div class="eg-prog">
          <div class="eg-bar"><div class="eg-fill" :style="{ width: e.progress + '%' }"></div></div>
          <span class="eg-pct">{{ e.progress }}%</span>
        </div>
        <div class="eg-dur"><Clock3 :size="12" /> Durasi: <strong>{{ e.duration }}</strong></div>

        <div class="eg-actions">
          <button v-if="e.status === 'idle' || e.status === 'completed'" class="btn btn-soft btn-sm" @click="setStatus(e.id, 'running')">
            <Play :size="13" /> Mulai
          </button>
          <button v-if="e.status === 'running'" class="btn btn-sm" @click="setStatus(e.id, 'paused')">
            <Pause :size="13" /> Jeda
          </button>
          <button v-if="e.status === 'paused'" class="btn btn-soft btn-sm" @click="setStatus(e.id, 'running')">
            <Play :size="13" /> Lanjut
          </button>
          <button v-if="e.status === 'running' || e.status === 'paused'" class="btn btn-danger btn-sm" @click="setStatus(e.id, 'completed')">
            <Square :size="13" /> Stop
          </button>
          <button class="btn-icon btn" @click="remove(e.id)">
            <Trash2 :size="14" />
          </button>
        </div>
      </article>
    </div>

    <transition name="fade">
      <div v-if="modal" class="modal-scrim" @click.self="modal = false">
        <div class="modal">
          <div class="modal-head">
            <h3>Buat Eksperimen Baru</h3>
            <button class="btn-icon btn" @click="modal = false"><X :size="16" /></button>
          </div>
          <div class="modal-body">
            <label class="field">Nama Eksperimen</label>
            <input v-model="form.name" type="text" class="input" placeholder="cth: Monitoring Suhu Kamar" @keyup.enter="create" />
            <label class="field" style="margin-top: 14px">Sensor yang Dipantau</label>
            <select v-model="form.sensor" class="select">
              <option v-for="s in store.sensors" :key="s.id" :value="s.label">{{ s.label }}</option>
            </select>
            <label class="field" style="margin-top: 14px">Output yang Digunakan</label>
            <select v-model="form.output" class="select">
              <option v-for="(o, k) in store.outputs" :key="k" :value="o.label">{{ o.label }}</option>
            </select>
          </div>
          <div class="modal-foot">
            <button class="btn" @click="modal = false">Batal</button>
            <button class="btn btn-primary" @click="create"><Plus :size="15" /> Buat</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.eg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.eg-card {
  padding: 16px 18px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.eg-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.eg-head { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
.eg-ic {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
}
.eg-title { flex: 1; min-width: 0; }
.eg-title h3 { font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }
.eg-title span { font-size: 11px; color: var(--text-4); }

.eg-meta { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-3); margin-bottom: 14px; }
.eg-meta span { display: inline-flex; align-items: center; gap: 6px; }
.eg-meta svg { color: var(--text-4); }
.eg-meta strong { color: var(--text-2); }

.eg-prog { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.eg-bar { flex: 1; height: 6px; border-radius: 99px; background: var(--surface-4); overflow: hidden; }
.eg-fill { height: 100%; border-radius: 99px; background: var(--green); transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.eg-pct { font-size: 11.5px; font-weight: 700; color: var(--text-3); font-family: 'JetBrains Mono', monospace; }
.eg-dur { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--text-4); margin-bottom: 14px; }
.eg-dur strong { color: var(--text-3); }

.eg-actions { display: flex; gap: 8px; align-items: center; }
.eg-actions .btn-icon { margin-left: auto; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-active .modal, .fade-leave-active .modal { transition: transform 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-from .modal, .fade-leave-to .modal { transform: translateY(12px) scale(0.98); }

.modal-scrim {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: grid;
  place-items: center;
  z-index: 150;
  padding: 20px;
}
.modal {
  width: 100%;
  max-width: 430px;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
}
.modal-head h3 { font-size: 15px; }
.modal-body { padding: 18px; }
.modal-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 18px;
  background: var(--surface-2);
  border-top: 1px solid var(--border);
}
</style>