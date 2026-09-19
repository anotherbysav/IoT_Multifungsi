import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('./views/DashboardView.vue'), meta: { title: 'Dashboard' } },
  { path: '/iot', name: 'iot', component: () => import('./views/IotSensorsView.vue'), meta: { title: 'IoT (Sensors)' } },
  { path: '/vision', name: 'vision', component: () => import('./views/ComputerVisionView.vue'), meta: { title: 'Computer Vision (AI)' } },
  { path: '/automation', name: 'automation', component: () => import('./views/AutomationView.vue'), meta: { title: 'Automation (Output)' } },
  { path: '/logs', name: 'logs', component: () => import('./views/DataLogsView.vue'), meta: { title: 'Data & Logs' } },
  { path: '/experiments', name: 'experiments', component: () => import('./views/ExperimentsView.vue'), meta: { title: 'Experiments' } },
  { path: '/settings', name: 'settings', component: () => import('./views/SettingsView.vue'), meta: { title: 'Settings' } },
  { path: '/learn/:slug', name: 'learn', component: () => import('./views/LearningModuleView.vue'), meta: { title: 'Learning Modules' } },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} — Dashboard IoT & AI` : 'Dashboard IoT & AI'
})

export default router