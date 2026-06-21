<template>
  <nav class="tab-bar">
    <router-link v-for="tab in tabs" :key="tab.route"
      :to="tab.route"
      class="tab-item"
      :class="{ active: $route.path === tab.route }">
      <div class="tab-icon" v-html="tab.icon"></div>
      <span class="tab-label">{{ tab.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
const tabs = [
  {
    route: '/',
    label: '今天',
    icon: '<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>'
  },
  {
    route: '/timeline',
    label: '时间线',
    icon: '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
  },
  {
    route: '/stats',
    label: '统计',
    icon: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>'
  },
  {
    route: '/insights',
    label: '洞察',
    icon: '<svg viewBox="0 0 24 24"><path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 21.55 13.54 23 15 23c1.45 0 2.27-1.44 1.93-2.52l3.56-4.55C21.56 16.26 23 15.45 23 14c0-1.1-.9-2-2-2z"/></svg>'
  },
  {
    route: '/settings',
    label: '设置',
    icon: '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'
  },
]
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 83px;
   background: var(--tab-bar-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 8px;
  z-index: 50;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  cursor: pointer;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-icon svg {
  width: 24px;
  height: 24px;
  fill: var(--muted);
}
.tab-item.active .tab-icon svg {
  fill: var(--accent);
}
.tab-label {
  font-size: 10px;
  color: var(--muted);
}
.tab-item.active .tab-label {
  color: var(--accent);
}
</style>
