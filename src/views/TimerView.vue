<template>
  <div class="page timer-page">
    <div class="nav-header">
      <router-link to="/" class="back-btn">
        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        <span>返回</span>
      </router-link>
      <span class="nav-title">计时中</span>
      <div class="placeholder"></div>
    </div>
    <div class="timer-section">
      <div class="activity-badge" :style="badgeStyle">
        <div class="activity-badge-icon" :style="{ background: catColor }">
          <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/></svg>
        </div>
        <span class="activity-badge-name" :style="{ color: catColor }">{{ category?.name }}</span>
      </div>
      <div class="timer-display" :style="{ color: store.timerIsRunning ? catColor : 'var(--fg)' }">
        {{ store.timerFormatted }}
      </div>
      <p class="timer-label">专注时间</p>
      <div class="controls">
        <button v-if="!store.timerIsRunning && store.timerElapsed > 0"
          class="ctrl-btn ctrl-resume"
          :style="{ background: catColor }"
          @click="store.startTimer()"
          aria-label="继续">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button v-else
          class="ctrl-btn ctrl-pause"
          @click="store.pauseTimer()"
          aria-label="暂停">
          <svg viewBox="0 0 20 24"><rect x="3" y="0" width="5" height="24" rx="1.5"/></svg>
        </button>
        <button class="ctrl-btn ctrl-stop" @click="store.stopTimer(); $router.push('/')" aria-label="停止">
          <svg viewBox="0 0 22 22"><rect x="2" y="2" width="18" height="18" rx="2.5"/></svg>
        </button>
      </div>
      <button class="notes-btn">
        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <span>添加备注</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useActivityStore } from '../stores/activity'

const router = useRouter()
const store = useActivityStore()

const category = computed(() => store.getCategory(store.timerCategoryId))
const catColor = computed(() => category.value?.color || 'var(--accent)')

const badgeStyle = computed(() => ({
  background: catColor.value + '26',
  borderColor: catColor.value + '4D'
}))

onMounted(() => {
  store.startTimer()
})
</script>

<style scoped>
.timer-page { display: flex; flex-direction: column; min-height: calc(100vh - 12px); }
.nav-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; }
.back-btn { display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 15px; text-decoration: none; }
.back-btn svg { width: 20px; height: 20px; fill: var(--accent); }
.nav-title { font-size: 17px; font-weight: 600; }
.placeholder { width: 60px; }
.timer-section { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.activity-badge {
  display: flex; align-items: center; gap: 12px;
  border: 1px solid rgba(88,86,214,0.3);
  border-radius: 20px; padding: 10px 20px; margin-bottom: 40px;
}
.activity-badge-icon {
  width: 32px; height: 32px; background: var(--cat-work); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.activity-badge-icon svg { width: 18px; height: 18px; fill: white; }
.activity-badge-name { font-size: 17px; font-weight: 600; }
.timer-display {
  font-family: var(--font-mono); font-size: 72px; font-weight: 700;
  letter-spacing: -2px; margin-bottom: 8px;
  transition: color 0.3s;
}
.timer-label { font-size: 13px; color: var(--muted); margin-bottom: 60px; }
.controls { display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 40px; }
.ctrl-btn {
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: transform 0.15s; -webkit-tap-highlight-color: transparent;
}
.ctrl-btn:active { transform: scale(0.92); }
.ctrl-pause { width: 64px; height: 64px; background: var(--accent); border-radius: 50%; }
.ctrl-pause svg { width: 20px; height: 24px; fill: white; }
.ctrl-stop { width: 52px; height: 52px; background: #ff3b30; border-radius: 50%; }
.ctrl-stop svg { width: 22px; height: 22px; fill: white; }
.ctrl-resume { width: 72px; height: 72px; border-radius: 50%; }
.ctrl-resume svg { width: 28px; height: 28px; fill: white; }
.notes-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 16px; background: var(--surface);
  border: 1px solid var(--border); border-radius: 14px; color: var(--muted);
  font-size: 15px; cursor: pointer; transition: background 0.15s;
}
.notes-btn:active { background: var(--surface-2); }
.notes-btn svg { width: 20px; height: 20px; fill: var(--muted); }
</style>
