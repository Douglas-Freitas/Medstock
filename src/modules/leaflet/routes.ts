export const routes: any = [
  {
    path: '/leaflet/',
    component: () => import(/* webpackChunkName: "leaflet" */ './components/Index.vue'),
    name: 'leaflet.index'
  }
]
