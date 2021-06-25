import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

export { auth, database };

const env = Object.entries( process.env ).filter( e => e[0].startsWith('REACT_APP_FIREBASE') ).map( e => e[1] );

const firebaseConfig = {
    apiKey: env[0]
    , authDomain: env[1]
    , databaseURL: env[2]
    , projectId: env[3]
    , storageBucket: env[4]
    , messagingSenderId: env[5]
    , appId: env[6]
    , measurementId: env[7]
};

firebase.initializeApp( firebaseConfig );

const auth = firebase.auth();
const database = firebase.database();