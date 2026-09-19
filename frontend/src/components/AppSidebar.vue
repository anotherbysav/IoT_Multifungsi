<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  LayoutDashboard, Activity, ScanEye, Workflow, Database, FlaskConical,
  Settings, BookOpen, Cpu, ToggleRight, ScanLine, Sparkles, ChevronDown, Zap
} from 'lucide-vue-next'
import { store } from '../store'

const route = useRoute()

const menus = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'IoT (Sensors)', to: '/iot', icon: Activity },
  { label: 'Computer Vision (AI)', to: '/vision', icon: ScanEye },
  { label: 'Automation (Output)', to: '/automation', icon: Workflow },
  { label: 'Data & Logs', to: '/logs', icon: Database },
  { label: 'Experiments', to: '/experiments', icon: FlaskConical },
  { label: 'Settings', to: '/settings', icon: Settings }
]

const learning = [
  { title: 'IoT Basics', subtitle: 'Sensor & Dashboard', to: '/learn/iot-basics', icon: Cpu },
  { title: 'Automation', subtitle: 'Rule & Relay', to: '/learn/automation', icon: ToggleRight },
  { title: 'Computer Vision', subtitle: 'Object Detection', to: '/learn/computer-vision', icon: ScanLine },
  { title: 'AI + IoT', subtitle: 'Smart Recommendation', to: '/learn/ai-iot', icon: Sparkles }
]

const collapsed = computed(() => store.sidebarCollapsed)
</script>

<template>
  <aside class="sidebar" :class="{ collapsed, open: store.mobileNavOpen }">
    <div class="brand">
      <div class="brand-logo">
        <Zap :size="19" stroke-width="2.2" />
      </div>
      <div class="brand-text">
        <div class="brand-name">IoT Lab</div>
        <div class="brand-sub">AI Monitoring</div>
      </div>
    </div>

    <nav class="nav">
      <p class="nav-label">Menu Utama</p>
      <RouterLink
        v-for="m in menus"
        :key="m.to"
        :to="m.to"
        class="nav-item"
        exact-active-class="active"
        :title="collapsed ? m.label : undefined"
        @click="store.mobileNavOpen = false"
      >
        <span class="nav-ic"><component :is="m.icon" :size="18" stroke-width="1.9" /></span>
        <span class="nav-text">{{ m.label }}</span>
      </RouterLink>

      <div class="nav-group">
        <div class="nav-label learn">
          <BookOpen :size="13" />
          <span>Learning Modules</span>
          <ChevronDown :size="14" class="chev" />
        </div>
        <template v-for="l in learning" :key="l.to">
          <RouterLink
            :to="l.to"
            class="nav-item learn-item"
            active-class="active"
            :title="collapsed ? l.title : undefined"
            @click="store.mobileNavOpen = false"
          >
            <span class="nav-ic"><component :is="l.icon" :size="17" stroke-width="1.9" /></span>
            <span class="nav-text">
              <span>{{ l.title }}</span>
              <span class="nav-sub">{{ l.subtitle }}</span>
            </span>
          </RouterLink>
        </template>
      </div>
    </nav>

    <div class="side-foot">
      <div class="foot-chip">
        <span class="dot dot-green"></span>
        <div class="foot-info">
          <span class="foot-title">Perangkat Terhubung</span>
          <span class="foot-sub">ESP32 · {{ store.device.ip }}</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-w);
  flex: none;
  background: #fff;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  transition: width 0.28s cubic-bezier(0.34, 1, 0.4, 1), transform 0.28s ease;
  z-index: 80;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 16px 18px 14px;
  border-bottom: 1px solid var(--border);
  min-height: var(--header-h);
}
.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.brand:hover .brand-logo { transform: rotate(-8deg) scale(1.05); }
.brand-text { overflow: hidden; white-space: nowrap; }
.brand-name { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; }
.brand-sub { font-size: 11px; color: var(--text-3); }

.nav { flex: 1; overflow-y: auto; padding: 14px 12px 10px; }
.nav-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-4);
  margin: 0 10px 8px;
  white-space: nowrap;
}
.nav-label.learn svg { color: var(--text-4); }
.chev { margin-left: auto; }

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 9px 11px;
  border-radius: 9px;
  color: var(--text-2);
  font-weight: 500;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  transition: background 0.16s ease, color 0.16s ease;
}
.nav-item .nav-ic {
  color: var(--text-3);
  flex: none;
  transition: color 0.16s ease;
}
.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.nav-item:hover .nav-ic { color: var(--text-2); }

.nav-item.active {
  background: var(--surface-2);
  color: var(--text);
  font-weight: 600;
}
.nav-item.active .nav-ic { color: var(--green); }
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 18px;
  border-radius: 99px;
  background: var(--green);
}

.nav-group { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); }

.learn-item { padding: 7px 11px; }
.learn-item .nav-text { display: flex; flex-direction: column; line-height: 1.3; }
.nav-sub { font-size: 11px; color: var(--text-4); font-weight: 400; }

.side-foot {
  padding: 12px;
  border-top: 1px solid var(--border);
}
.foot-chip {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  white-space: nowrap;
  overflow: hidden;
}
.foot-info { display: flex; flex-direction: column; overflow: hidden; }
.foot-title { font-size: 11.5px; font-weight: 600; color: var(--text-2); }
.foot-sub { font-size: 10.5px; color: var(--text-4); font-family: 'JetBrains Mono', monospace; }

/* collapsed */
.sidebar.collapsed .nav-text,
.sidebar.collapsed .nav-label,
.sidebar.collapsed .nav-sub,
.sidebar.collapsed .brand-text,
.sidebar.collapsed .learn .chev,
.sidebar.collapsed .foot-info {
  opacity: 0;
  width: 0;
  overflow: hidden;
}
.sidebar.collapsed .brand { padding-left: 16px; }
.sidebar.collapsed .nav-item,
.sidebar.collapsed .nav-label { justify-content: flex-start; }
.sidebar.collapsed .nav { padding: 14px 10px; }
.sidebar.collapsed .nav-group { margin-top: 12px; padding-top: 10px; }
.sidebar.collapsed .nav-label { height: 0; margin: 0; overflow: hidden; }
.sidebar.collapsed .learn-item { padding: 8px 9px; }
.sidebar.collapsed .side-foot { padding: 10px; }
.sidebar.collapsed .foot-chip { justify-content: center; padding: 10px 4px; }

/* mobile */
@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    transform: translateX(-100%);
    box-shadow: var(--shadow-lg);
  }
  .sidebar.open { transform: translateX(0); }
  .sidebar.collapsed { width: var(--sidebar-w); }
}
</style>