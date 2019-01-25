import * as firebase from "firebase";
import 'firebase/storage';

import databaseConfig from './firebase_keys'

firebase.initializeApp(databaseConfig);
export const phoneBookStorage = firebase.storage();

console.log('firebase', firebase)
console.log('storage', phoneBookStorage)

const databaseRef = firebase.database().ref()

export const contactsRef = databaseRef.child('contacts')

