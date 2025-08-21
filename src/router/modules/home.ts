// src/router/modules/welcome.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresWallet: true }, // 需要已存在钱包
    },
];

export default routes;