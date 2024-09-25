export const routes: any = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "user" */ './components/Index.vue'),
    name: 'home.index'
  }
]
