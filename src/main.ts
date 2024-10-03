import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueTheMask from 'vue-the-mask'

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyCqreveAFA9Vm7IXPJNwf9px9QqIdlXqmc",
  authDomain: "medstock-push-notification.firebaseapp.com",
  projectId: "medstock-push-notification",
  storageBucket: "medstock-push-notification.appspot.com",
  messagingSenderId: "54738423950",
  appId: "1:54738423950:web:ef7e417f0aed5f12e7b9df",
  measurementId: "G-6LB0S25KVM"
};
// Inicializar o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializar o serviço de mensagens
const messaging = getMessaging(firebaseApp);

// Obter o token de notificação (solicitará permissão automaticamente se necessário)
getToken(messaging, { vapidKey: 'BGOCdS1XJu1AoOJspr7zJSUfIS7j9p7xrqq9two71NPbYIvF64QhIdb6XFWM83wBcKvwcIyl5OCj0ORbhptjn6E' }).then((currentToken) => {
  
  if (currentToken) {
    console.log('Token do dispositivo:', currentToken);
    // Aqui você pode enviar o token para seu backend para associá-lo ao usuário
  } else {
    console.log('Nenhum token disponível. Solicitação de permissão necessária.');
  }
}).catch((err) => {
  console.log('Erro ao obter o token:', err);
});

// Lidando com mensagens recebidas enquanto o app está em primeiro plano
onMessage(messaging, (payload) => {
  console.log('Mensagem recebida:', payload);
  // Aqui você pode mostrar uma notificação no app se desejar
});

// if ('serviceWorker' in navigator) {
//   debugger;
//   navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
//     console.log('Service Worker registrado com sucesso:', registration);
//   }).catch((err) => {
//     console.log('Erro ao registrar o Service Worker:', err);
//   });
// }



const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives
})

app.use(VueTheMask)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)

app.mount('#app')
