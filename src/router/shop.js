import Home from '@/views/Home'
import Shop from '@/views/shop'
import CategoryManage from '@/views/category-manage'
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
        path: '/shop/category',
        name: '商品库存',
        component: CategoryManage
      }
    ]
  }
]