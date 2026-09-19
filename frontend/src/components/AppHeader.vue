<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, Wifi, Bell, ChevronDown, WifiOff, LogOut, UserRound, Settings as SettingsIcon } from 'lucide-vue-next'
import { store } from '../store'

const router = useRouter()
const notifOpen = ref(false)
const userOpen = ref(false)
const rootRef = ref(null)

const badgeCount = computed(() => store.alerts.length)

function onMenu() {
  if (window.innerWidth <= 900) store.mobileNavOpen = !store.mobileNavOpen
  else store.sidebarCollapsed = !store.sidebarCollapsed
}

function onDocClick(e) {
  if (!rootRef.value) return
  if (!rootRef.value.contains(e.target)) {
    notifOpen.value = false
    userOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <header class="header" ref="rootRef">
    <div class="head-left">
      <button class="icon-btn" title="Toggle menu" @click="onMenu">
        <Menu :size="19" />
      </button>

      <div class="dev-status">
        <span class="chip chip-green">
          <span class="dot dot-green"></span>
          Online
        </span>
        <span class="ip mono">{{ store.device.ip }}</span>
      </div>
    </div>

    <div class="head-right">
      <span class="status-mini">
        <Wifi :size="16" :class="['wifi', { off: !store.device.online }]" />
        <span class="hidden-sm">{{ store.device.online ? 'Terhubung' : 'Terputus' }}</span>
      </span>

      <!-- notifications -->
      <div class="drop-root">
        <button class="icon-btn rel" title="Notifikasi" @click="notifOpen = !notifOpen">
          <Bell :size="18" />
          <span v-if="badgeCount" class="badge">{{ badgeCount }}</span>
        </button>
        <transition name="drop">
          <div v-if="notifOpen" class="drop-panel" @click.stop>
            <div class="drop-head">
              <strong>Notifikasi</strong>
              <RouterLink to="/logs" class="link" @click="notifOpen = false">Lihat Semua</RouterLink>
            </div>
            <div class="drop-list">
              <div v-for="a in store.alerts" :key="a.id" class="drop-item">
                <span class="dot" :class="`dot-${a.status === 'info' ? 'green' : a.status === 'warning' ? 'amber' : 'red'}`"></span>
                <div class="drop-txt">
                  <span>{{ a.title }}</span>
                  <em>{{ a.time }}</em>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <span class="divider"></span>

      <!-- user -->
      <div class="drop-root">
        <button class="user-btn" @click="userOpen = !userOpen">
          <span class="avatar">
            <UserRound :size="16" stroke-width="2" />
          </span>
          <span class="user-meta">
            <span class="u-name">Student</span>
            <span class="u-role">Learning Mode</span>
          </span>
          <ChevronDown :size="15" class="caret" />
        </button>
        <transition name="drop">
          <div v-if="userOpen" class="drop-panel right" @click.stop>
            <div class="drop-head"><strong>Akun</strong></div>
            <div class="drop-item" @click="router.push('/settings'); userOpen = false">
              <SettingsIcon :size="15" /> Pengaturan
            </div>
            <div class="drop-item" @click="userOpen = false">
              <LogOut :size="15" /> Keluar
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 60;
  height: var(--header-h);
  background: #fff;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 18px;
}
.head-left, .head-right { display: flex; align-items: center; gap: 12px; }

.icon-btn {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  border: none;
  background: transparent;
  color: var(--text-3);
  display: grid;
  place-items: center;
  transition: background 0.16s ease, color 0.16s ease;
}
.icon-btn:hover { background: var(--surface-2); color: var(--text-2); }

.badge {
  position: absolute;
  top: 3px;
  right: 2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 99px;
  background: var(--red);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 2px #fff;
}

.dev-status { display: flex; align-items: center; gap: 9px; }
.ip { font-size: 11.5px; color: var(--text-3); }
.status-mini { display: flex; align-items: center; gap: 6px; color: var(--text-3); font-size: 12px; }
.wifi { color: var(--green); }
.wifi.off { color: var(--text-4); }
.hidden-sm { white-space: nowrap; }

.divider { width: 1px; height: 24px; background: var(--border); }

.drop-root { position: relative; }
.drop-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 100;
}
.drop-panel.right { width: 210px; }
.drop-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
}
.drop-head .link { font-size: 11.5px; color: var(--green-600); font-weight: 600; }
.drop-list { max-height: 260px; overflow-y: auto; }
.drop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--surface-3);
  font-size: 12.5px;
  color: var(--text-2);
  cursor: default;
}
.drop-item:last-child { border-bottom: none; }
.drop-item svg { color: var(--text-3); flex: none; }
.drop-txt { display: flex; flex-direction: column; }
.drop-txt em { font-style: normal; font-size: 11px; color: var(--text-4); margin-top: 2px; }

.user-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  background: transparent;
  border: none;
  border-radius: 10px;
  padding: 5px 8px;
  transition: background 0.16s ease;
}
.user-btn:hover { background: var(--surface-2); }
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green);
  display: grid;
  place-items: center;
  flex: none;
}
.user-meta { display: flex; flex-direction: column; text-align: left; line-height: 1.25; }
.u-name { font-size: 12.5px; font-weight: 700; }
.u-role { font-size: 10.5px; color: var(--text-4); }
.caret { color: var(--text-4); transition: transform 0.2s ease; }
.user-btn:hover .caret { transform: translateY(2px); }

.drop-enter-active, .drop-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }

@media (max-width: 640px) {
  .hidden-sm { display: none; }
  .user-meta { display: none; }
  .dev-status .ip { display: none; }
}
</style>