import firebase from '../config/firebase'

export const databaseRef = firebase.database().ref()

export const contactsRef = databaseRef.child('contacts')