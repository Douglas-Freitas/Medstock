import baseAPI from '@/http'
import type User from '../types/user'

const router = 'user'

class UserAPI {
  list(): Promise<User> {
    return baseAPI.get(router)
  }

  save(user: User): Promise<any> {
    return baseAPI.post(router, user)
  }

  login(): Promise<User> {
    return baseAPI.get(router)
  }
}

export default new UserAPI()
