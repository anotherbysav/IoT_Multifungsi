<script setup>
import { Cpu, MousePointerClick, SlidersHorizontal, CreditCard, ScanLine } from 'lucide-vue-next'
import { store } from '../store'

function toggleInput(key) {
  store.inputs[key].on = !store.inputs[key].on
  store.toast(`${store.inputs[key].label} ${store.inputs[key].on ? 'ditekan' : 'dilepas'}`)
}

let scanTimer = null
function scan() {
  store.inputs.rfid.status = 'Membaca...'
  setTimeout(() => {
    store.inputs.rfid.status = 'ID: OA-4F-2B'
    store.toast('Kartu berhasil dibaca')
    scanTimer = setTimeout(() => {
      store.inputs.rfid.status = 'No Card'
    }, 6000)
  }, 700)
}
</script>

<template>
  <section class="card dig-card rise rise-2">
    <div class="card-head">
      <h3 class="card-title"><Cpu :size="16" /> Input Digital & Analog</h3>
    </div>

    <div class="dig-body">
      <!-- buttons -->
      <div class="di-item">
        <span class="di-ic"><MousePointerClick :size="16" /></span>
        <div class="di-main">
          <span class="di-name">Button 1</span>
          <span class="di-sub">{{ store.inputs.btn1.on ? 'Ditekan' : 'Lepas' }}</span>
        </div>
        <button class="switch" :class="{ on: store.inputs.btn1.on }" @click="toggleInput('btn1')">
          <span class="knob"></span>
        </button>
      </div>

      <div class="di-item">
        <span class="di-ic"><MousePointerClick :size="16" /></span>
        <div class="di-main">
          <span class="di-name">Button 2</span>
          <span class="di-sub">{{ store.inputs.btn2.on ? 'Ditekan' : 'Lepas' }}</span>
        </div>
        <button class="switch" :class="{ on: store.inputs.btn2.on }" @click="toggleInput('btn2')">
          <span class="knob"></span>
        </button>
      </div>

      <!-- potensiometer -->
      <div class="di-item pot">
        <span class="di-ic"><SlidersHorizontal :size="16" /></span>
        <div class="di-main">
          <span class="di-name">Potensiometer</span>
          <input
            v-model.number="store.pot.value"
            type="range"
            min="0"
            max="100"
            class="range"
            :style="{ '--fill': store.pot.value + '%' }"
          />
        </div>
        <span class="pot-val mono">{{ store.pot.value }}%</span>
      </div>

      <!-- RFID -->
      <div class="di-item">
        <span class="di-ic rfid"><CreditCard :size="16" /></span>
        <div class="di-main">
          <span class="di-name">RFID Reader</span>
          <span class="di-sub" :class="{ reading: store.inputs.rfid.status !== 'No Card' }">
            {{ store.inputs.rfid.status }}
          </span>
        </div>
        <button class="btn btn-sm" @click="scan">
          <ScanLine :size="13" /> Baca
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dig-card { height: 100%; display: flex; flex-direction: column; }
.dig-body { padding: 6px 4px; flex: 1; display: flex; flex-direction: column; justify-content: center; }
.di-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 14px;
  border-radius: 9px;
  transition: background 0.15s ease;
  margin: 2px 6px;
}
.di-item:hover { background: var(--surface-2); }
.di-ic {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
  flex: none;
}
.di-ic.rfid { background: var(--green-soft); color: var(--green); }
.di-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.di-name { font-size: 13px; font-weight: 600; color: var(--text-2); }
.di-sub { font-size: 11px; color: var(--text-4); }
.di-sub.reading { color: var(--green-600); font-weight: 600; }

.range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  max-width: 190px;
  height: 4px;
  border-radius: 99px;
  background: linear-gradient(to right, var(--green) 0%, var(--green) var(--fill, 0%), var(--surface-4) var(--fill, 0%));
  margin-top: 8px;
  --fill: 0%;
}
.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--green);
  cursor: pointer;
  transition: transform 0.15s ease;
}
.range::-webkit-slider-thumb:hover { transform: scale(1.15); }
.range::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--green);
  cursor: pointer;
}
.pot-val {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--green-600);
  background: var(--green-soft);
  border-radius: 7px;
  padding: 4px 8px;
  white-space: nowrap;
}
</style>