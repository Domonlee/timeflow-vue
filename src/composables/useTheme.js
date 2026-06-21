import { ref, watch } from 'vue'

const STORAGE_KEY = 'timeflow-theme'
const isDark = ref(localStorage.getItem(STORAGE_KEY) === 'dark')

function applyTheme(dark) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

applyTheme(isDark.value)

function toggle() {
  isDark.value = !isDark.value
}

watch(isDark, (val) => {
  localStorage.setItem(STORAGE_KEY, val ? 'dark' : 'light')
  applyTheme(val)
})

export function useTheme() {
  return { isDark, toggle }
}
