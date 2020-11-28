import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/app';

import { firebaseConfig } from 'config';

const configure = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth();
};

export const signInWithEmailAndPassword = async (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export default configure;
