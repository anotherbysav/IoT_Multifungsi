<script setup>
import { ref } from 'vue'
import { Settings, Wifi, Database, BellRing, UserRound, TriangleAlert, Save } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import { store } from '../store'

const ip = ref(store.device.ip)
const mqttHost = ref('mqtt.local')
const mqttPort = ref(1883)
const refresh = ref(2)
const name = ref('Student')
const email = ref('student@iotlab.test')
const role = ref('Praktikan')
const notifPush = ref(true)
const notifSound = ref(true)
const notifAlert = ref(true)

function saveAll() {
  if (ip.value && ip.value.trim()) store.device.ip = ip.value.trim()
  store.toast('Pengaturan berhasil disimpan')
}
</script>

<template>
  <div>
    <PageHeader title="Settings" subtitle="Konfigurasi sistem, koneksi, dan preferensi">
      <template #actions>
        <button class="btn btn-primary" @click="saveAll"><Save :size="15" /> Simpan Pengaturan</button>
      </template>
    </PageHeader>

    <div class="set-grid">
      <div class="card set-card rise rise-1">
        <div class="card-head"><h3 class="card-title"><Wifi :size="16" /> Koneksi Device</h3></div>
        <div class="set-body">
          <label class="field">IP Address Device</label>
          <input v-model="ip" type="text" class="input mono" />
          <p class="hint">IP ESP32/Arduino yang terhubung ke jaringan.</p>

          <label class="field">MQTT Broker</label>
          <input v-model="mqttHost" type="text" class="input mono" />
          <p class="hint">Host broker MQTT untuk komunikasi data.</p>

          <label class="field">Port MQTT</label>
          <input v-model.number="mqttPort" type="number" class="input mono" />
        </div>
      </div>

      <div class="card set-card rise rise-2">
        <div class="card-head"><h3 class="card-title"><Database :size="16" /> Data & Refresh</h3></div>
        <div class="set-body">
          <label class="field">Interval Refresh Data (detik)</label>
          <input v-model.number="refresh" type="number" min="1" max="60" class="input mono" />
          <p class="hint">Seberapa sering dashboard meminta data baru.</p>

          <div class="toggle-line" @click="notifAlert = !notifAlert">
            <span>Simpan data otomatis ke database</span>
            <button class="switch" :class="{ on: notifAlert }"><span class="knob"></span></button>
          </div>
          <p class="hint">Data sensor akan disimpan secara berkala pada DB MySQL.</p>
        </div>
      </div>

      <div class="card set-card rise rise-3">
        <div class="card-head"><h3 class="card-title"><BellRing :size="16" /> Notifikasi</h3></div>
        <div class="set-body">
          <div class="toggle-line" @click="notifPush = !notifPush">
            <span>Notifikasi push</span>
            <button class="switch" :class="{ on: notifPush }"><span class="knob"></span></button>
          </div>
          <div class="toggle-line" style="margin-top: 6px" @click="notifSound = !notifSound">
            <span>Suara peringatan</span>
            <button class="switch" :class="{ on: notifSound }"><span class="knob"></span></button>
          </div>
          <p class="hint">Dapatkan pemberitahuan saat ada anomali sensor.</p>
        </div>
      </div>

      <div class="card set-card rise rise-4">
        <div class="card-head"><h3 class="card-title"><UserRound :size="16" /> Akun</h3></div>
        <div class="set-body">
          <label class="field">Nama Pengguna</label>
          <input v-model="name" type="text" class="input" />
          <label class="field" style="margin-top: 12px">Email</label>
          <input v-model="email" type="email" class="input" />
          <label class="field" style="margin-top: 12px">Peran</label>
          <select v-model="role" class="select">
            <option>Praktikan</option>
            <option>Dosen</option>
            <option>Teknisi Lab</option>
          </select>
        </div>
      </div>

      <div class="card set-card danger rise rise-2">
        <div class="card-head"><h3 class="card-title"><TriangleAlert :size="16" /> Zona Bahaya</h3></div>
        <div class="set-body">
          <p class="hint">Reset seluruh data eksperimen, aturan, dan konfigurasi lokal pada dashboard.</p>
          <button class="btn btn-danger" @click="store.resetSystem()">Reset Sistem</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.set-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  align-items: start;
}
.set-card { margin-bottom: 0; }
.set-body { padding: 16px 18px; }
.hint { font-size: 11px; color: var(--text-4); margin-top: 6px; margin-bottom: 12px; }
.set-body .field { margin-top: 0; }
.set-body .select,
.set-body .select + .hint { margin-bottom: 0; }
.toggle-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  padding: 8px 0;
  cursor: pointer;
}
.danger .set-body { padding-bottom: 18px; }
</style>