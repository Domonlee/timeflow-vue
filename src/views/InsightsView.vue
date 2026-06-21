<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">洞察</h1>
      <p class="page-subtitle">基于你的时间数据分析</p>
    </div>

    <div class="week-selector">
      <button class="week-btn">
        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <span class="week-label">{{ weekLabel }}</span>
      <button class="week-btn">
        <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </button>
    </div>

    <div class="streak-card">
      <div class="streak-icon">🔥</div>
      <div class="streak-num">{{ store.streakDays }}</div>
      <div class="streak-label">连续记录天数</div>
    </div>

    <div class="summary-row">
      <div class="summary-item">
        <div class="summary-item-val">{{ formatDurationShort(store.weekTotal) }}</div>
        <div class="summary-item-lbl">本周总计</div>
      </div>
      <div class="summary-item">
        <div class="summary-item-val" :class="store.weekComparison.direction">
          {{ store.weekComparison.label }}
        </div>
        <div class="summary-item-lbl">较上周</div>
      </div>
      <div class="summary-item">
        <div class="summary-item-val">{{ store.mostFocusedDay.name }}</div>
        <div class="summary-item-lbl">最专注</div>
      </div>
    </div>

    <div class="insight-card up">
      <div class="insight-header">
        <div class="insight-icon-wrap up">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>
        </div>
        <span class="insight-badge up">增长</span>
      </div>
      <h3 class="insight-title">本周总时间{{ store.weekComparison.direction === 'up' ? '增加' : '减少' }} {{ store.weekComparison.diff }}</h3>
      <p class="insight-desc">本周共记录 {{ formatDurationShort(store.weekTotal) }}，{{ store.weekComparison.direction === 'up' ? '比上周多出' : '比上周减少' }}{{ store.weekComparison.diff }}。</p>
      <div class="insight-metric">
        <span class="metric-value up">{{ formatDurationShort(store.weekTotal) }}</span>
        <span class="metric-unit">本周总时间</span>
        <span class="metric-comp">{{ store.weekComparison.label }} vs 上周</span>
      </div>
    </div>

    <div class="insight-card neutral">
      <div class="insight-header">
        <div class="insight-icon-wrap neutral">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <span class="insight-badge neutral">分布</span>
      </div>
      <h3 class="insight-title">{{ topCategory?.name }}占据本周时间最多</h3>
      <p class="insight-desc">{{ topCategory?.name }}共 {{ topCategory?.time }}，占本周总量的 {{ topCategory?.pct }}。</p>
      <div class="insight-metric">
        <span class="metric-value neutral">{{ topCategory?.time || '0' }}</span>
        <span class="metric-unit">{{ topCategory?.name || '' }}</span>
        <span class="metric-comp">总时间 {{ formatDurationShort(store.weekTotal) }}</span>
      </div>
    </div>

    <div class="insight-card highlight">
      <div class="insight-header">
        <div class="insight-icon-wrap highlight">
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
        </div>
        <span class="insight-badge highlight">本周</span>
      </div>
      <h3 class="insight-title">最专注的一天是{{ store.mostFocusedDay.name }}</h3>
      <p class="insight-desc">你在这天的活动时间最长，达到了 {{ store.mostFocusedDay.value }}。</p>
      <div class="insight-metric">
        <span class="metric-value neutral">{{ store.mostFocusedDay.value }}</span>
        <span class="metric-unit">当日活动</span>
        <span class="metric-comp">日均 {{ formatDurationShort(Math.round(store.weekTotal / 7)) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useActivityStore } from '../stores/activity'

const store = useActivityStore()

const weekLabel = computed(() => {
  const { start, end } = getWeekRange()
  return `${start.getMonth() + 1}月${start.getDate()}日 - ${end.getMonth() + 1}月${end.getDate()}日`
})

const topCategory = computed(() => {
  const ranking = store.categoryRanking
  return ranking.length > 0 ? ranking[0] : null
})

function getWeekRange() {
  const now = new Date()
  const day = now.getDay()
  const diff = day === 0 ? 6 : day - 1
  const monday = new Date(now)
  monday.setDate(now.getDate() - diff)
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return { start: monday, end: sunday }
}

function formatDurationShort(seconds) {
  if (!seconds) return '0h'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return h + 'h' + (m > 0 ? m + 'm' : '')
  if (m > 0) return m + 'm'
  return seconds + 's'
}
</script>

<style scoped>
.page-header { margin-bottom: 20px; }
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 4px; }
.page-subtitle { font-size: 13px; color: var(--muted); }
.week-selector { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.week-btn {
  width: 32px; height: 32px; border-radius: 50%; background: var(--surface);
  border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.week-btn svg { width: 16px; height: 16px; fill: var(--muted); }
.week-label { font-size: 14px; font-weight: 500; flex: 1; text-align: center; }
.streak-card {
  background: linear-gradient(135deg, var(--cat-work) 0%, #7c5cbf 100%);
  border-radius: 16px; padding: 20px; margin-bottom: 12px; text-align: center;
}
.streak-icon { font-size: 32px; margin-bottom: 8px; }
.streak-num { font-family: var(--font-mono); font-size: 48px; font-weight: 700; color: white; line-height: 1; }
.streak-label { font-size: 13px; color: rgba(255,255,255,0.8); margin-top: 4px; }
.summary-row { display: flex; gap: 10px; margin-bottom: 12px; }
.summary-item {
  flex: 1; background: var(--surface); border-radius: 12px; padding: 12px;
  border: 1px solid var(--border); text-align: center;
}
.summary-item-val { font-family: var(--font-mono); font-size: 20px; font-weight: 600; margin-bottom: 4px; }
.summary-item-val.up { color: var(--accent-green); }
.summary-item-val.down { color: var(--accent-red); }
.summary-item-lbl { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
.insight-card {
  background: var(--surface); border-radius: 16px; padding: 16px;
  margin-bottom: 12px; border: 1px solid var(--border); position: relative; overflow: hidden;
}
.insight-card::before {
  content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
}
.insight-card.up::before { background: var(--accent-green); }
.insight-card.down::before { background: var(--accent-red); }
.insight-card.neutral::before { background: var(--accent); }
.insight-card.highlight::before { background: var(--cat-work); }
.insight-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.insight-icon-wrap {
  width: 40px; height: 40px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}
.insight-icon-wrap.up { background: rgba(48,209,88,0.15); }
.insight-icon-wrap.down { background: rgba(255,69,58,0.15); }
.insight-icon-wrap.neutral { background: rgba(10,132,255,0.15); }
.insight-icon-wrap.highlight { background: rgba(88,86,214,0.15); }
.insight-icon-wrap svg { fill: currentColor; }
.insight-icon-wrap.up svg { color: var(--accent-green); }
.insight-icon-wrap.down svg { color: var(--accent-red); }
.insight-icon-wrap.neutral svg { color: var(--accent); }
.insight-icon-wrap.highlight svg { color: var(--cat-work); }
.insight-badge {
  font-size: 10px; font-weight: 600; padding: 4px 8px; border-radius: 8px;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.insight-badge.up { background: rgba(48,209,88,0.15); color: var(--accent-green); }
.insight-badge.down { background: rgba(255,69,58,0.15); color: var(--accent-red); }
.insight-badge.neutral { background: rgba(10,132,255,0.15); color: var(--accent); }
.insight-badge.highlight { background: rgba(88,86,214,0.15); color: var(--cat-work); }
.insight-title { font-size: 17px; font-weight: 600; margin-bottom: 6px; line-height: 1.3; }
.insight-desc { font-size: 13px; color: var(--muted); line-height: 1.5; }
.insight-metric {
  display: flex; align-items: baseline; gap: 6px;
  margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);
}
.metric-value { font-family: var(--font-mono); font-size: 28px; font-weight: 700; }
.metric-value.up { color: var(--accent-green); }
.metric-value.down { color: var(--accent-red); }
.metric-value.neutral { color: var(--accent); }
.metric-value.highlight { color: var(--cat-work); }
.metric-unit { font-size: 14px; color: var(--muted); }
.metric-comp { font-size: 12px; color: var(--muted); margin-left: auto; }
</style>
