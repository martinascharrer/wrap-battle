import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBLoPXSwIJwwOnN95q6Sac7Qka-4wRtt-M',
    authDomain: 'wrap-battle.firebaseapp.com',
    projectId: 'wrap-battle',
    storageBucket: 'wrap-battle.appspot.com',
    messagingSenderId: '1032769649433',
    appId: '1:1032769649433:web:8e4bcaea6bd1f1db1ce388',
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
