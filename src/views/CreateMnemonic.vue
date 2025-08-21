<template>
  <div class="h-full">
    <!-- 顶部返回导航 -->
    <NavBack>备份助记词</NavBack>
    <!-- 主体内容 -->
    <div class="h-full w-full relative pt-20 px-4 pb-4 flex flex-col items-center">
      <div class="w-full mb-4 flex items-center justify-between">
        <div class="flex-1">
          <div class="grid grid-cols-3 md:grid-cols-4 gap-2">
            <div v-for="(word, idx) in mnemonicArr" :key="idx" class="bg-base-100 rounded px-2 py-1 text-center text-base-content border border-base-300 flex items-center justify-center">
              <span class="text-xs text-base-content/60 mr-1">{{ idx + 1 }}.</span> <span class="font-mono">{{ word }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center bg-warning/20 border border-warning rounded p-3 mb-4 w-full">
        <ExclamationTriangleIcon class="w-5 h-5 text-warning mr-2" />
        <span class="text-warning font-semibold">切勿截图！务必用笔抄写在纸上并妥善保管！</span>
      </div>
      <button class="btn btn-primary w-full mt-2" @click="onNext">我已妥善备份，下一步</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useWalletCreationStore } from '@/store/modules/walletCreation'
import { generateMnemonic } from '@scure/bip39'
import { wordlist as englishWords } from '@scure/bip39/wordlists/english'
import NavBack from '@/components/NavBack.vue'

const router = useRouter()
const walletCreation = useWalletCreationStore()
const mnemonic = ref('')

const mnemonicArr = ref<string[]>([])


function generateAndSetMnemonic() {
  mnemonic.value = generateMnemonic(englishWords, 128)
  walletCreation.setMnemonic(mnemonic.value)
  mnemonicArr.value = mnemonic.value.split(' ')
}


onMounted(() => {
  // 只生成一次助记词
  if (!walletCreation.mnemonic) {
    generateAndSetMnemonic()
  } else {
    mnemonic.value = walletCreation.mnemonic
    mnemonicArr.value = mnemonic.value.split(' ')
  }
})

function onNext() {
  router.push('/create/confirm-mnemonic')
}
</script>
