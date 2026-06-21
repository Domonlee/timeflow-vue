<template>
  <div class="toggle" :class="{ active: modelValue }" @click="$emit('update:modelValue', !modelValue)"></div>
</template>

<script setup>
defineProps({ modelValue: Boolean })
defineEmits(['update:modelValue'])
</script>

<style scoped>
.toggle {
  width: 51px;
  height: 31px;
  background: #39393d;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.toggle.active {
  background: var(--accent);
}
.toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}
.toggle.active::after {
  transform: translateX(20px);
}
</style>
