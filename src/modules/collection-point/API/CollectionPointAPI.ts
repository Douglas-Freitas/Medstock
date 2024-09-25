import baseAPI from '@/http'
import type CollectionPoint from '../types/CollectionPoint'

const router = 'collection-point'

class CollectionPointAPI {
  list(): Promise<CollectionPoint> {
    return baseAPI.get(router)
  }

  save(user: CollectionPoint): Promise<any> {
    return baseAPI.post(router, user)
  }

  update(point: CollectionPoint): Promise<any> {
    return baseAPI.put(`${router}/${point.id}`, point)
  }

  delete(id: any): Promise<any> {
    return baseAPI.delete(`${router}/${id}`)
  }
}

export default new CollectionPointAPI()
