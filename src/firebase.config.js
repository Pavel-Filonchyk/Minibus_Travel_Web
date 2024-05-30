import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyApzzUid4uMiVNkkDj8Mw7YnX035JmBtTo",
  authDomain: "minibus-travel-2c2aa.firebaseapp.com",
  projectId: "minibus-travel-2c2aa",
  storageBucket: "minibus-travel-2c2aa.appspot.com",
  messagingSenderId: "815858586061",
  appId: "1:815858586061:web:6500bd68711fdacb5ff484"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

//export const firestore = getFirestore(app)
