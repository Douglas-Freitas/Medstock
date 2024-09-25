<template>
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
          <v-btn color="error" outlined @click="$emit('close-edit')">Fechar</v-btn>
          <v-btn color="info" outlined @click="onConfirm">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts">
  import CollectionPointAPI from '@/modules/collection-point/API/CollectionPointAPI'
  import type CollectionPoint from '../../types/CollectionPoint'
  
  export default {
    name: 'ModalEditPoint',
    props: {
      showEditDialog: { type: Boolean, required: true, default: false },
      pointSelected: { type: Object, required: true }
    },
    data() {
      return {
        showDialog: false,
        point: {} as CollectionPoint
      }
    },
    methods: {
      onConfirm() {
        CollectionPointAPI.update(this.point)
        location.reload()
      }
    },
    watch: {
      showEditDialog: function (newValue) {
        this.showDialog = newValue
      },
      pointSelected: function (newValue) {
        this.point = newValue
      }
    }
  }
  </script>
  