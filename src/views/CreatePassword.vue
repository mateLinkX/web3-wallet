<template>
  <div class="h-full">
    <!-- 顶部返回导航 -->
    <NavBack>设置钱包密码</NavBack>
    <!-- 主体内容 -->
    <div class="h-full w-full relative pt-20 px-4 pb-4 ">
      
      <div class="w-full flex flex-col gap-4">
        <div>
          <label class="label mb-0.5"><span class="label-text">密码</span></label>
          <input v-model="password" type="password" class="input input-bordered w-full" placeholder="请输入密码" autocomplete="new-password" />
        </div>
        <div>
          <label class="label  mb-0.5"><span class="label-text">确认密码</span></label>
          <input v-model="confirmPassword" type="password" class="input input-bordered w-full" placeholder="请再次输入密码" autocomplete="new-password" />
        </div>
        <div class="mt-2">
          <PasswordStrength :password="password" />
          <div v-if="password && confirmPassword && password !== confirmPassword" class="text-error text-xs mt-1 flex items-center">
            <ExclamationTriangleIcon class="w-4 h-4 mr-1" /> 两次输入密码不一致
          </div>
        </div>
        <button class="btn btn-primary mt-4" @click="onNext" :disabled="!canNext">下一步</button>
        <div class="text-sm text-gray-400 text-center mt-2">
          <span>密码至少8位，至少包含字母和数字</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import PasswordStrength from '@/components/PasswordStrength.vue'
import { useWalletCreationStore } from '@/store/modules/walletCreation'
import NavBack from '@/components/NavBack.vue'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const walletCreation = useWalletCreationStore()

const canNext = computed(() => {
  return password.value.length >= 8 &&
    /\d/.test(password.value) &&
    /[^A-Za-z0-9]/.test(password.value) &&
    password.value === confirmPassword.value
})
function onNext() {
  if (!canNext.value) return
  walletCreation.setPassword(password.value)
  router.push('/create/mnemonic')
}
</script>
