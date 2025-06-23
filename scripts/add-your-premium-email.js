const { initializeApp } = require("firebase/app")
const { getFirestore, collection, addDoc } = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyDvzKHBJQn8OLVh_Qs9Ej8Ej8Ej8Ej8Ej8",
  authDomain: "prescreve-ai.firebaseapp.com",
  projectId: "prescreve-ai",
  storageBucket: "prescreve-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function addYourEmail() {
  // SUBSTITUA PELO SEU EMAIL QUE PAGOU
  const yourEmail = "SEU_EMAIL_AQUI@gmail.com"

  console.log(`➕ Adicionando seu email premium: ${yourEmail}`)

  try {
    await addDoc(collection(db, "premium_users"), {
      email: yourEmail.toLowerCase().trim(),
      created_at: new Date(),
      active: true,
      paid: true,
      added_manually: true,
    })

    console.log("✅ Seu email foi adicionado com sucesso!")
    console.log("🎉 Agora você pode fazer login normalmente")
  } catch (error) {
    console.error("❌ Erro ao adicionar email:", error)
  }
}

addYourEmail()
