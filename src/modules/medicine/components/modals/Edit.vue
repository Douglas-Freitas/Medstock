<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card>
      <v-toolbar color="primary" title="Cadastro de Medicamento"></v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Nome" required v-model="medicine.name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Validade" v-mask="'##/##/####'" v-model="medicine.validity"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Quantidade" required v-model="medicine.quantity"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Lote" v-model="medicine.batch"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field label="Fabricante" v-model="medicine.vendor"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label>Deseja utilizar o alarme ?</label>
           <v-radio-group v-model="medicine.useAlert">
            <v-radio label="Sim" value="true"></v-radio>
            <v-radio label="Não" value="false"></v-radio>
          </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field type="number"
            placeholder="Defina a frequência, ex: a cada 8 horas." 
            label="Intervalo de Medicação" v-model="medicine.medicationInterval"></v-text-field>
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
import medicineAPI from '@/modules/medicine/API/medicineAPI'
import type Medicine from '../../types/medicine'
declare var cordova: any;

export default {
  name: 'ModalEditMedicine',
  props: {
    showEditDialog: { type: Boolean, required: true, default: false },
    medicineSelected: { type: Object, required: true }
  },
  data() {
    return {
      showDialog: false,
      medicine: {} as Medicine,
      oldMedicationInterval: 0
    }
  },
  methods: {
    onConfirm() {
      medicineAPI.update(this.medicine)
      if(this.medicine.useAlert && this.medicine.medicationInterval != this.oldMedicationInterval){
        this.scheduleNotification(this.medicine)
      }
      location.reload()
    },
    // Função para agendar a notificação com base no medicamento cadastrado
    scheduleNotification(medicine : Medicine) {
      alert('edit scheduler')
      const intervalHours = medicine.medicationInterval; // Exemplo: o intervalo é definido pelo medicamento cadastrado
      const medicineName = medicine.name;

      // Agendar a notificação para o medicamento cadastrado
      document.addEventListener('deviceready', function () {
        cordova.plugins.notification.local.schedule({
          id: medicine.id,
          title: 'Hora de tomar o medicamento',
          text: `Está na hora de tomar o ${medicineName}.`,
          trigger: { every: intervalHours, unit: 'minute' },
          sound: null,
          foreground: true
        });
      }, false);
    },
    
  },
  watch: {
    showEditDialog: function (newValue) {
      this.showDialog = newValue
    },
    medicineSelected: function (newValue) {
      this.oldMedicationInterval = newValue.medicationInterval
      this.medicine = newValue
    }
  }
}
</script>
