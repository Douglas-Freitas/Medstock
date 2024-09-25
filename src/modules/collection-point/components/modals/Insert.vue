<template>
    <v-btn block color="success" variant="outlined" @click="showDialog = true">Adicionar</v-btn>
  
    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-toolbar color="primary" title="Cadastro de Ponto de Coleta"></v-toolbar>
  
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field label="Endereço" v-model="point.name"></v-text-field>
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
  import CollectionPointAPI from '@/modules/collection-point/API/CollectionPointAPI'
  import type CollectionPoint from '../../types/CollectionPoint'
  
  export default {
    name: 'ModalInsertPoint',
    data() {
      return {
        showDialog: false,
        point: {} as CollectionPoint,
        isAdminUser: false
      }
    },
    methods: {
      onConfirm() {
        CollectionPointAPI.save(this.point)
        this.showDialog = false
        location.reload()
      }
    }
  }
  </script>
  