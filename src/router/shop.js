import Home from '@/views/Home'
import Shop from '@/views/shop'
import test from '@/views/test'
export default [
  {
    path: '/',
    redirect: '/shop/list',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/shop/list',
        name: '商品列表',
        component: Shop,
        // component: (() => import('@/views/stock-revise')),
        meta: { title: '商品列表', classify: ['shop'] }
      },
      {
        path: '/test',
        name: 'test',
        component: test,
        // component: (() => import('@/views/stock-revise')),
        meta: { title: 'test', classify: ['test'] }
      }
    ]
  }
]