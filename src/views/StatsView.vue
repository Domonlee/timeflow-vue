<template>
  <div class="page">
    <h1 class="page-title">统计</h1>
    <div class="segment-control">
      <button v-for="seg in segments" :key="seg"
        class="segment-btn"
        :class="{ active: activeSegment === seg }"
        @click="activeSegment = seg">{{ seg }}</button>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">时间分类占比</span>
        <span class="card-value">{{ activeSegment === '日' ? '今日' : activeSegment === '周' ? '本周' : activeSegment === '月' ? '本月' : '本年' }}</span>
      </div>
      <div class="donut-chart">
        <div class="donut-visual">
          <svg class="donut-svg" width="120" height="120" viewBox="0 0 120 120">
            <circle v-for="(item, i) in distData" :key="item.id"
              cx="60" cy="60" r="50" fill="none"
              :stroke="item.color"
              stroke-width="20"
              :stroke-dasharray="item.dashArray"
              :stroke-dashoffset="item.dashOffset" />
          </svg>
          <div class="donut-center">
            <div class="donut-total">{{ distTotal }}</div>
            <div class="donut-label">总计</div>
          </div>
        </div>
        <div class="donut-legend">
          <div v-for="item in distData" :key="item.id" class="legend-item">
            <span class="legend-dot" :style="{ background: item.color }"></span>
            <span class="legend-name">{{ item.name }}</span>
            <span class="legend-pct">{{ item.pct }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">周趋势</span>
        <span class="card-value">本周</span>
      </div>
      <div class="bar-chart">
        <div v-for="day in store.weekData" :key="day.label" class="bar-item">
          <span class="bar-value">{{ day.value }}</span>
          <div class="bar" :style="{ height: day.height, background: 'var(--accent)' }"></div>
          <span class="bar-label">{{ day.label }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">分类排行</span>
        <span class="card-value">本周</span>
      </div>
      <div class="rank-list">
        <div v-if="store.categoryRanking.length === 0" class="empty-state">暂无数据</div>
        <div v-for="(item, i) in store.categoryRanking" :key="item.id" class="rank-item">
          <span class="rank-num">{{ i + 1 }}</span>
          <div class="rank-bar">
            <div class="rank-fill" :style="{ width: item.width, background: item.color }">
              <span class="rank-name">{{ item.name }}</span>
              <span class="rank-val">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useActivityStore } from '../stores/activity'

const store = useActivityStore()
const segments = ['日', '周', '月', '年']
const activeSegment = ref('周')

const distData = computed(() => {
  const items = store.categoryDistribution.items
  const total = store.categoryDistribution.grandTotal || 1
  const circumference = 2 * Math.PI * 50
  let offset = 0
  return items.map(item => {
    const ratio = item.value / total
    const dashLen = ratio * circumference
    const dashEmpty = circumference - dashLen
    const result = {
      ...item,
      dashArray: `${dashLen} ${dashEmpty}`,
      dashOffset: -offset,
    }
    offset += dashLen
    return result
  })
})

const distTotal = computed(() => store.categoryDistribution.total)
</script>

<style scoped>
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 16px; }
.segment-control {
  display: flex; background: var(--surface); border-radius: 10px;
  padding: 3px; margin-bottom: 20px;
}
.segment-btn {
  flex: 1; padding: 8px 0; text-align: center; font-size: 13px; font-weight: 500;
  color: var(--muted); border-radius: 8px; cursor: pointer; transition: background 0.2s, color 0.2s;
  border: none; background: none; font-family: inherit;
}
.segment-btn.active { background: var(--accent); color: white; }
.card {
  background: var(--surface); border-radius: 16px; padding: 16px;
  margin-bottom: 16px; border: 1px solid var(--border);
}
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.card-title { font-size: 15px; font-weight: 600; }
.card-value { font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
.donut-chart { display: flex; align-items: center; gap: 24px; }
.donut-visual { width: 120px; height: 120px; position: relative; }
.donut-svg { transform: rotate(-90deg); }
.donut-center {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;
}
.donut-total { font-family: var(--font-mono); font-size: 20px; font-weight: 700; }
.donut-label { font-size: 10px; color: var(--muted); }
.donut-legend { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-name { font-size: 12px; flex: 1; }
.legend-pct { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
.bar-chart { display: flex; align-items: flex-end; justify-content: space-between; height: 100px; padding: 0 4px; }
.bar-item { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
.bar { width: 24px; border-radius: 4px 4px 0 0; min-height: 8px; }
.bar-label { font-size: 10px; color: var(--muted); }
.bar-value { font-family: var(--font-mono); font-size: 10px; color: var(--fg); margin-top: auto; }
.rank-list { display: flex; flex-direction: column; gap: 10px; }
.rank-item { display: flex; align-items: center; gap: 12px; }
.rank-num { width: 20px; font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
.rank-bar { flex: 1; height: 28px; background: var(--surface-2); border-radius: 6px; overflow: hidden; }
.rank-fill { height: 100%; border-radius: 6px; display: flex; align-items: center; padding-left: 10px; }
.rank-name { font-size: 12px; font-weight: 500; color: white; }
.rank-val { margin-left: auto; padding-right: 10px; font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.8); }
.empty-state { padding: 20px; text-align: center; color: var(--muted); font-size: 13px; }
</style>
