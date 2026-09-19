import { reactive } from 'vue'

const rand = (scale) => (Math.random() - 0.5) * scale

function spark(base, amp, n, drift = 0) {
  const arr = []
  let v = base
  for (let i = 0; i < n; i++) {
    v += rand(amp * 0.5) + drift
    v = Math.max(0, v)
    arr.push(Number(v.toFixed(2)))
  }
  return arr
}

const SENSORS = [
  { id: 'suhu', label: 'Suhu', unit: '°C', value: 28.6, amp: 0.9, type: 'DHT22', pin: 'D4' },
  { id: 'kelembapan', label: 'Kelembapan', unit: '%', value: 72, amp: 3, type: 'DHT22', pin: 'D4' },
  { id: 'cahaya', label: 'Intensitas Cahaya', unit: 'lux', value: 430, amp: 40, type: 'BH1750', pin: 'I2C' },
  { id: 'udara', label: 'Kualitas Udara', unit: 'ppm', value: 12, amp: 2, type: 'MQ-135', pin: 'A0' },
  { id: 'tanah', label: 'Kelembapan Tanah', unit: '%', value: 65, amp: 4, type: 'Capacitive', pin: 'A1' },
  { id: 'tekanan', label: 'Tekanan Udara', unit: 'hPa', value: 1012, amp: 2, type: 'BMP280', pin: 'I2C' },
  { id: 'jarak', label: 'Jarak (Ultrasonik)', unit: 'cm', value: 24, amp: 3, type: 'HC-SR04', pin: 'D5' },
  { id: 'getaran', label: 'Getaran', unit: 'g', value: 0.03, amp: 0.02, type: 'SW-420', pin: 'D2' }
]

function buildSensors() {
  return SENSORS.map((s) => ({
    ...s,
    change: 0,
    dir: 'up',
    history: spark(s.value, s.amp, 40)
  }))
}

let toastId = 0

