// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCyp4t3_glX6wql4lio9tlZzLd0t0GB_Vs',
  authDomain: 'you-spent.firebaseapp.com',
  projectId: 'you-spent',
  storageBucket: 'you-spent.appspot.com',
  messagingSenderId: '811521792283',
  appId: '1:811521792283:web:acf13ab980b640969bdbbe',
  measurementId: 'G-65EGKZVZHH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// exports here
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
