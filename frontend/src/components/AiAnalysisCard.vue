<script setup>
import { UserRound, Sparkles, AlertTriangle, BrainCircuit } from 'lucide-vue-next'
import { store } from '../store'
</script>

<template>
  <section class="card ai-card rise rise-1">
    <div class="card-head">
      <h3 class="card-title"><BrainCircuit :size="16" /> Analisis AI</h3>
      <span class="chip chip-gray mono">YOLOv8 + LLM</span>
    </div>

    <div class="card-body">
      <div class="detect">
        <span class="d-ic"><UserRound :size="20" stroke-width="1.8" /></span>
        <div class="d-info">
          <div class="d-label">{{ store.detection.label }}</div>
          <div class="d-conf">
            <span>Confidence: <strong>{{ store.detection.confidence }}%</strong></span>
            <div class="bar">
              <div class="bar-fill" :style="{ width: store.detection.confidence + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rec">
        <div class="rec-head">
          <AlertTriangle :size="15" />
          <strong>Rekomendasi</strong>
        </div>
        <p>{{ store.recommendation }}</p>
      </div>

      <div class="ai-foot">
        <Sparkles :size="13" />
        <span>Dianalisis oleh model AI · <span class="mono">v2.4</span></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ai-card { margin-bottom: 16px; }
.ai-card .chip.mono { letter-spacing: 0.02em; }

.detect {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--green-soft);
  border: 1px solid var(--green-line);
  border-radius: 10px;
  padding: 13px 14px;
}
.d-ic {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #fff;
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
  box-shadow: var(--shadow);
}
.d-label { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
.d-conf { margin-top: 9px; }
.d-conf span { font-size: 12px; color: var(--text-2); }
.d-conf strong { color: var(--green-600); }
.bar {
  margin-top: 6px;
  height: 6px;
  border-radius: 99px;
  background: #d9e9df;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--green);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.rec {
  margin-top: 14px;
  background: var(--amber-soft);
  border: 1px solid var(--amber-line);
  border-left: 3px solid var(--amber-500);
  border-radius: 10px;
  padding: 12px 14px;
}
.rec-head {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--amber);
  font-size: 12.5px;
  margin-bottom: 7px;
}
.rec p {
  font-size: 12.5px;
  color: #7a4a12;
  line-height: 1.65;
}

.ai-foot {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  font-size: 11.5px;
  color: var(--text-4);
}
.ai-foot svg { color: var(--green); }
</style>