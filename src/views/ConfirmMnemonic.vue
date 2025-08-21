
<template>
  <div class="h-full">
    <!-- 顶部返回导航 -->
    <NavBack>确认助记词</NavBack>
    <!-- 主体内容 -->
    <div class="h-full w-full relative pt-20 px-4 pb-4 flex flex-col items-center">
      <div class="w-full max-w-md flex flex-col gap-6">
        <div class="mb-2">
          <div class="flex items-center mb-2">
            <QuestionMarkCircleIcon class="w-5 h-5 text-primary mr-2" />
            <span class="font-semibold text-base-content">请按顺序输入下列位置的助记词，验证你已正确备份：</span>
          </div>
          <div class="flex gap-2 mt-2">
            <span v-for="idx in indexes" :key="idx" class="badge badge-primary badge-outline">{{ idx + 1 }}</span>
          </div>
        </div>
        <form @submit.prevent="onConfirm" class="flex flex-col gap-4">
          <div v-for="(idx, i) in indexes" :key="idx" class="flex items-center gap-2">
            <span class="w-8 text-right text-base-content/60">{{ idx + 1 }}.</span>
            <input
              v-model="inputs[i]"
              type="text"
              class="input input-bordered flex-1"
              :placeholder="`请输入第 ${idx + 1} 个单词`"
              autocomplete="off"
              @input="onInput(i)"
            />
            <CheckCircleIcon v-if="inputs[i] && isCorrect(i)" class="w-5 h-5 text-success ml-1" />
            <XCircleIcon v-else-if="inputs[i] && !isCorrect(i)" class="w-5 h-5 text-error ml-1" />
          </div>
          <button class="btn btn-primary mt-2" type="submit" :disabled="!allCorrect">确认</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWalletCreationStore } from '@/store/modules/walletCreation'
import NavBack from '@/components/NavBack.vue'
import { getRandomMnemonicIndexes } from '@/utils/mnemonic'
import { QuestionMarkCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const walletCreation = useWalletCreationStore()

const mnemonicArr = ref<string[]>([])
const indexes = ref<number[]>([])
const inputs = ref<string[]>([])

onMounted(() => {
  if (!walletCreation.password) {
    // 没有密码，跳转回创建
    router.replace('/create/password')
    return
  }
  if (!walletCreation.mnemonic) {
    // 没有助记词，跳转回创建
    router.replace('/create/mnemonic')
    return
  }
  
  mnemonicArr.value = walletCreation.mnemonic.split(' ')
  // 随机抽查3-4个
  indexes.value = getRandomMnemonicIndexes(mnemonicArr.value.length, mnemonicArr.value.length >= 24 ? 4 : 3)
  inputs.value = Array(indexes.value.length).fill('')
})

function isCorrect(i: number) {
  return (
    inputs.value[i]?.trim().toLowerCase() === mnemonicArr.value[indexes.value[i]]
  )
}

const allCorrect = computed(() => {
  return indexes.value.length > 0 && indexes.value.every((_, i) => isCorrect(i))
})

function onInput(i: number) {
  // 只允许小写字母
  inputs.value[i] = inputs.value[i].replace(/[^a-z]/g, '')
}

function onConfirm() {
  if (!allCorrect.value) return
  // TODO: 生成钱包、加密私钥、持久化、清理敏感数据、跳转首页
  // 这里只做跳转演示
  router.push('/home')
}
</script>
