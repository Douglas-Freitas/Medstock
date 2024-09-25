export const routes: any = [
    {
      path: '/close-expiration',
      component: () => import(/* webpackChunkName: "close-expiration" */ './components/Index.vue'),
      name: 'close-expiration.index'
    }
  ]
  