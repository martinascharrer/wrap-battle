import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBJlcSD6G-dvCeBj8DWs7ecueDSW6kmFec",
    authDomain: "wrapbattle-5e777.firebaseapp.com",
    databaseURL: "https://wrapbattle-5e777.firebaseapp.com",
    projectId: "wrapbattle-5e777",
    storageBucket: "wrapbattle-5e777.appspot.com",
    messagingSenderId: "956962628146",
    appId: "1:956962628146:web:2bd538a9b61700076fd22b",
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();