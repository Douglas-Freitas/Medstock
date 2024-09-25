export const routes: any = [
  {
    path: '/collection-point',
    component: () => import(/* webpackChunkName: "collection-point" */ './components/Index.vue'),
    name: 'collection-point.index'
  }
]
