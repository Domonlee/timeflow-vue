<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">今天</h1>
      <p class="page-date">{{ dateDisplay }}</p>
    </div>

    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-label">今日已记录</span>
        <span class="hero-stat-value">{{ store.todayTotal }}</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-label">活动数量</span>
        <span class="hero-stat-value">{{ store.todayActivityCount }}个</span>
      </div>
    </div>

    <router-link v-if="store.timerElapsed > 0" to="/timer"
      class="current-activity"
      :style="{ background: currentCat?.color }">
      <div class="activity-info">
        <div class="activity-icon">
          <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/></svg>
        </div>
        <div>
          <div class="activity-label">当前活动</div>
          <div class="activity-name">{{ currentCat?.name }}</div>
        </div>
      </div>
      <div class="activity-timer">{{ store.timerFormatted }}</div>
    </router-link>

    <div class="section-header">
      <h2 class="section-title">活动分类</h2>
    </div>
    <div class="category-grid">
      <div v-for="cat in store.categories" :key="cat.id"
        class="category-card"
        :style="{ background: cat.color + '26', borderColor: cat.color + '40' }"
        @click="startActivity(cat.id)">
        <div class="category-icon">
          <icon-component :name="cat.icon" :color="cat.color" size="28" />
        </div>
        <span class="category-name">{{ cat.name }}</span>
      </div>
    </div>

    <div class="section-header">
      <h2 class="section-title">最近活动</h2>
      <router-link to="/timeline" class="section-link">查看全部</router-link>
    </div>
    <div class="recent-list">
      <div v-if="store.todayRecentActivities.length === 0" class="recent-empty">
        还没有活动记录，点击上方分类开始计时
      </div>
      <div v-for="r in store.todayRecentActivities" :key="r.id" class="recent-item">
        <div class="recent-left">
          <span class="recent-dot" :style="{ background: store.getCategory(r.categoryId)?.color }"></span>
          <span class="recent-name">{{ store.getCategory(r.categoryId)?.name }}</span>
        </div>
        <span class="recent-duration">{{ formatDuration(r.duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useActivityStore } from '../stores/activity'
import IconComponent from '../components/IconComponent.vue'

const router = useRouter()
const store = useActivityStore()

const dateDisplay = computed(() => {
  const d = new Date()
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${days[d.getDay()]}`
})

const currentCat = computed(() => store.getCategory(store.timerCategoryId))

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}小时${m}分钟`
  if (m > 0) return `${m}分钟`
  return `${seconds}秒`
}

function startActivity(id) {
  store.setCurrentCategory(id)
  router.push('/timer')
}
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
.page-date { font-size: 13px; color: var(--muted); }
.hero-stats {
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%);
  border-radius: 20px; padding: 20px; margin-bottom: 20px;
  border: 1px solid var(--border);
}
.hero-stat { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.hero-stat:last-child { margin-bottom: 0; }
.hero-stat-label { font-size: 13px; color: var(--muted); }
.hero-stat-value { font-family: var(--font-mono); font-size: 22px; font-weight: 600; }
.current-activity {
  border-radius: 16px; padding: 16px; margin-bottom: 20px;
  display: flex; justify-content: space-between; align-items: center;
  text-decoration: none; color: white;
}
.activity-info { display: flex; align-items: center; gap: 12px; }
.activity-icon {
  width: 40px; height: 40px; background: rgba(255,255,255,0.2);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
}
.activity-icon svg { width: 22px; height: 22px; fill: white; }
.activity-name { font-size: 17px; font-weight: 600; }
.activity-label { font-size: 11px; color: rgba(255,255,255,0.7); }
.activity-timer { font-family: var(--font-mono); font-size: 28px; font-weight: 700; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-title { font-size: 17px; font-weight: 600; }
.section-link { font-size: 13px; color: var(--accent); text-decoration: none; }
.category-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.category-card {
  aspect-ratio: 1; border-radius: 16px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; transition: transform 0.15s; border: 1px solid var(--border);
  background: var(--surface);
}
.category-card:active { transform: scale(0.95); }
.category-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.category-name { font-size: 11px; color: var(--fg); font-weight: 500; }
.recent-list { display: flex; flex-direction: column; gap: 8px; }
.recent-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 14px; background: var(--surface); border-radius: 12px;
  border: 1px solid var(--border);
}
.recent-left { display: flex; align-items: center; gap: 10px; }
.recent-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.recent-name { font-size: 14px; font-weight: 500; }
.recent-duration { font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
.recent-empty {
  padding: 20px; text-align: center; color: var(--muted); font-size: 14px;
  background: var(--surface); border-radius: 12px; border: 1px dashed var(--border);
}
</style>
