<template>
  <v-container>
    <modal-edit-medicine
      :show-edit-dialog="showEdit"
      :medicine-selected="selectedItem"
      v-on:close-edit="cloneEditModal"
    ></modal-edit-medicine>

    <v-row>
      <v-col>
        <span>Lista de Medicamentos</span>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="medicines"
          item-value="name"
          no-data-text="Nenhum medicamento retornado"
          items-per-page-text="Medicamentos por página"
        >
        <template v-slot:item.medicationInterval="{ item }">
          {{ item.medicationInterval || '-' }}
        </template>
          <template v-slot:top>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="name"
                  label="Nome do medicamento"
                  variant="underlined"
                  append-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-col>

              <v-row align="center" justify="end">
              <v-col cols="auto" class="d-flex">
                <!-- <modal-insert-medicine @save="scheduleNotification"></modal-insert-medicine> -->
                <modal-insert-medicine></modal-insert-medicine>
                <modal-scanner class="ml-2"></modal-scanner> <!-- Adiciona uma margem à esquerda -->
              </v-col>
            </v-row>
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
import ModalInsertMedicine from './modals/Insert.vue'
import ModalEditMedicine from './modals/Edit.vue'
import type Medicine from '../types/medicine'
import medicineAPI from '@/modules/medicine/API/medicineAPI'
import ModalScanner from './modals/Scanner.vue'
declare var cordova: any;

export default {
  components: {
    ModalInsertMedicine,
    ModalEditMedicine,
    ModalScanner
  },
  data() {
    return {
      name: '',
      headers: [
        { title: 'Nome', key: 'name' },
        { title: 'Data de Validade', key: 'validity' },
        { title: 'Intervalo Da Medicação', key: 'medicationInterval' },
        { title: 'Quantidade', key: 'quantity' },
        { title: 'Ações', key: 'actions', align: 'end' }
      ] as any,
      medicines: [] as Medicine[],
      showEdit: false as boolean,
      selectedItem: {} as Medicine      
    }
  },
  methods: {
    listMedicines() {
      medicineAPI.list().then((resp: any) => {
        console.log(resp);
        this.medicines = resp.data
      })
      .catch((error: any) => {
        alert(error);
      });
    },
    editItem(item : Medicine) {
      this.showEdit = true
      this.selectedItem = item
    },
    deleteItem(item : Medicine) {
      cordova.plugins.notification.local.cancel(item.id, function() {
      console.log(`Notificação com ID ${item.id} cancelada.`);
      });
      medicineAPI.delete(item.id).then((resp) => {
        this.listMedicines()
      })
    },
    cloneEditModal() {
      this.showEdit = false
    },
  },
  mounted() {
    this.listMedicines()
  }
}
</script>
