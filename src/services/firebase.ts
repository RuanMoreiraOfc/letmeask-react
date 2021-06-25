import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

export {
    firebase
    , auth
    , database
};

const env = Object.entries( process.env ).filter( e => e[0].startsWith('REACT_APP_FIREBASE') ).map( e => e[1] );

const firebaseConfig = {
    apiKey: env[0]
    , appId: env[1]
    , authDomain: env[2]
    , databaseURL: env[3]
    , measurementId: env[4]
    , messagingSenderId: env[5]
    , projectId: env[6]
    , storageBucket: env[7]
};

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const database = firebase.database();