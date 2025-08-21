<template>
  <div class="w-full flex flex-col gap-1">
    <div class="text-sm" :class="textClass">{{ strengthText }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ password: string }>()

const percent = computed(() => {
  let score = 0
  if (props.password.length >= 8) score++
  if (/[A-Z]/.test(props.password)) score++
  if (/[a-z]/.test(props.password)) score++
  if (/\d/.test(props.password)) score++
  if (/[^A-Za-z0-9]/.test(props.password)) score++
  return (score / 5) * 100
})

const strengthText = computed(() => {
  if (percent.value === 100) return '强'
  if (percent.value >= 60) return '中等'
  if (percent.value > 0) return '弱'
  return ''
})

const textClass = computed(() => {
  if (percent.value === 100) return 'text-green-500'
  if (percent.value >= 60) return 'text-yellow-500'
  if (percent.value > 0) return 'text-red-500'
  return ''
})
</script>
