<template>
  <div v-if="store.toasts.length" class="toasts">
    <div v-for="t in store.toasts" :key="t.id" class="toast" :class="t.type">
      <component :is="t.type === 'error' ? AlertCircle : t.type === 'warning' ? AlertTriangle : CheckCircle" :size="16" />
      {{ t.msg }}
    </div>
  </div>
</template>

<script setup>
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-vue-next'
import { store } from '../store'
</script>

<style scoped>
.toasts {
  position: fixed;
  top: 72px;
  right: 18px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: 360px;
}
.toast svg { color: var(--green); flex: none; }
.toast.warning svg { color: var(--amber-500); }
.toast.error svg { color: var(--red); }
</style>