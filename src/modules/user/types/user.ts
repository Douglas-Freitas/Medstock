import type Roule from './roule'

export default interface User {
  id: string
  name: string
  mail: string
  password: string
  roule: Roule
  admin: boolean
}
