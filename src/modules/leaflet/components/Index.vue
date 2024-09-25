<template>
  <v-container>
    <v-row align-content="center" justify="center" class="fill-height">
      <p class="text-h4">Bulário</p>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="name"
          label="Filtrar medicamentos por nome"
          variant="underlined"
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>

      <v-col cols="3" offset="3" align-self="center">
        <v-btn block color="success" variant="outlined" @click="getLeaflet">Buscar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      name: '',
      leaflet: {
        content: [
          {
            idBulaPacienteProtegido: ''
          }
        ]
      }
    }
  },
  methods: {
    getLeaflet() {
      this.axios.get(`https://bula.vercel.app/pesquisar?nome=${this.name}`).then((response) => {
        this.leaflet = response.data
        if (response.data.content.length > 0) {
          this.getLeafletPDF(response.data.content[0].idBulaPacienteProtegido)
        }
      })
    },
    getLeafletPDF(leafletId: string) {
      this.axios
        .get(`https://bula.vercel.app/pdf?id=${leafletId}`, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
          )
          const a = document.createElement('a')
          a.href = url
          a.setAttribute('download', 'bula.pdf')
          document.body.appendChild(a)
          a.click()
        })
    }
  }
}
</script>
