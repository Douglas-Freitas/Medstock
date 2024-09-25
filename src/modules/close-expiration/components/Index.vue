<template>
    <v-container>
      <v-row>
        <v-col>
          <span>Medicamentos com data de vencimento menor que 1 mês</span>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="points"
            item-value="name"
            no-data-text="Nenhum Medicamento Proximo a Data De Vencimnto"
            items-per-page-text="Medicamentos por página"
          >
            <template v-slot:top>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="name"
                    label="Nome"
                    variant="underlined"
                    append-inner-icon="mdi-magnify"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import type Medicine from '../../medicine/types/medicine'
  import medicineAPI from '@/modules/medicine/API/medicineAPI'
  
  export default {
    components: {
    },
    data() {
      return {
        name: '',
        headers: [
          { title: 'Nome', key: 'name' },
          { title: 'Data De Validade', key: 'validity' },
        ],
        points: [] as Medicine[],
      }
    },
    methods: {
      listPoints() {
        medicineAPI.list().then((resp: any) => {
            console.log(resp);
            const today = new Date();
            
            // Cria uma nova data para um mês a partir da data atual
            const oneMonthLater = new Date(today);
            oneMonthLater.setMonth(today.getMonth() + 1);

            // Ajusta o dia para garantir que seja um mês completo
            if (oneMonthLater.getDate() !== today.getDate()) {
            oneMonthLater.setDate(0); // Volta para o último dia do mês anterior
            }

            const filteredPoints = resp.data.filter((point : Medicine) => {
              var dateParts = point.validity.split("/");
              const validityDate = new Date(+dateParts[2], parseInt(dateParts[1]) - 1, +dateParts[0]); 

                // Calcula a diferença em milissegundos e converte para dias
                const timeDiff = validityDate.getTime() - today.getTime();
                const dayDiff = timeDiff / (1000 * 3600 * 24);

                // Verifica se a data de validade está entre hoje e 31 dias a partir de hoje
                return dayDiff >= 0 && dayDiff <= 31;
            });

          this.points = filteredPoints
        })
      },
    },
    mounted() {
      this.listPoints()
    }
  }
  </script>
  