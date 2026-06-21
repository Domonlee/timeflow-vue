<template>
  <PhoneFrame>
    <router-view />
    <template #tabbar>
      <TabBar v-if="$route.path !== '/timer' && $route.path !== '/categories'" />
    </template>
  </PhoneFrame>
</template>

<script setup>
import { onMounted } from 'vue'
import { useActivityStore } from './stores/activity'
import PhoneFrame from './components/PhoneFrame.vue'
import TabBar from './components/TabBar.vue'

const store = useActivityStore()

onMounted(() => {
  store.loadRecords()
  store.loadTimerState()
})
</script>
