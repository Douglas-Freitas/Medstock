export const routes: any = [
  {
    path: '/user/',
    component: () => import(/* webpackChunkName: "user" */ './components/Index.vue'),
    name: 'user.index'
  },
  {
    path: '/user/login',
    component: () => import(/* webpackChunkName: "user" */ './components/Login.vue'),
    name: 'user.login'
  }
]
