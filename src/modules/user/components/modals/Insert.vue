<template>
  <v-btn block color="success"  variant="outlined" @click="showDialog = true">Adicionar</v-btn>

  <v-dialog v-model="showDialog" max-width="500">
    <v-card>
      <v-toolbar color="primary" title="Cadastro de Usuário"></v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Nome" v-model="newUser.name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Email" type="email" v-model="newUser.mail"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Senha" type="input" v-model="newUser.password"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              label="Selecione um nível de usuário"
              v-model="newUser.roule"
              :items="roules"
              item-title="name"
              item-value="id"
              :return-object="true"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="error" outlined @click="showDialog = false">Fechar</v-btn>
        <v-btn color="info" outlined @click="onConfirm">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import userAPI from '../../API/userAPI'
import roulePI from '../../API/rouleAPI'
import type Roule from '../../types/roule'
import type User from '../../types/user'

export default {
  name: 'ModalInsertMedicine',
  data() {
    return {
      showDialog: false,
      loading: false,
      newUser: {} as User,
      roules: [] as Roule[],
      
    }
  },
  methods: {
    listRoules() {
      this.loading = true
      roulePI
        .list()
        .then((resp: any) => {
          this.roules = resp.data
          this.loading = false
        })
        .catch((resp: any) => {
          this.loading = false
        })
    },
    onConfirm() {
      this.loading = true
      userAPI
        .save(this.newUser)
        .then((resp: any) => {
          this.loading = false
        })
        .catch((resp: any) => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.listRoules()
  }
}
</script>
