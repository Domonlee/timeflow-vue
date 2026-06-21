<template>
  <div class="page">
    <h1 class="page-title">设置</h1>

    <div class="profile-section">
      <div class="profile-avatar">李</div>
      <div class="profile-info">
        <div class="profile-name">李明</div>
        <div class="profile-email">liming@example.com</div>
      </div>
      <div class="settings-arrow">
        <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-header">账户</div>
      <div class="settings-group">
        <div class="settings-item">
          <div class="settings-icon blue">
            <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">个人资料</div>
            <div class="settings-desc">修改头像、姓名和邮箱</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-icon purple">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">隐私与安全</div>
            <div class="settings-desc">密码、生物识别、登录设备</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-header">偏好设置</div>
      <div class="settings-group">
        <div class="settings-item">
          <div class="settings-icon orange">
            <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">通知</div>
            <div class="settings-desc">计时提醒、每日总结、周报</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-icon" style="background: #ffd60a;">
            <svg viewBox="0 0 24 24"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">外观</div>
            <div class="settings-desc">{{ theme.isDark ? '深色模式' : '浅色模式' }}</div>
          </div>
          <ToggleSwitch v-model="theme.isDark.value" @update:model-value="theme.toggle()" />
        </div>
        <div class="settings-item">
          <div class="settings-icon green">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">时间格式</div>
            <div class="settings-desc">24小时制</div>
          </div>
          <div class="settings-value">24小时</div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
        <router-link to="/categories" class="settings-item">
          <div class="settings-icon" style="background: #64d2ff;">
            <svg viewBox="0 0 24 24"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">分类管理</div>
            <div class="settings-desc">9个活动分类</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </router-link>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-header">数据</div>
      <div class="settings-group">
        <div class="settings-item">
          <div class="settings-icon blue">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">iCloud 备份</div>
            <div class="settings-desc">已开启 · 上次同步 2小时前</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-icon green">
            <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">导出数据</div>
            <div class="settings-desc">CSV、JSON 格式</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-header">关于</div>
      <div class="settings-group">
        <div class="settings-item">
          <div class="settings-icon gray">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">帮助与反馈</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
        <div class="settings-item">
          <div class="settings-icon gray">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">隐私政策</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="danger-section settings-section">
      <div class="settings-group">
        <div class="settings-item">
          <div class="settings-icon red">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </div>
          <div class="settings-info">
            <div class="settings-label">删除账户</div>
            <div class="settings-desc">永久删除所有数据</div>
          </div>
          <div class="settings-arrow">
            <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="version-info">
      <div class="logo">TimeFlow</div>
      <div>版本 1.0.0 (1)</div>
      <div style="margin-top: 8px;">© 2026 TimeFlow. All rights reserved.</div>
    </div>
  </div>
</template>

<script setup>
import ToggleSwitch from '../components/ToggleSwitch.vue'
import { useTheme } from '../composables/useTheme'

const theme = useTheme()
</script>

<style scoped>
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 24px; }
.profile-section {
  display: flex; align-items: center; gap: 14px; padding: 16px;
  background: var(--surface); border-radius: 14px;
  border: 1px solid var(--border); margin-bottom: 24px;
}
.profile-avatar {
  width: 60px; height: 60px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, #5856d6 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; font-weight: 600; color: white; flex-shrink: 0;
}
.profile-info { flex: 1; }
.profile-name { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
.profile-email { font-size: 13px; color: var(--muted); }
.settings-section { margin-bottom: 24px; }
.section-header {
  font-size: 13px; font-weight: 600; color: var(--muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 8px; padding-left: 4px;
}
.settings-group {
  background: var(--surface); border-radius: 14px;
  border: 1px solid var(--border); overflow: hidden;
}
.settings-item {
  display: flex; align-items: center; padding: 14px 16px;
  cursor: pointer; transition: background 0.15s;
  border-bottom: 1px solid var(--border); text-decoration: none; color: var(--fg);
}
.settings-item:last-child { border-bottom: none; }
.settings-item:active { background: var(--surface-2); }
.settings-icon {
  width: 28px; height: 28px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  margin-right: 12px; flex-shrink: 0;
}
.settings-icon svg { width: 18px; height: 18px; fill: white; }
.settings-icon.blue { background: var(--accent); }
.settings-icon.purple { background: #5856d6; }
.settings-icon.orange { background: #ff9500; }
.settings-icon.green { background: #30d158; }
.settings-icon.red { background: var(--accent-red); }
.settings-icon.gray { background: #636366; }
.settings-info { flex: 1; }
.settings-label { font-size: 15px; font-weight: 400; }
.settings-desc { font-size: 12px; color: var(--muted); margin-top: 2px; }
.settings-value { font-size: 14px; color: var(--muted); margin-right: 8px; }
.settings-arrow { width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; }
.settings-arrow svg { width: 14px; height: 14px; fill: var(--muted); }
.danger-section .settings-item { color: var(--accent-red); }
.danger-section .settings-icon { background: var(--accent-red); }
.version-info { text-align: center; padding: 20px; color: var(--muted); font-size: 12px; }
.version-info .logo { font-size: 20px; font-weight: 700; color: var(--fg); margin-bottom: 4px; }
</style>
