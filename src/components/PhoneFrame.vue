<template>
  <div class="phone-frame">
    <div class="screen">
      <div class="main-content" :style="{ paddingBottom: hasTabBar ? '100px' : '40px' }">
        <slot />
      </div>
      <slot name="tabbar" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  hasTabBar: { type: Boolean, default: true }
})
</script>

<style scoped>
.phone-frame {
  width: 100%;
  min-height: 100vh;
  background: var(--surface);
  position: relative;
}
.screen {
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background 0.3s;
}
.main-content {
  padding: 12px 20px 40px;
  flex: 1;
  overflow-y: auto;
}
.main-content::-webkit-scrollbar { display: none; }
</style>
