import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'today', component: () => import('../views/TodayView.vue') },
  { path: '/timer', name: 'timer', component: () => import('../views/TimerView.vue') },
  { path: '/timeline', name: 'timeline', component: () => import('../views/TimelineView.vue') },
  { path: '/stats', name: 'stats', component: () => import('../views/StatsView.vue') },
  { path: '/insights', name: 'insights', component: () => import('../views/InsightsView.vue') },
  { path: '/categories', name: 'categories', component: () => import('../views/CategoriesView.vue') },
  { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
