const { initializeApp } = require("firebase/app")
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore")

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

async function debugPremiumUsers() {
  console.log("🔍 Debugando usuários premium...")

  try {
    // Verificar coleção premium_users
    console.log('\n📋 Verificando coleção "premium_users":')
    const premiumSnapshot = await getDocs(collection(db, "premium_users"))
    console.log(`Total de documentos: ${premiumSnapshot.size}`)

    if (premiumSnapshot.size > 0) {
      premiumSnapshot.forEach((doc) => {
        console.log(`  ID: ${doc.id}`)
        console.log(`  Dados:`, doc.data())
      })
    } else {
      console.log("  ❌ Nenhum documento encontrado")
    }

    // Verificar coleção users_premium
    console.log('\n📋 Verificando coleção "users_premium":')
    const usersSnapshot = await getDocs(collection(db, "users_premium"))
    console.log(`Total de documentos: ${usersSnapshot.size}`)

    if (usersSnapshot.size > 0) {
      usersSnapshot.forEach((doc) => {
        console.log(`  ID: ${doc.id}`)
        console.log(`  Dados:`, doc.data())
      })
    } else {
      console.log("  ❌ Nenhum documento encontrado")
    }

    // Adicionar um email de teste se não houver nenhum
    if (premiumSnapshot.size === 0 && usersSnapshot.size === 0) {
      console.log("\n➕ Adicionando email de teste...")

      const testEmail = "teste@prescreve.ai"
      await addDoc(collection(db, "premium_users"), {
        email: testEmail,
        created_at: new Date(),
        active: true,
        test: true,
      })

      console.log(`✅ Email de teste adicionado: ${testEmail}`)
    }
  } catch (error) {
    console.error("❌ Erro ao debugar:", error)
  }
}

debugPremiumUsers()
