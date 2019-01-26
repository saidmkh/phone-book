import * as firebase from "firebase";
import 'firebase/storage';

import databaseConfig from './firebase_keys'

firebase.initializeApp(databaseConfig);
const databaseRef = firebase.database().ref()

export const phoneBookStorage = firebase.storage();

export const contactsRef = databaseRef.child('contacts')

