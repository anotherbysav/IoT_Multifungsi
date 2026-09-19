<script setup>
import { computed } from 'vue'
import { BellRing, ChevronRight, UserRound, Thermometer, Activity, Sun } from 'lucide-vue-next'
import { store } from '../store'

const iconMap = [UserRound, Thermometer, Activity, Sun]
const statusCls = { info: 'green', warning: 'amber', critical: 'red' }
const rows = computed(() =>
  store.alerts.map((a, i) => ({
    ...a,
    icon: iconMap[i % iconMap.length],
    cls: statusCls[a.status] || 'gray'
  }))
)
</script>

<template>
  <section class="card al-card rise rise-3">
    <div class="card-head">
      <h3 class="card-title"><BellRing :size="16" /> Recent Alerts</h3>
      <RouterLink to="/logs" class="link-all">Lihat Semua</RouterLink>
    </div>
    <div class="al-list">
      <div v-for="a in rows" :key="a.id" class="al-item">
        <span class="al-ic" :class="a.cls">
          <component :is="a.icon" :size="15" stroke-width="1.9" />
        </span>
        <div class="al-main">
          <span class="al-title">{{ a.title }}</span>
          <span class="al-time mono">{{ a.time }}</span>
        </div>
        <ChevronRight :size="15" class="chev" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.al-card { margin-bottom: 16px; }
.link-all {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--green-600);
  transition: color 0.16s ease;
}
.link-all:hover { color: var(--green); text-decoration: underline; }

.al-list { display: flex; flex-direction: column; }
.al-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--surface-3);
  transition: background 0.16s ease;
}
.al-item:hover { background: var(--surface-2); }
.al-item:last-child { border-bottom: none; }

.al-ic {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  flex: none;
}
.al-ic.green { background: var(--green-soft); color: var(--green-600); }
.al-ic.amber { background: var(--amber-soft); color: var(--amber); }
.al-ic.red { background: var(--red-soft); color: var(--red); }

.al-main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.al-title { font-size: 12.5px; font-weight: 600; color: var(--text-2); line-height: 1.35; }
.al-time { font-size: 11px; color: var(--text-4); margin-top: 2px; }
.chev { color: var(--text-4); flex: none; transition: transform 0.16s ease; }
.al-item:hover .chev { transform: translateX(3px); }
</style>