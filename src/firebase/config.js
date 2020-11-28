import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyAE6IGpRcEyAPeM209W4r6d8iy9DZcJ_hY',
	authDomain: 'ipugram.firebaseapp.com',
	databaseURL: 'https://ipugram.firebaseio.com',
	projectId: 'ipugram',
	storageBucket: 'ipugram.appspot.com',
	messagingSenderId: '145883488618',
	appId: '1:145883488618:web:e865106343cb26d048c513',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, db, auth, functions, timestamp };
