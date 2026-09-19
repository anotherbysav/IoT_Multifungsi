<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Play, Database, RotateCcw, Zap } from 'lucide-vue-next'
import { store } from '../store'

const router = useRouter()
const armed = ref(false)
let armedTimer = null

function onReset() {
  if (!armed.value) {
    armed.value = true
    store.toast('Klik sekali lagi untuk konfirmasi reset', 'warning')
    armedTimer = setTimeout(() => (armed.value = false), 3500)
    return
  }
  clearTimeout(armedTimer)
  armed.value = false
  store.resetSystem()
}
</script>

<template>
  <section class="card qa-card rise rise-2">
    <div class="card-head">
      <h3 class="card-title"><Zap :size="16" /> Quick Actions</h3>
    </div>
    <div class="card-body qa-body">
      <button class="qa-btn primary" @click="router.push('/experiments')">
        <span class="qa-ic"><Play :size="17" /></span>
        <span class="qa-txt">
          <strong>Mulai Eksperimen</strong>
          <em>Jalankan eksperimen baru</em>
        </span>
      </button>

      <button class="qa-btn" @click="store.saveData()">
        <span class="qa-ic"><Database :size="17" /></span>
        <span class="qa-txt">
          <strong>Simpan Data</strong>
          <em>Simpan bacaan ke database</em>
        </span>
      </button>

      <button class="qa-btn danger" :class="{ armed }" @click="onReset">
        <span class="qa-ic"><RotateCcw :size="17" /></span>
        <span class="qa-txt">
          <strong>{{ armed ? 'Konfirmasi Reset?' : 'Reset Sistem' }}</strong>
          <em>{{ armed ? 'Klik lagi untuk melanjutkan' : 'Kembalikan semua ke kondisi awal' }}</em>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.qa-card { margin-bottom: 16px; }
.qa-body { display: flex; flex-direction: column; gap: 10px; }
.qa-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  text-align: left;
  transition: all 0.18s ease;
  width: 100%;
}
.qa-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: #c2c7cf;
}
.qa-btn:active { transform: translateY(0); }
.qa-btn.primary {
  background: var(--green-soft);
  border-color: var(--green-line);
}
.qa-btn.primary:hover {
  background: #d7efe4;
  border-color: var(--green);
}
.qa-btn.danger:hover { border-color: #e6b9bc; background: #fdf7f7; }
.qa-btn.danger.armed {
  background: var(--red-soft);
  border-color: var(--red);
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
.qa-ic {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #fff;
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.qa-btn.danger .qa-ic { color: var(--red); }
.qa-txt { display: flex; flex-direction: column; line-height: 1.3; }
.qa-txt strong { font-size: 13px; color: var(--text-2); font-weight: 650; }
.qa-txt em { font-style: normal; font-size: 11px; color: var(--text-4); margin-top: 1px; }
</style>