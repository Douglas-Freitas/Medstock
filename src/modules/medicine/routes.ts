export const routes: any = [
  {
    path: '/medicine',
    component: () => import(/* webpackChunkName: "medicine" */ './components/Index.vue'),
    name: 'medicine.index'
  }
]
