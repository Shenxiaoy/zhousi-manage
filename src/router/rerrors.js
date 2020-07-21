export default [
  {
    path: '/404',
    name: 'Page404',
    meta: { classify: ['error', '404'] },
    component: () => import('@/views/errors/404')
  },
  {
    path: '/401',
    name: 'Page401',
    meta: { classify: ['error', '401'] },
    component: () => import('@/views/errors/401')
  },
  {
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }
]
