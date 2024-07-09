const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json'); // Ensure this is the correct path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://zaayd-personal-recommedation-default-rtdb.firebaseio.com' // Replace with your Firebase project URL
});

const db = admin.firestore();

module.exports = db;
