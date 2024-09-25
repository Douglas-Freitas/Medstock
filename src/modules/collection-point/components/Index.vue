<template>
  <v-container>
    <modal-edit-point
      :show-edit-dialog="showEdit"
      :point-selected="selectedItem"
      v-on:close-edit="cloneEditModal"
    ></modal-edit-point>
    <v-row>
      <v-col>
        <span>Pontos De Coleta</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="points"
          item-value="name"
          no-data-text="Nenhum ponto de coleta retornado"
          items-per-page-text="Pontos de Coleta por página"
        >
          <template v-slot:top>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="name"
                  label="Endereço"
                  variant="underlined"
                  append-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>

              <v-col cols="3" offset="6" align-self="center">
                <modal-insert-point></modal-insert-point>
              </v-col>
            </v-row>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ModalInsertPoint from './modals/Insert.vue'
import ModalEditPoint from './modals/Edit.vue'
import type CollectionPoint from '../types/CollectionPoint'
import CollectionPointAPI from '@/modules/collection-point/API/CollectionPointAPI'

export default {
  components: {
    ModalInsertPoint,
    ModalEditPoint
  },
  data() {
    return {
      name: '',
      headers: [
        { text: 'Endereço', value: 'name' },
        { text: 'Ações', value: 'actions', align: 'end' }
      ] as any,
      points: [] as CollectionPoint[],
      showEdit: false as boolean,
      selectedItem: {} as CollectionPoint
    }
  },
  methods: {
    listPoints() {
      CollectionPointAPI.list().then((resp: any) => {
        console.log(resp);
        this.points = resp.data
      })
    },
    editItem(item : CollectionPoint) {
      this.showEdit = true
      this.selectedItem = item
    },
    deleteItem(item : CollectionPoint) {
      CollectionPointAPI.delete(item.id).then((resp) => {
        this.listPoints()
      })
    },
    cloneEditModal() {
      this.showEdit = false
    }
  },
  mounted() {
    this.listPoints()
  }
}
</script>
