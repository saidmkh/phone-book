import firebase from 'firebase'
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBeQcQlfQA5OpY_IZ1Mpi9qTZFiNDw86wY",
  authDomain: "phone-book-63384.firebaseapp.com",
  databaseURL: "https://phone-book-63384.firebaseio.com",
  projectId: "phone-book-63384",
  storageBucket: "phone-book-63384.appspot.com",
  messagingSenderId: "870252849132"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default
}