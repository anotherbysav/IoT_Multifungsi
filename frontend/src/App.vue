<script setup>
import { onMounted } from 'vue'
import AppSidebar from './components/AppSidebar.vue'
import AppHeader from './components/AppHeader.vue'
import ToastStack from './components/ToastStack.vue'
import { store, startSimulation } from './store'

onMounted(() => {
  startSimulation()
})
</script>

<template>
  <div class="shell" :class="{ collapsed: store.sidebarCollapsed }">
    <AppSidebar />

    <div
      v-if="store.mobileNavOpen"
      class="scrim"
      @click="store.mobileNavOpen = false"
    ></div>

    <div class="main">
      <AppHeader />
      <main class="content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <ToastStack />
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  min-height: 100vh;
}
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 16px 20px 26px;
  max-width: 1560px;
  width: 100%;
  margin: 0 auto;
}
.scrim {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 70;
  backdrop-filter: blur(1.5px);
}
@media (min-width: 901px) {
  .scrim { display: none; }
}
</style>