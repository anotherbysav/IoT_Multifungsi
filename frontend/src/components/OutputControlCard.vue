<script setup>
import { ToggleLeft, Lightbulb, Palette, Power, Cog, Volume2, Zap, Fan } from 'lucide-vue-next'
import { store } from '../store'

const icons = {
  led: Lightbulb,
  rgb: Palette,
  relay1: Power,
  relay2: Power,
  servo: Cog,
  buzzer: Volume2,
  motor: Zap,
  fan: Fan
}
</script>

<template>
  <section class="card out-card rise rise-1">
    <div class="card-head">
      <h3 class="card-title"><ToggleLeft :size="16" /> Kontrol Output</h3>
      <span class="chip chip-gray">{{ Object.values(store.outputs).filter((o) => o.on).length }} aktif</span>
    </div>
    <div class="out-list">
      <div v-for="(out, key) in store.outputs" :key="key" class="out-item">
        <span class="o-ic" :class="{ on: out.on }">
          <component :is="icons[key]" :size="16" stroke-width="1.9" />
        </span>
        <span class="o-name">{{ out.label }}</span>
        <button
          class="switch"
          :class="{ on: out.on }"
          role="switch"
          :aria-checked="out.on"
          @click="store.toggleOutput(key)"
        >
          <span class="knob"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.out-card { margin-bottom: 20px; height: 100%; display: flex; flex-direction: column; }
.out-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8px 0;
  flex: 1;
}
.out-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 16px;
  transition: background 0.15s ease;
  border-radius: 8px;
  margin: 2px 6px;
}
.out-item:hover { background: var(--surface-2); }
.o-ic {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--surface-3);
  color: var(--text-3);
  display: grid;
  place-items: center;
  flex: none;
  transition: all 0.2s ease;
}
.o-ic.on { background: var(--green-soft); color: var(--green); }
.o-name { font-size: 13px; font-weight: 500; color: var(--text-2); flex: 1; }
@media (max-width: 560px) {
  .out-list { grid-template-columns: 1fr; }
}
</style>