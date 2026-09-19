<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  series: { type: Array, required: true },
  labels: { type: Array, required: true },
  height: { type: Number, default: 260 },
  ySuffix: { type: String, default: '' }
})

const wrapRef = ref(null)
const width = ref(720)

let ro = null
onMounted(() => {
  ro = new ResizeObserver((entries) => {
    width.value = Math.max(280, entries[0].contentRect.width)
  })
  ro.observe(wrapRef.value)
})
onBeforeUnmount(() => ro?.disconnect())

const PAD = { l: 46, r: 14, t: 12, b: 26 }

const H = computed(() => props.height)
const plotW = computed(() => width.value - PAD.l - PAD.r)
const plotH = computed(() => H.value - PAD.t - PAD.b)
const n = computed(() => Math.max(...props.series.map((s) => s.data.length)))

const yScale = computed(() => {
  const all = props.series.flatMap((s) => s.data)
  let min = Math.min(...all)
  let max = Math.max(...all)
  const range = max - min || 1
  min -= range * 0.15
  max += range * 0.15
  return {
    y: (v) => PAD.t + ((max - v) / (max - min)) * plotH.value,
    ticks: [0, 1, 2, 3, 4].map((k) => {
      const v = max - ((max - min) / 4) * k
      return { v, y: PAD.t + (k / 4) * plotH.value }
    }),
    fmt: (v) => (Math.abs(v) >= 100 ? String(Math.round(v)) : v.toFixed(1))
  }
})

const xTicks = computed(() => {
  const count = Math.min(7, n.value)
  const step = Math.max(1, Math.floor((n.value - 1) / (count - 1)))
  const idx = []
  for (let i = 0; i < n.value; i += step) idx.push(i)
  if (idx[idx.length - 1] !== n.value - 1) idx.push(n.value - 1)
  return idx.map((i) => ({ i, x: PAD.l + (i / (n.value - 1)) * plotW.value, label: props.labels[i] || '' }))
})

function xFor(i) {
  return PAD.l + (i / Math.max(1, n.value - 1)) * plotW.value
}

function linePath(data) {
  if (!data.length) return ''
  const pts = data.map((v, i) => [xFor(i), yScale.value.y(v)])
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i]
    const prev = pts[i - 1]
    const mx = ((prev[0] + p[0]) / 2).toFixed(1)
    d += ` C ${mx} ${prev[1].toFixed(1)}, ${mx} ${p[1].toFixed(1)}, ${p[0].toFixed(1)} ${p[1].toFixed(1)}`
  }
  return d
}

function areaPath(data) {
  if (!data.length) return ''
  const line = linePath(data)
  const lastX = xFor(data.length - 1)
  return `${line} L ${lastX.toFixed(1)} ${PAD.t + plotH.value} L ${PAD.l.toFixed(1)} ${PAD.t + plotH.value} Z`
}

const hover = ref(null)
const hoverY = computed(() => {
  if (!hover.value || !n.value) return PAD.t
  return [0, ...props.series.map((s) => s.data[hover.value.i])].reduce((a, b) => a + b, 0) && yScale.value.y(props.series[0].data[hover.value.i])
})

function onMove(e) {
  const rect = wrapRef.value.getBoundingClientRect()
  const px = e.clientX - rect.left
  const frac = (px - PAD.l) / plotW.value
  const i = Math.max(0, Math.min(n.value - 1, Math.round(frac * (n.value - 1))))
  hover.value = {
    i,
    px,
    left: Math.min(Math.max(px - 90, 0), width.value - 180),
    top: Math.min(yScale.value.y(Math.min(...props.series.map((s) => s.data[i]))), H.value - 150)
  }
}
function onLeave() {
  hover.value = null
}
</script>

<template>
  <div ref="wrapRef" class="linechart" :style="{ height: H + 'px' }" @mousemove="onMove" @mouseleave="onLeave">
    <svg :width="width" :height="H" :viewBox="`0 0 ${width} ${H}`" preserveAspectRatio="none" class="lc-svg">
      <g v-for="t in yScale.ticks" :key="t.y">
        <line class="grid" x1="0" :y1="t.y" :x2="width" :y2="t.y" />
        <text class="axis-t" x="8" :y="t.y + 3">{{ yScale.fmt(t.v) }}</text>
      </g>
      <line class="axis" x1="0" :y1="PAD.t + plotH" :x2="width" :y2="PAD.t + plotH" />

      <g v-for="s in series" :key="s.name">
        <path v-if="series.length === 1" class="fill" :d="areaPath(s.data)" :fill="s.color" opacity="0.1" />
        <path class="serie" :d="linePath(s.data)" :stroke="s.color" />
      </g>

      <g v-for="t in xTicks" :key="t.i">
        <text class="axis-t x" :x="t.x" :y="H - 8">{{ t.label }}</text>
      </g>

      <g v-if="hover">
        <line class="h-line" :x1="xFor(hover.i)" :y1="PAD.t" :x2="xFor(hover.i)" :y2="PAD.t + plotH" />
        <circle
          v-for="s in series"
          :key="s.name"
          class="h-dot"
          :cx="xFor(hover.i)"
          :cy="yScale.y(s.data[hover.i])"
          r="3.6"
          :stroke="s.color"
          fill="#fff"
        />
      </g>
    </svg>

    <div v-if="hover && hoverY" class="tip" :style="{ left: hover.left + 'px', top: (hover.top + PAD.t) + 'px' }">
      <div v-for="s in series" :key="s.name" class="tip-row">
        <span class="tip-dot" :style="{ background: s.color }"></span>
        <span class="tip-name">{{ s.name }}</span>
        <span class="tip-val mono">{{ s.data[hover.i] }}{{ ySuffix }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.linechart { position: relative; width: 100%; user-select: none; }
.lc-svg { width: 100%; height: 100%; display: block; }
.grid { stroke: #eef0f3; stroke-width: 1; }
.axis { stroke: var(--border); stroke-width: 1; }
.axis-t { fill: var(--text-4); font-size: 10.5px; font-family: 'Inter', sans-serif; }
.axis-t.x { text-anchor: middle; }
.serie { fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.fill { stroke: none; }
.h-line { stroke: var(--border-strong); stroke-width: 1; stroke-dasharray: 4 4; }
.h-dot { stroke-width: 2; }

.tip {
  position: absolute;
  pointer-events: none;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 8px 11px;
  z-index: 5;
  transform: translateY(-100%);
  min-width: 130px;
}
.tip-row { display: flex; align-items: center; gap: 7px; font-size: 11.5px; padding: 1px 0; }
.tip-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.tip-name { color: var(--text-3); font-weight: 500; }
.tip-val { margin-left: auto; font-weight: 700; color: var(--text-2); }
</style>