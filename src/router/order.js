import Home from '@/views/Home'
import StockRevise from '@/views/stock-revise'
import test from '@/views/test'
export default [
  {
    path: '/',
    redirect: '/stock-revise',
    name: 'home',
    meta: { title: '库存管理', classify: ['home'] },
    component: Home,
    children: [
      {
        path: '/stock-revise',
        name: '库存维护',
        component: StockRevise,
        // component: (() => import('@/views/stock-revise')),
        meta: { title: '订单管理', classify: ['order'] }
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