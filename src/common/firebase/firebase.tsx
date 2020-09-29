import firebase from 'firebase/app';
import firebaseConfig from 'configs/firebaseConfig';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const storage = firebase.storage();

export default firebase;
