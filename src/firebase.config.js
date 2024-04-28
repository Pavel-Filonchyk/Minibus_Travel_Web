import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyADrsKy6Tf2nSoEE8rZF_oSzqZBMNMFEJ4",
  authDomain: "minibus-travel.firebaseapp.com",
  projectId: "minibus-travel",
  storageBucket: "minibus-travel.appspot.com",
  messagingSenderId: "452875958929",
  appId: "1:452875958929:web:0207a567337409d5bd9d30",
  measurementId: "G-19TJV0VJ1Q"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

//export const firestore = getFirestore(app)
