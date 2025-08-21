
<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <!-- Logo -->
    <div class="mb-8">
      <img src="/vite.svg" alt="Logo" class="w-24 h-24" />
    </div>
    <!-- 欢迎文案 -->
    <h1 class="text-3xl font-bold text-primary mb-4">欢迎使用 Web3 钱包</h1>
    <p class="text-base-content mb-8">安全、去中心化的钱包体验，从这里开始。</p>
    <!-- 按钮区 -->
    <div class="flex flex-col gap-4 w-64">
      <button class="btn btn-primary w-full flex items-center justify-center" @click="goCreate">
        <ArrowRightIcon class="w-5 h-5 mr-2" />创建钱包
      </button>
      <button class="btn btn-outline w-full flex items-center justify-center" @click="goImport">
        <ArrowDownTrayIcon class="w-5 h-5 mr-2" />导入钱包
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'
import { ArrowRightIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

function goCreate() {
  router.push('/create/password')
  console.log('goCreate')
}
function goImport() {
  router.push('/import/mnemonic')
}
</script>

<style scoped>
</style>
