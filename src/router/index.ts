import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/store/modules/app'

// 读取模块下的路由文件
const moduleFiles = import.meta.glob('./modules/*.ts', { eager: true })

// 转换成路由
const mapModuleRouterList = (modules: Record<string, unknown>): Array<RouteRecordRaw> => {
  const routerList: Array<RouteRecordRaw> = []
  Object.keys(modules).forEach((key) => {
    const mod = (modules[key] as { default: unknown }).default || {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routerList.push(...modList)
  })
  return routerList
}
const allRoutes = mapModuleRouterList(moduleFiles)




// 创建router
const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    }
  }
})


router.beforeEach((to, _, next) => {
  const appStore = useAppStore()
  // 如果没有钱包信息，且不是在欢迎页，则跳转到欢迎页
  if (appStore.showWelcome && to.path === '/') {
    next({ path: '/welcome' })
  } else {
    next()
  }
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router



