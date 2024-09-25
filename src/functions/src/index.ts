import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();

//const JSON_SERVER_URL = 'http://localhost:3000/'; // Substitua pelo URL do seu JSON Server
const JSON_SERVER_URL = 'http://192.168.0.103:3000/';

export const checkMedications = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const today = new Date();
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(today.getDate() + 7);

  try {
    const response = await axios.get(`${JSON_SERVER_URL}/medications`);
    const medications = response.data;

    medications.forEach(async (medication: any) => {
      const expirationDate = new Date(medication.dataValidade);
      
      if (expirationDate <= oneWeekFromNow) {
        const payload = {
          notification: {
            title: 'Medicamento próximo da validade!',
            body: `${medication.nome} está prestes a vencer.`,
          },
          topic: 'medication_alerts', // Ou use um token específico
        };

        await admin.messaging().send(payload);
      }
    });
  } catch (error) {
    console.error('Error fetching medications:', error);
  }

  return null;
});
