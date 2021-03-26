import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCUX41SwYEqK5pfz2J8DbF9g8fi9rqZOAg",
    authDomain: "wrapbattle-96af9.firebaseapp.com",
    projectId: "wrapbattle-96af9",
    storageBucket: "wrapbattle-96af9.appspot.com",
    messagingSenderId: "158392078710",
    appId: "1:158392078710:web:6e0c2145deb7613614ea57"
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();