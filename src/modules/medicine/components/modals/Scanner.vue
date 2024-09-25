<template>
  <!-- <v-btn color="success" variant="outlined" @click="showScanner = true">Codigo de Barras</v-btn> -->

  <div>
    <v-btn color="success" variant="outlined" @click="startScanner">Código de Barras</v-btn>
    <v-dialog v-model="showScanner" max-width="600">
      <v-card>
        <v-card-title>Leitor de Código de Barras</v-card-title>
        <v-card-text>
          <div id="barcode-scanner" style="width: 100%; height: 400px;"></div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" outlined @click="stopScanner">Parar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p v-if="scannedCode">Código de Barras: {{ scannedCode }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Quagga from 'quagga';

export default defineComponent ({
  name: 'ModalScanner',
  data() {
    return {
      showScanner: false,
      scannedCode: ''
    }
  },
  methods: {
    startScanner() {
      debugger
      this.showScanner = true;
      // Use nextTick para garantir que o DOM está atualizado
      this.$nextTick(() => {
        const scannerElement = document.querySelector('#barcode-scanner');

        if (!scannerElement) {
          console.error('Elemento do scanner não encontrado.');
          return;
        }
        Quagga.init({
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#barcode-scanner'), // Elemento onde será exibida a câmera
            constraints: {
              width: 600,
              height: 400,
              //facingMode: 'environment' // Usa a câmera traseira
              facingMode: 'user' // Usa a câmera traseira
            }
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'] // Tipos de códigos que deseja ler
          }
        }, (err: any) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        });
        Quagga.onDetected(this.onDetected);
      });
    },

    async fetchData(code: string) {
      try {
        const response = await fetch(`https://api.cosmos.bluesoft.com.br/gtins/${code}`,{
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'X-Cosmos-Token': 'aijIfx9C076rs2Nq4XNLRw'
          },
        });
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Dados recebidos:', data);
        // Aqui você pode fazer algo com os dados recebidos, por exemplo, atualizar o estado
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    },

    onDetected(result: any) {
      debugger
      this.scannedCode = result.codeResult.code;
      this.stopScanner();
      this.fetchData(this.scannedCode);
    },
    stopScanner() {
      Quagga.stop();
      this.showScanner = false;
    }
  },
  beforeUnmount() {
    Quagga.offDetected(this.onDetected);
  }
});
</script>
