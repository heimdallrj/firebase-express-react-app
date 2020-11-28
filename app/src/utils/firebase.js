import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';

import { firebaseConfig } from 'config';

firebase.initializeApp(firebaseConfig);
firebase.auth();
