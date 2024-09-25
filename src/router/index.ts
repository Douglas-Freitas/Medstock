import { createRouter, createWebHistory } from 'vue-router'
import { routes as collectionPoint } from '@/modules/collection-point/routes'
import { routes as home } from '@/modules/home/routes'
import { routes as leaflet } from '@/modules/leaflet/routes'
import { routes as medicine } from '@/modules/medicine/routes'
import { routes as user } from '@/modules/user/routes'
import { routes as closeExpiration } from '@/modules/close-expiration/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...home, ...collectionPoint, ...leaflet, ...medicine, ...user, ...closeExpiration]
})

export default router
