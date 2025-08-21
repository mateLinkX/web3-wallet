<template>
  <div class="fixed w-full h-12 flex items-center z-50">
      <button class="btn btn-ghost btn-circle" @click="goBack">
        <ArrowLeftIcon class="w-6 h-6 text-primary" />
      </button>
      <div class="text-xl font-bold text-center flex-1"><slot></slot></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
function goBack() {
  router.back()
}
</script>
