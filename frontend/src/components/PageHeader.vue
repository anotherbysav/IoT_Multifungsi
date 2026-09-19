<script setup>
import { computed } from 'vue'
import { Calendar, Clock } from 'lucide-vue-next'
import { store } from '../store'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})

const dateStr = computed(() =>
  new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(store.clock)
)
const timeStr = computed(() =>
  new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(store.clock)
)
</script>

<template>
  <div class="page-head">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="datetime">
      <div class="dt-item"><Calendar :size="15" />{{ dateStr }}</div>
      <div class="dt-item clock"><Clock :size="15" />{{ timeStr }}</div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.page-head h1 {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.page-head p {
  color: var(--text-3);
  font-size: 12.5px;
  margin-top: 3px;
}
.datetime {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dt-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
  box-shadow: var(--shadow);
}
.dt-item svg { color: var(--text-3); }
.dt-item.clock { font-family: 'JetBrains Mono', monospace; color: var(--green-600); }
</style>