<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col sm="8" offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="4">
        <v-card class="elevation-12">
          <v-form lazy-validation @submit.prevent="loadUser">
            <v-card-text>
              <span>
                <v-img :src="imgUrl" width="350px"> </v-img>
              </span>
              <v-text-field
                label="Usuário"
                name="login"
                type="text"
                v-model="payload.mail"
                :rules="userRules"
                required
                background-color="white"
                solo
              ></v-text-field>

              <v-text-field
                id="password"
                label="Senha"
                name="password"
                type="password"
                v-model="payload.password"
                :rules="passwordRules"
                required
                background-color="white"
                solo
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-row>
                <v-col>
                  <div class="text-center">
                    <v-btn color="primary" type="submit">Entrar</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import userAPI from '@/modules/user/API/userAPI'
import type User from '../types/user'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

export default {
  data() {
    return {
      payload: {} as User,
      user: {} as User,
      passwordRules: [(v : string) => !!v || 'O campo senha é obrigatório'],
      userRules: [(v : string) => !!v || 'O campo usuário é obrigatório'],
      imgUrl: new URL('@/assets/logo.png', import.meta.url).href
    }
  },
  methods: {
    loadUser() {
      userAPI.login().then((resp: any) => {
        let users = resp.data
        this.user = users.filter((us: User) => {
          return us.mail == this.payload.mail && us.password == this.payload.password
        })[0]

        if (this.user) {
          this.payload = this.user
          store.setLoggedUser(this.user)
          //this.$router.push('.././')
        } else {
          console.log('Usuário não encontrado')
        }
      })
    }
  }
}
</script>
