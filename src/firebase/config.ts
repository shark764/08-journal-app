// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdq1hb_3UhfHdvvwl01N4OooSrpmRn28U',
  authDomain: 'react-udemy-course-76352.firebaseapp.com',
  projectId: 'react-udemy-course-76352',
  storageBucket: 'react-udemy-course-76352.appspot.com',
  messagingSenderId: '130792178532',
  appId: '1:130792178532:web:11328bcefb7c0aed36b071',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

const googleAuthProvider = new GoogleAuthProvider();

export { firebaseApp, db, googleAuthProvider };
