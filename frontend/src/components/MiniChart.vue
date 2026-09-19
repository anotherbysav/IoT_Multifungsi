<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  color: { type: String, default: '#2f9e6e' },
  width: { type: Number, default: 120 },
  height: { type: Number, default: 34 }
})

const gid = useId()

const scale = computed(() => {
  const vals = props.data
  let min = Math.min(...vals)
  let max = Math.max(...vals)
  const span = max - min || 1
  min -= span * 0.25
  max += span * 0.25
  const x = (i, n) => (n <= 1 ? 0.5 : (i / (n - 1)) * props.width)
  const y = (v) => props.height - ((v - min) / (max - min)) * props.height
  return { x, y }
})

const points = computed(() => props.data.map((v, i) => [scale.value.x(i, props.data.length), scale.value.y(v)]))

const linePath = computed(() => {
  const [a, ...rest] = points.value
  const d = [`M ${a[0].toFixed(1)} ${a[1].toFixed(1)}`]
  for (let i = 0; i < rest.length; i++) {
    const p = rest[i]
    const prev = i === 0 ? a : rest[i - 1]
    d.push(`C ${((prev[0] + p[0]) / 2).toFixed(1)} ${prev[1].toFixed(1)}, ${((prev[0] + p[0]) / 2).toFixed(1)} ${p[1].toFixed(1)}, ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
  }
  return d.join(' ')
})

const areaPath = computed(() => {
  const [first] = points.value
  const [last] = points.value.slice(-1)
  return `${linePath.value} L ${last[0].toFixed(1)} ${props.height} L ${first[0].toFixed(1)} ${props.height} Z`
})
</script>

<template>
  <svg class="mini" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.22" />
        <stop offset="100%" :stop-color="color" stop-opacity="0.02" />
      </linearGradient>
    </defs>
    <path class="area" :d="areaPath" :fill="`url(#${gid})`" />
    <path class="line" :d="linePath" :stroke="color" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<style scoped>
.mini {
  width: 100%;
  height: 100%;
}
</style>