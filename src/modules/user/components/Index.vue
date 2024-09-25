<template>
  <v-container>
    <v-row>
      <v-col>
        <span>Lista de Usuários</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
          item-value="name"
          no-data-text="Nenhum usuário retornado"
          items-per-page-text="Usuários por página"
        >
          <template v-slot:top>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="name"
                  label="Nome do usuário"
                  variant="underlined"
                  append-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>

              <v-col cols="3" offset="6" align-self="center">
                <modal-insert-user></modal-insert-user>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import userAPI from '@/modules/user/API/userAPI'
import type User from '../types/user'
import ModalInsertUser from './modals/Insert.vue'

export default {
  components: {
    ModalInsertUser
  },
  data() {
    return {
      name: '',
      loading: false,
      headers: [
        { title: '#', key: 'id' },
        { title: 'Nome', key: 'name' },
        { title: 'E-mail', key: 'mail' },
        { title: 'Permissão', key: 'roule.name' }
      ],
      users: [] as User[]
    }
  },
  methods: {
    listUsers() {
      this.loading = true
      userAPI
        .list()
        .then((resp: any) => {
          this.users = resp.data
          this.loading = false
        })
        .catch((resp: any) => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.listUsers()
  }
}
</script>
