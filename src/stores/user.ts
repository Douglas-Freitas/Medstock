import { defineStore } from 'pinia'
import type User from '../modules/user/types/user'

export const useUserStore = defineStore('user', {
  state: () => {
    return { user: {} as User, isAdmin: false }
  },
  getters: {
    getLoggedUser: (state) => state.user,
    getIsAdmin: (state) => state.isAdmin
  },
  actions: {
    setLoggedUser(payload: User) {
      this.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    setIsAdmin(payload: boolean) {
      this.isAdmin = payload
    }
  }
})
