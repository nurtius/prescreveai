import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAcjs0LLS5yolVWvYZ7FWer2Ymz4pOEKbg",
  authDomain: "prescreve-ai-mvp.firebaseapp.com",
  projectId: "prescreve-ai-mvp",
  storageBucket: "prescreve-ai-mvp.firebasestorage.app",
  messagingSenderId: "1056067130923",
  appId: "1:1056067130923:web:8d9b84d97a9384a9383c6e",
  measurementId: "G-N1JH4BZKVB",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
