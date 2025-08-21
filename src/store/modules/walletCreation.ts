import { defineStore } from 'pinia'

export const useWalletCreationStore = defineStore('walletCreation', {
    state: () => ({
        password: '',
        mnemonic: '',
    }),
    actions: {
        setPassword(pwd: string) {
            this.password = pwd
        },
        setMnemonic(mnemonic: string) {
            this.mnemonic = mnemonic
        },
        clear() {
            this.password = ''
            this.mnemonic = ''
        },
    },
})