function fmt(offsetMinutes) {
  const d = new Date(Date.now() - offsetMinutes * 60000)
  const pad = (n) => String(n).padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return `${pad(d.getDate())} ${months[d.getMonth()]} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export const store = reactive({
  clock: new Date(),
  sidebarCollapsed: false,
  mobileNavOpen: false,

  device: {
    online: true,
    ip: '192.168.1.100',
    name: 'ESP32 Smart Lab',
    firmware: 'v2.4.1',
    wifi: -52,
    uptime: '03:24:11'
  },

  camera: {
    label: 'Kamera 1 - Ruang Lab',
    online: true,
    resolution: '1280x720'
  },

  sensors: buildSensors(),

  detection: {
    label: 'Person Detected',
    confidence: 96,
    status: 'normal'
  },

  activeModel: 'Object Detection (YOLOv8)',

  learningDone: {},

  recommendation:
    'Terdeteksi ada orang di area kerja. Pastikan perangkat dalam kondisi aman. Jika ini bukan aktivitas yang diharapkan, pertimbangkan untuk mengaktifkan mode keamanan.',

  outputs: {
    led: { label: 'LED', on: false },
    rgb: { label: 'RGB LED', on: false },
    relay1: { label: 'Relay 1', on: false },
    relay2: { label: 'Relay 2', on: false },
    servo: { label: 'Servo', on: false },
    buzzer: { label: 'Buzzer', on: false },
    motor: { label: 'Motor DC', on: false },
    fan: { label: 'Kipas', on: true }
  },

  inputs: {
    btn1: { label: 'Button 1', on: false },
    btn2: { label: 'Button 2', on: false },
    rfid: { label: 'RFID Reader', status: 'No Card' }
  },

  pot: { label: 'Potensiometer', value: 68 },

  alerts: [
    { id: 4, title: 'Orang terdeteksi di kamera', time: '12 Apr 14:28', status: 'info' },
    { id: 3, title: 'Suhu tinggi (> 30°C)', time: '12 Apr 13:15', status: 'warning' },
    { id: 2, title: 'Sensor tidak merespons (DHT22)', time: '12 Apr 11:42', status: 'critical' },
    { id: 1, title: 'Intensitas cahaya rendah', time: '12 Apr 10:20', status: 'warning' }
  ],

  period: '1h',

  logs: [
    { id: 12, time: fmt(0), level: 'info', source: 'ESP32', message: 'Data sensor berhasil dikirim ke server' },
    { id: 11, time: fmt(0), level: 'info', source: 'CV', message: 'Deteksi objek: Person (96%)' },
    { id: 10, time: fmt(1), level: 'warning', source: 'ESP32', message: 'Suhu melebihi ambang batas 30°C' },
    { id: 9, time: fmt(2), level: 'info', source: 'System', message: 'Relay 1 diaktifkan via aturan otomatis' },
    { id: 8, time: fmt(3), level: 'error', source: 'ESP32', message: 'Sensor DHT22 tidak merespons pada pin D4' },
    { id: 7, time: fmt(5), level: 'info', source: 'System', message: 'Dashboard berhasil terhubung ke 192.168.1.100' },
    { id: 6, time: fmt(8), level: 'warning', source: 'ESP32', message: 'Intensitas cahaya rendah (< 300 lux)' },
    { id: 5, time: fmt(12), level: 'info', source: 'CV', message: 'Model YOLOv8 dimuat dalam 240 ms' },
    { id: 4, time: fmt(15), level: 'info', source: 'User', message: 'Eksperimen "Monitoring Cahaya" dimulai' },
    { id: 3, time: fmt(26), level: 'info', source: 'ESP32', message: 'Sistem berhasil di-reset' },
    { id: 2, time: fmt(40), level: 'info', source: 'System', message: 'Konfigurasi WiFi diperbarui' },
    { id: 1, time: fmt(65), level: 'info', source: 'System', message: 'Aplikasi dashboard dimulai' }
  ],

  experiments: [
    { id: 1, name: 'Kontrol Suhu Otomatis', status: 'running', progress: 62, duration: '18:40', sensor: 'Suhu', output: 'Kipas', created: '12 Apr 2025' },
    { id: 2, name: 'Monitoring Cahaya Ruangan', status: 'paused', progress: 34, duration: '09:15', sensor: 'Intensitas Cahaya', output: 'LED', created: '12 Apr 2025' },
    { id: 3, name: 'Deteksi Wajah di Pintu', status: 'completed', progress: 100, duration: '45:00', sensor: 'Kamera', output: 'Buzzer', created: '11 Apr 2025' },
    { id: 4, name: 'Respons Relay pada Gerakan', status: 'idle', progress: 0, duration: '—', sensor: 'Getaran', output: 'Relay 1', created: '12 Apr 2025' }
  ],

  rules: [
    { id: 1, condition: 'Suhu', operator: '>', threshold: 30, action: 'Nyalakan', target: 'Kipas', on: true },
    { id: 2, condition: 'Intensitas Cahaya', operator: '<', threshold: 300, action: 'Nyalakan', target: 'LED', on: true },
    { id: 3, condition: 'Getaran', operator: 'detected', threshold: 0, action: 'Aktifkan', target: 'Relay 1', on: false },
    { id: 4, condition: 'Kelembapan', operator: '<', threshold: 50, action: 'Aktifkan', target: 'Buzzer', on: false }
  ],

  toasts: [],

  toast(msg, type = 'success') {
    const id = ++toastId
    store.toasts.push({ id, msg, type })
    setTimeout(() => {
      store.toasts = store.toasts.filter((t) => t.id !== id)
    }, 3200)
  },

  toggleOutput(key) {
    const out = store.outputs[key]
    out.on = !out.on
    store.toast(`${out.label} ${out.on ? 'diaktifkan' : 'dimatikan'}`)
  },

  setOutput(key, on) {
    store.outputs[key].on = on
  },

  resetSystem() {
    for (const key in store.outputs) store.outputs[key].on = false
    store.pot.value = 0
    store.inputs.rfid.status = 'No Card'
    store.toast('Sistem berhasil di-reset', 'warning')
  },

  saveData() {
    store.toast('Data berhasil disimpan ke database', 'success')
  },

  newId: 100,

  addLog(entry) {
    store.logs.unshift({ id: store.newId++, time: 'Hari ini', ...entry })
    if (store.logs.length > 200) store.logs.pop()
  },

  addAlert(entry) {
    store.alerts.unshift({ id: store.newId++, time: 'Hari ini', ...entry })
  }
})

export function startSimulation() {
  window.setInterval(() => {
    store.clock = new Date()
  }, 1000)

  window.setInterval(() => {
    for (const s of store.sensors) {
      const prev = s.value
      let next = prev + rand(s.amp * 0.6) + s.amp * 0.04
      // confine realistic bounds
      const bounds = {
        suhu: [22, 34],
        kelembapan: [45, 90],
        cahaya: [120, 760],
        udara: [5, 40],
        tanah: [25, 95],
        tekanan: [995, 1030],
        jarak: [4, 140],
        getaran: [0, 0.5]
      }[s.id]
      if (bounds) next = Math.min(bounds[1], Math.max(bounds[0], next))
      s.value = Number(next.toFixed(2))
      s.change = Number(Math.abs(next - prev).toFixed(s.id === 'getaran' ? 3 : 1))
      s.dir = next >= prev ? 'up' : 'down'
      s.history.push(s.value)
      if (s.history.length > 60) s.history.shift()
    }

    // keep detection confidence alive
    const jitter = Math.round(rand(3))
    store.detection.confidence = Math.min(99, Math.max(82, store.detection.confidence + jitter))
  }, 2000)
}