// src/router/modules/welcome.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: { requiresNoWallet: true }, // 没有钱包时可访问
    },
    {
        path: '/create/password',
        name: 'CreatePassword',
        component: () => import('@/views/CreatePassword.vue'),
        meta: { requiresNoWallet: true },
    },
    {
        path: '/create/mnemonic',
        name: 'CreateMnemonic',
        component: () => import('@/views/CreateMnemonic.vue'),
        meta: { requiresNoWallet: true },
    },
    {
        path: '/create/confirm-mnemonic',
        name: 'ConfirmMnemonic',
        component: () => import('@/views/ConfirmMnemonic.vue'),
        meta: { requiresNoWallet: true },
    },
    {
        path: '/import/mnemonic',
        name: 'ImportMnemonic',
        component: () => import('@/views/ImportMnemonic.vue'),
        meta: { requiresNoWallet: true },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresWallet: true }, // 需要已存在钱包
    },
];

export default routes;