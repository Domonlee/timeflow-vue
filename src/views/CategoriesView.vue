<template>
  <div class="page">
    <nav class="nav-header">
      <router-link to="/settings" class="back-btn">
        <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        <span>设置</span>
      </router-link>
    </nav>
    <h1 class="page-title">分类管理</h1>
    <p class="page-subtitle">管理你的活动分类，自定义图标和颜色</p>

    <div class="section-header">
      <span class="section-title">当前分类</span>
      <div class="add-btn">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        <span>新建</span>
      </div>
    </div>
    <div class="category-list">
      <div v-for="cat in store.categories" :key="cat.id" class="category-item">
        <div class="category-icon-wrap" :class="cat.id">
          <icon-component :name="cat.icon" color="white" size="24" />
        </div>
        <div class="category-info">
          <div class="category-name">{{ cat.name }}</div>
          <div class="category-stats">本周 0h · 0次</div>
        </div>
        <div class="category-drag">
          <svg viewBox="0 0 24 24"><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </div>
    </div>

    <div class="section-header">
      <span class="section-title">颜色选择</span>
    </div>
    <div class="color-picker">
      <div v-for="c in colorSwatches" :key="c.id"
        class="color-swatch"
        :class="[c.id, { selected: selectedColor === c.id }]"
        @click="selectedColor = c.id">
      </div>
    </div>

    <div class="preset-section">
      <div class="section-header">
        <span class="section-title">图标预设</span>
      </div>
      <div class="preset-grid">
        <div v-for="cat in store.categories" :key="cat.id"
          class="preset-item"
          :style="{ background: cat.color + '26' }">
          <div class="preset-icon" :style="{ background: cat.color }">
            <icon-component :name="cat.icon" color="white" size="24" />
          </div>
          <span class="preset-name">{{ cat.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useActivityStore } from '../stores/activity'
import IconComponent from '../components/IconComponent.vue'

const store = useActivityStore()
const selectedColor = ref('work')

const colorSwatches = [
  { id: 'work' }, { id: 'run' }, { id: 'read' }, { id: 'write' },
  { id: 'study' }, { id: 'game' }, { id: 'family' }, { id: 'sport' },
  { id: 'rest' }, { id: 'orange' }, { id: 'pink' }, { id: 'cyan' },
  { id: 'yellow' },
]
</script>

<style scoped>
.nav-header { display: flex; align-items: center; margin-bottom: 20px; }
.back-btn { display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 15px; text-decoration: none; }
.back-btn svg { width: 20px; height: 20px; fill: var(--accent); }
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
.page-subtitle { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.section-title {
  font-size: 13px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px;
}
.add-btn { display: flex; align-items: center; gap: 4px; color: var(--accent); font-size: 13px; font-weight: 500; cursor: pointer; }
.add-btn svg { width: 18px; height: 18px; fill: var(--accent); }
.category-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.category-item {
  display: flex; align-items: center; gap: 14px; padding: 14px;
  background: var(--surface); border-radius: 14px;
  border: 1px solid var(--border); cursor: pointer; transition: background 0.15s;
}
.category-item:active { background: var(--surface-2); }
.category-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.category-icon-wrap svg { fill: white; }
.category-icon-wrap.work { background: var(--cat-work); }
.category-icon-wrap.run { background: var(--cat-run); }
.category-icon-wrap.read { background: var(--cat-read); }
.category-icon-wrap.write { background: var(--cat-write); }
.category-icon-wrap.study { background: var(--cat-study); }
.category-icon-wrap.game { background: var(--cat-game); }
.category-icon-wrap.family { background: var(--cat-family); }
.category-icon-wrap.sport { background: var(--cat-sport); }
.category-icon-wrap.rest { background: var(--cat-rest); }
.category-info { flex: 1; }
.category-name { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.category-stats { font-size: 12px; color: var(--muted); }
.category-drag { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; }
.category-drag svg { width: 16px; height: 16px; fill: var(--muted); }
.color-picker {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;
  padding: 14px; background: var(--surface); border-radius: 14px;
  border: 1px solid var(--border);
}
.color-swatch {
  width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
  border: 2px solid transparent; transition: transform 0.15s, border-color 0.15s;
}
.color-swatch:active { transform: scale(0.9); }
.color-swatch.selected { border-color: white; }
.color-swatch.work { background: var(--cat-work); }
.color-swatch.run { background: var(--cat-run); }
.color-swatch.read { background: var(--cat-read); }
.color-swatch.write { background: var(--cat-write); }
.color-swatch.study { background: var(--cat-study); }
.color-swatch.game { background: var(--cat-game); }
.color-swatch.family { background: var(--cat-family); }
.color-swatch.sport { background: var(--cat-sport); }
.color-swatch.rest { background: var(--cat-rest); }
.color-swatch.orange { background: #ff9500; }
.color-swatch.pink { background: #ff2d55; }
.color-swatch.cyan { background: #64d2ff; }
.color-swatch.yellow { background: #ffd60a; }
.preset-section { margin-bottom: 24px; }
.preset-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.preset-item {
  aspect-ratio: 1; border-radius: 12px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  cursor: pointer; border: 1px solid var(--border); transition: transform 0.15s;
}
.preset-item:active { transform: scale(0.95); }
.preset-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.preset-icon svg { width: 24px; height: 24px; fill: white; }
.preset-name { font-size: 10px; color: var(--fg); }
</style>
