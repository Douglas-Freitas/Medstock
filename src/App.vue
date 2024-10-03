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
import type Medicine from '../src/modules/medicine/types/medicine'
import medicineAPI from '@/modules/medicine/API/medicineAPI'
declare var cordova: any;

export default {
  data() {
    return {
      drawer: false,
      imgUrl: new URL('@/assets/logo.png', import.meta.url).href,
      isAdminUser: false,
      medicine: {} as Medicine,
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

    document.addEventListener('deviceready', this.setupNotificationListener, false);
  },
  methods:{
    setupNotificationListener() {
      cordova.plugins.notification.local.on('click', this.handleNotificationClick);
    },

    decreaseStock(item:Medicine){
      alert('tentando decremento')
      item.quantity -= 1

      if(item.quantity == 0){
        cordova.plugins.notification.local.cancel(item.id, function() {
          console.log(`Notificação com ID ${item.id} cancelada.`);
        });

        medicineAPI.delete(item.id)
      }
      else
        medicineAPI.update(item)
    },

    handleNotificationClick(notification : any) {
      alert("notificatio ID: " + notification.id)
      if(notification.id){
        medicineAPI.getById(notification.id).then((resp: any) => {
          this.medicine = resp.data
          this.decreaseStock(this.medicine);
        })
        .catch((error: any) => {
          alert(error);
        });
      }
    },
  }
}
</script>

<style lang="css">
@import './style.css';
</style>
