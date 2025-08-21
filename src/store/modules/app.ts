import { defineStore } from 'pinia'

interface appState {
  showWelcome: boolean
}

export const useAppStore = defineStore(
  'app',
  {
    state: (): appState => ({
      showWelcome: true
    }),
    getters: {},
    actions: {},
    persist: {
      pick: ['showWelcome'],
    }
  },
)
