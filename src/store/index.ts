import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const store = createPinia()
store.use(piniaPluginPersistedstate)



const modules = import.meta.glob('./modules/*.ts', { eager: true })
const stores: Record<string, any> = {}

for (const path in modules) {
  const mod = modules[path] as Record<string, any>
  Object.keys(mod).forEach((key) => {
    if (key.startsWith('use') && key.endsWith('Store')) {
      stores[key] = mod[key]
    }
  })
}

export function setupStore(app: App) {
  app.use(store)
}
export default store