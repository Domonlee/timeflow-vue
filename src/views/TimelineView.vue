<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">时间线</h1>
      <p class="page-date">{{ dateDisplay }}</p>
    </div>
    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-val">{{ store.todaySummary.total }}</div>
        <div class="summary-lbl">总记录</div>
      </div>
      <div class="summary-card">
        <div class="summary-val">{{ store.todaySummary.activities }}</div>
        <div class="summary-lbl">活动数</div>
      </div>
      <div class="summary-card">
        <div class="summary-val">{{ store.todaySummary.categories }}</div>
        <div class="summary-lbl">分类数</div>
      </div>
    </div>
    <div class="timeline-header">
      <h2 class="timeline-title">可视化时间轴</h2>
    </div>
    <div class="timeline-bar-chart">
      <div v-for="(bar, i) in chartSegments" :key="i"
        class="bar-segment"
        :style="{ height: bar.height, background: bar.color }">
      </div>
    </div>
    <div class="timeline-list">
      <div v-if="store.todayTimeline.length === 0" class="empty-state">
        今天还没有活动记录
      </div>
      <div v-for="item in store.todayTimeline" :key="item.id" class="timeline-item">
        <div class="timeline-time-col">
          <span class="time-start">{{ item.startTime }}</span>
          <span class="time-end">{{ item.endTime }}</span>
        </div>
        <div class="timeline-line" :class="item.categoryId"></div>
        <div class="timeline-content">
          <div class="timeline-info">
            <span class="timeline-dot" :class="item.categoryId"></span>
            <span class="timeline-name">{{ store.getCategory(item.categoryId)?.name }}</span>
          </div>
          <span class="timeline-duration">{{ formatDuration(item.duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useActivityStore } from '../stores/activity'

const store = useActivityStore()

const dateDisplay = computed(() => {
  const d = new Date()
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${days[d.getDay()]}`
})

const chartSegments = computed(() => {
  const items = store.todayTimeline
  if (items.length === 0) return []
  const maxDur = Math.max(...items.map(i => i.duration), 1)
  return items.map(item => ({
    height: Math.max(4, (item.duration / maxDur) * 100) + '%',
    color: store.getCategory(item.categoryId)?.color || 'var(--border)',
  }))
})

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}小时${m}分钟`
  if (m > 0) return `${m}分钟`
  return `${seconds}秒`
}
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
.page-date { font-size: 13px; color: var(--muted); }
.summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
.summary-card {
  background: var(--surface); border-radius: 12px; padding: 12px;
  text-align: center; border: 1px solid var(--border);
}
.summary-val { font-family: var(--font-mono); font-size: 18px; font-weight: 600; margin-bottom: 4px; }
.summary-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
.timeline-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.timeline-title { font-size: 17px; font-weight: 600; }
.timeline-bar-chart {
  display: flex; align-items: flex-end; gap: 4px;
  height: 60px; margin-bottom: 24px; padding: 0 4px;
}
.bar-segment { flex: 1; border-radius: 3px 3px 0 0; min-height: 4px; }
.timeline-list { display: flex; flex-direction: column; gap: 2px; }
.timeline-item { display: flex; align-items: stretch; min-height: 64px; position: relative; }
.timeline-time-col { width: 70px; padding: 8px 0; display: flex; flex-direction: column; justify-content: center; }
.time-start { font-family: var(--font-mono); font-size: 13px; font-weight: 500; }
.time-end { font-family: var(--font-mono); font-size: 11px; color: var(--muted); }
.timeline-line {
  width: 2px; background: var(--border); margin: 0 12px; position: relative;
}
.timeline-line::before {
  content: ''; position: absolute; top: 12px; left: -4px;
  width: 10px; height: 10px; border-radius: 50%;
}
.timeline-line.work::before { background: var(--cat-work); }
.timeline-line.run::before { background: var(--cat-run); }
.timeline-line.read::before { background: var(--cat-read); }
.timeline-line.write::before { background: var(--cat-write); }
.timeline-line.rest::before { background: var(--cat-rest); }
.timeline-line.study::before { background: var(--cat-study); }
.timeline-line.game::before { background: var(--cat-game); }
.timeline-line.family::before { background: var(--cat-family); }
.timeline-line.sport::before { background: var(--cat-sport); }
.timeline-content {
  flex: 1; background: var(--surface); border-radius: 12px; padding: 12px;
  margin: 6px 0; display: flex; justify-content: space-between; align-items: center;
  border: 1px solid var(--border);
}
.timeline-info { display: flex; align-items: center; gap: 10px; }
.timeline-dot { width: 10px; height: 10px; border-radius: 50%; }
.timeline-dot.work { background: var(--cat-work); }
.timeline-dot.run { background: var(--cat-run); }
.timeline-dot.read { background: var(--cat-read); }
.timeline-dot.write { background: var(--cat-write); }
.timeline-dot.rest { background: var(--cat-rest); }
.timeline-dot.study { background: var(--cat-study); }
.timeline-dot.game { background: var(--cat-game); }
.timeline-dot.family { background: var(--cat-family); }
.timeline-dot.sport { background: var(--cat-sport); }
.timeline-name { font-size: 14px; font-weight: 500; }
.timeline-duration { font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
.empty-state { padding: 40px 20px; text-align: center; color: var(--muted); font-size: 14px; }
</style>
