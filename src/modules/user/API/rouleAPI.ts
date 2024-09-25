import baseAPI from '@/http'
import type Roule from '../types/roule'

const router = 'roule'

class RouleAPI {
  list(): Promise<Roule> {
    return baseAPI.get(`${router}`)
  }
}

export default new RouleAPI()
