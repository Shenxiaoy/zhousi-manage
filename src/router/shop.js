import Home from '@/views/Home'
import Shop from '@/views/shop'
import demo from '@/views/demo'
export default [
  {
    path: '/',
    redirect: '/shop/demo',
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
        path: '/shop/demo',
        name: 'demo',
        component: demo
      }
    ]
  }
]