<script setup>
import PageHeader from '../components/PageHeader.vue'
import SensorGrid from '../components/SensorGrid.vue'
import CameraCard from '../components/CameraCard.vue'
import DetectionSummaryCard from '../components/DetectionSummaryCard.vue'
import DataChartsCard from '../components/DataChartsCard.vue'
import OutputControlCard from '../components/OutputControlCard.vue'
import DigitalAnalogCard from '../components/DigitalAnalogCard.vue'
import AiVisionCard from '../components/AiVisionCard.vue'
import AiAnalysisCard from '../components/AiAnalysisCard.vue'
import QuickActionsCard from '../components/QuickActionsCard.vue'
import RecentAlertsCard from '../components/RecentAlertsCard.vue'
</script>

<template>
  <div class="dashboard">
    <PageHeader title="Dashboard IoT & AI" subtitle="Monitoring • Control • Learn • Build" />

    <div class="db-grid">
      <!-- kolom tengah: scroll sendiri -->
      <div class="col col-main">
        <SensorGrid />

        <div class="cam-row">
          <CameraCard />
          <DetectionSummaryCard />
        </div>

        <DataChartsCard />

        <div class="two">
          <OutputControlCard />
          <DigitalAnalogCard />
        </div>

        <AiVisionCard />
      </div>

      <!-- kolom kanan: scroll sendiri -->
      <aside class="col col-side">
        <AiAnalysisCard />
        <QuickActionsCard />
        <RecentAlertsCard />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.db-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 20px;
}

.col {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  -webkit-overflow-scrolling: touch;
  padding-right: 2px;
  padding-bottom: 10px;
}
.col-side { padding-left: 2px; }

.cam-row {
  display: grid;
  grid-template-columns: minmax(0, 560px) minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.cam-row :deep(.cam-card) { margin-bottom: 0; }

.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: stretch;
  margin-bottom: 20px;
}

@media (max-width: 1240px) {
  .dashboard { height: auto; overflow: visible; }
  .db-grid { grid-template-columns: 1fr; }
  .col { overflow: visible; padding-right: 0; }
  .col-side { position: static; padding-left: 0; }
  .cam-row { grid-template-columns: 1fr; }
  .cam-row :deep(.cam-card) { margin-bottom: 0; }
}

@media (max-width: 820px) {
  .two { grid-template-columns: 1fr; }
}
</style>