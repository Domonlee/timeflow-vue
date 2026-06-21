import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const RECORDS_KEY = 'timeflow-records'
const TIMER_KEY = 'timeflow-timer-state'

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}小时${m}分钟`
  return `${m}分钟`
}

function formatDurationShort(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h${m}m`
  if (m > 0) return `${m}m`
  const s = seconds % 60
  return `${s}s`
}

function formatHHMM(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

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

function dateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export const useActivityStore = defineStore('activity', () => {
  const categories = ref([
    { id: 'work',     name: '工作', color: '#5856d6', icon: 'briefcase' },
    { id: 'run',      name: '跑步', color: '#32d74b', icon: 'run' },
    { id: 'read',     name: '阅读', color: '#ff9500', icon: 'book' },
    { id: 'write',    name: '写作', color: '#af52de', icon: 'pencil' },
    { id: 'study',    name: '学习', color: '#007aff', icon: 'study' },
    { id: 'game',     name: '游戏', color: '#ff3b30', icon: 'game' },
    { id: 'family',   name: '家庭', color: '#ff2d55', icon: 'family' },
    { id: 'sport',    name: '运动', color: '#30d158', icon: 'sport' },
    { id: 'rest',     name: '休息', color: '#64d2ff', icon: 'rest' },
  ])

  const records = ref([])
  const timerElapsed = ref(0)
  const timerIsRunning = ref(false)
  const timerCategoryId = ref('work')
  let timerInterval = null

  function getCategory(id) {
    return categories.value.find(c => c.id === id) || categories.value[0]
  }

  function setCurrentCategory(id) {
    timerCategoryId.value = id
  }

  function loadRecords() {
    const saved = localStorage.getItem(RECORDS_KEY)
    if (saved) {
      try { records.value = JSON.parse(saved) } catch { records.value = [] }
    } else {
      records.value = []
    }
  }

  function saveRecords() {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records.value))
  }

  function addRecord(record) {
    records.value.push(record)
    saveRecords()
  }

  function loadTimerState() {
    const saved = localStorage.getItem(TIMER_KEY)
    if (saved) {
      try {
        const state = JSON.parse(saved)
        timerCategoryId.value = state.categoryId || 'work'
        timerElapsed.value = state.elapsed || 0
        if (state.running) {
          const elapsedSince = Math.floor((Date.now() - state.savedAt) / 1000)
          timerElapsed.value += elapsedSince
          startTimerInterval()
        }
      } catch {}
    }
  }

  function saveTimerState() {
    localStorage.setItem(TIMER_KEY, JSON.stringify({
      categoryId: timerCategoryId.value,
      elapsed: timerElapsed.value,
      running: timerIsRunning.value,
      savedAt: Date.now(),
    }))
  }

  function startTimerInterval() {
    if (timerInterval) clearInterval(timerInterval)
    timerIsRunning.value = true
    timerInterval = setInterval(() => {
      timerElapsed.value++
      saveTimerState()
    }, 1000)
  }

  function startTimer() {
    if (timerIsRunning.value) return
    startTimerInterval()
    saveTimerState()
  }

  function pauseTimer() {
    timerIsRunning.value = false
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
    saveTimerState()
  }

  function stopTimer() {
    const duration = timerElapsed.value
    if (duration > 0) {
      const now = new Date()
      const startDate = new Date(now.getTime() - duration * 1000)
      addRecord({
        id: generateId(),
        categoryId: timerCategoryId.value,
        date: todayStr(),
        startTime: formatHHMM(startDate),
        endTime: formatHHMM(now),
        duration,
        createdAt: Date.now(),
      })
    }
    pauseTimer()
    timerElapsed.value = 0
    saveTimerState()
    localStorage.removeItem(TIMER_KEY)
  }

  const timerFormatted = computed(() => {
    const h = Math.floor(timerElapsed.value / 3600)
    const m = Math.floor((timerElapsed.value % 3600) / 60)
    const s = timerElapsed.value % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  })

  const todayRecords = computed(() =>
    records.value.filter(r => r.date === todayStr())
  )

  const todayTotal = computed(() => {
    const total = todayRecords.value.reduce((sum, r) => sum + r.duration, 0) + timerElapsed.value
    return formatDuration(total)
  })

  const todayActivityCount = computed(() =>
    todayRecords.value.length
  )

  const todayRecentActivities = computed(() =>
    todayRecords.value.slice(-5).reverse()
  )

  const todayTimeline = computed(() =>
    todayRecords.value.slice().sort((a, b) => b.startTime.localeCompare(a.startTime))
  )

  const todaySummary = computed(() => {
    const cats = new Set(todayRecords.value.map(r => r.categoryId))
    const total = todayRecords.value.reduce((sum, r) => sum + r.duration, 0) + timerElapsed.value
    return {
      total: formatDurationShort(total),
      activities: todayRecords.value.length,
      categories: cats.size,
    }
  })

  const weekData = computed(() => {
    const { start, end } = getWeekRange()
    const weekRecords = records.value.filter(r => {
      const d = new Date(r.date)
      return d >= start && d <= end
    })
    const dayNames = ['一', '二', '三', '四', '五', '六', '日']
    return dayNames.map((label, i) => {
      const dayDate = new Date(start)
      dayDate.setDate(start.getDate() + i)
      const ds = dateStr(dayDate)
      const dayTotal = weekRecords.filter(r => r.date === ds).reduce((s, r) => s + r.duration, 0)
      const maxTotal = 36000
      return {
        label,
        value: formatDurationShort(dayTotal),
        height: Math.max(5, Math.round((dayTotal / maxTotal) * 100)) + '%',
      }
    })
  })

  const categoryDistribution = computed(() => {
    const { start, end } = getWeekRange()
    const weekRecords = records.value.filter(r => {
      const d = new Date(r.date)
      return d >= start && d <= end
    })
    const totals = {}
    let grandTotal = 0
    weekRecords.forEach(r => {
      totals[r.categoryId] = (totals[r.categoryId] || 0) + r.duration
      grandTotal += r.duration
    })
    const catList = categories.value.map(c => {
      const val = totals[c.id] || 0
      return {
        ...c,
        value: val,
        pct: grandTotal > 0 ? Math.round((val / grandTotal) * 100) + '%' : '0%',
      }
    }).filter(c => c.value > 0).sort((a, b) => b.value - a.value)
    return {
      items: catList,
      total: formatDurationShort(grandTotal),
      grandTotal,
    }
  })

  const categoryRanking = computed(() => {
    const { items } = categoryDistribution.value
    const maxVal = items.length > 0 ? items[0].value : 1
    return items.map(item => ({
      ...item,
      width: Math.round((item.value / maxVal) * 100) + '%',
      time: formatDuration(item.value),
    }))
  })

  const streakDays = computed(() => {
    let count = 0
    const today = new Date()
    const checkDate = new Date(today)
    while (true) {
      const ds = dateStr(checkDate)
      const hasRecord = records.value.some(r => r.date === ds)
      if (hasRecord) {
        count++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }
    return count
  })

  const weekTotal = computed(() => {
    const { start, end } = getWeekRange()
    return records.value
      .filter(r => {
        const d = new Date(r.date)
        return d >= start && d <= end
      })
      .reduce((sum, r) => sum + r.duration, 0)
  })

  const prevWeekTotal = computed(() => {
    const { start } = getWeekRange()
    const prevStart = new Date(start)
    prevStart.setDate(prevStart.getDate() - 7)
    const prevEnd = new Date(start)
    prevEnd.setDate(prevEnd.getDate() - 1)
    return records.value
      .filter(r => {
        const d = new Date(r.date)
        return d >= prevStart && d <= prevEnd
      })
      .reduce((sum, r) => sum + r.duration, 0)
  })

  const weekComparison = computed(() => {
    const cur = weekTotal.value
    const prev = prevWeekTotal.value
    if (prev === 0) return { label: '+0%', direction: 'up', diff: '0' }
    const pct = Math.round(((cur - prev) / prev) * 100)
    return {
      label: (pct >= 0 ? '+' : '') + pct + '%',
      direction: pct >= 0 ? 'up' : 'down',
      diff: formatDurationShort(Math.abs(cur - prev)),
    }
  })

  const mostFocusedDay = computed(() => {
    const { start, end } = getWeekRange()
    const dayTotals = {}
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const ds = dateStr(d)
      dayTotals[ds] = 0
    }
    records.value
      .filter(r => {
        const d = new Date(r.date)
        return d >= start && d <= end
      })
      .forEach(r => { dayTotals[r.date] = (dayTotals[r.date] || 0) + r.duration })
    let maxDay = null, maxVal = 0
    Object.entries(dayTotals).forEach(([date, val]) => {
      if (val > maxVal) { maxVal = val; maxDay = date }
    })
    if (!maxDay) return { name: '—', value: '0h' }
    const days = ['日', '一', '二', '三', '四', '五', '六']
    const d = new Date(maxDay)
    return { name: '周' + days[d.getDay()], value: formatDurationShort(maxVal) }
  })

  return {
    categories,
    records,
    timerElapsed,
    timerIsRunning,
    timerCategoryId,
    timerFormatted,
    getCategory,
    setCurrentCategory,
    loadRecords,
    addRecord,
    loadTimerState,
    startTimer,
    pauseTimer,
    stopTimer,
    todayRecords,
    todayTotal,
    todayActivityCount,
    todayRecentActivities,
    todayTimeline,
    todaySummary,
    weekData,
    categoryDistribution,
    categoryRanking,
    streakDays,
    weekTotal,
    weekComparison,
    mostFocusedDay,
  }
})
