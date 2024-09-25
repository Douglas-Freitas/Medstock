<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span>
          <v-img :src="imgUrl" width="350px"> </v-img>
        </span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <!-- <v-list-item to="/user" v-if="isAdminUser">
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item> -->

        <v-list-item to="/medicine">
          <v-list-item-title>Medicamentos</v-list-item-title>
        </v-list-item>

        <v-list-item to="/close-expiration">
          <v-list-item-title>Proximos Do Vencimento</v-list-item-title>
        </v-list-item>

        <v-list-item to="/leaflet">
          <v-list-item-title>Bulário</v-list-item-title>
        </v-list-item>

        <v-list-item to="/collection-point">
          <v-list-item-title>Pontos de Coleta</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer color="primary">
      <p>Todos os Direitos Reservados</p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      drawer: false,
      imgUrl: new URL('@/assets/logo.png', import.meta.url).href,
      isAdminUser: false
    }
  },
  mounted() {
    const store = useUserStore()
    //const localUser = localStorage.getItem('user')
    const localUser = '{ "id": "1",      "mail": "test", "password": "123", "roule": { "name": "Administrador" }}'
    
    if (localUser) {
      store.setLoggedUser(JSON.parse(localUser))
      store.setIsAdmin(JSON.parse(localUser).roule.name == 'Administrador')
      this.isAdminUser = JSON.parse(localUser).roule.name == 'Administrador'
    } else {
      //this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="css">
@import './style.css';
</style>
