const { initializeApp } = require("firebase/app")
const { getFirestore, collection, addDoc } = require("firebase/firestore")

// Configuração do Firebase (substitua pelos seus dados)
const firebaseConfig = {
  // Suas configurações do Firebase aqui
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "sua-app-id",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// SUBSTITUA PELO SEU EMAIL REAL
const EMAIL_PREMIUM = "SEU_EMAIL_AQUI@gmail.com"

async function addPremiumUser() {
  try {
    console.log("➕ Adicionando email premium:", EMAIL_PREMIUM)

    const docRef = await addDoc(collection(db, "premium_users"), {
      email: EMAIL_PREMIUM.toLowerCase().trim(),
      created_at: new Date(),
      active: true,
      added_manually: true,
    })

    console.log("✅ Email premium adicionado com sucesso! ID:", docRef.id)
    console.log("🎉 Agora você pode fazer login com:", EMAIL_PREMIUM)
  } catch (error) {
    console.error("❌ Erro ao adicionar email premium:", error)
  }
}

// Executar
addPremiumUser()
