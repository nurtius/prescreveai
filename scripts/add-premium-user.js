const { initializeApp } = require("firebase/app")
const { getFirestore, collection, addDoc } = require("firebase/firestore")

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
const db = getFirestore(app)

async function addPremiumUser() {
  try {
    // Substitua pelo seu email
    const email = "seu-email@exemplo.com" // COLOQUE SEU EMAIL AQUI

    console.log("🚀 Adicionando usuário premium:", email)

    const docRef = await addDoc(collection(db, "premium_users"), {
      email: email.toLowerCase(),
      created_at: new Date().toISOString(),
      active: true,
      plan: "premium",
    })

    console.log("✅ Usuário premium adicionado com ID:", docRef.id)
    console.log("📧 Email:", email)
    console.log("🎯 Agora você pode fazer login no sistema!")
  } catch (error) {
    console.error("❌ Erro ao adicionar usuário premium:", error)
  }
}

addPremiumUser()
