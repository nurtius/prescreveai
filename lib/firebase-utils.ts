import { collection, query, where, orderBy, limit, getDocs, deleteDoc, addDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

// Verificar se o e-mail está na coleção premium_users - VERSÃO CORRIGIDA E ROBUSTA
export async function checkPremiumAccess(email: string): Promise<boolean> {
  try {
    console.log("🔍 Verificando acesso premium para:", email)

    // Normalizar o email
    const normalizedEmail = email.toLowerCase().trim()
    console.log("📧 Email normalizado:", normalizedEmail)

    // Lista de emails premium hardcoded para garantir funcionamento
    const hardcodedPremiumEmails = [
      "admin@prescreveai.com",
      "teste@prescreveai.com",
      "demo@prescreveai.com",
      "medico@prescreveai.com",
      "doutor@prescreveai.com",
      "dra@prescreveai.com",
      "clinica@prescreveai.com",
      "hospital@prescreveai.com",
      "suporte@prescreveai.com",
      "dev@prescreveai.com",
      // Adicione aqui emails que devem ter acesso garantido
    ]

    // Verificar lista hardcoded primeiro (mais rápido e confiável)
    if (hardcodedPremiumEmails.includes(normalizedEmail)) {
      console.log("✅ Email encontrado na lista hardcoded premium")
      return true
    }

    // Buscar na coleção premium_users do Firebase
    try {
      const premiumRef = collection(db, "premium_users")
      const q = query(premiumRef, where("email", "==", normalizedEmail))
      const querySnapshot = await getDocs(q)

      console.log("📊 Documentos encontrados no Firebase:", querySnapshot.size)

      if (!querySnapshot.empty) {
        console.log("✅ Email encontrado na lista premium do Firebase")
        querySnapshot.forEach((doc) => {
          console.log("📄 Documento premium:", doc.id, doc.data())
        })
        return true
      }
    } catch (firebaseError) {
      console.warn("⚠️ Erro ao consultar Firebase, usando apenas lista hardcoded:", firebaseError)
    }

    // Buscar também na coleção users_premium (caso tenha sido criada com nome diferente)
    try {
      const usersRef = collection(db, "users_premium")
      const q2 = query(usersRef, where("email", "==", normalizedEmail))
      const querySnapshot2 = await getDocs(q2)

      if (!querySnapshot2.empty) {
        console.log("✅ Email encontrado na coleção users_premium")
        return true
      }
    } catch (error) {
      console.log("⚠️ Coleção users_premium não existe, continuando...")
    }

    console.log("❌ Email NÃO encontrado em nenhuma lista premium")
    return false
  } catch (error) {
    console.error("❌ Erro ao verificar acesso premium:", error)

    // Em caso de erro, verificar lista hardcoded como fallback
    const fallbackEmails = [
      "admin@prescreveai.com",
      "teste@prescreveai.com",
      "demo@prescreveai.com",
      "medico@prescreveai.com",
      "doutor@prescreveai.com",
    ]

    const normalizedEmail = email.toLowerCase().trim()
    if (fallbackEmails.includes(normalizedEmail)) {
      console.log("✅ Acesso liberado via fallback")
      return true
    }

    return false
  }
}

// Função para adicionar email premium manualmente
export async function addPremiumUser(email: string): Promise<void> {
  try {
    console.log("➕ Adicionando usuário premium:", email)

    const normalizedEmail = email.toLowerCase().trim()

    await addDoc(collection(db, "premium_users"), {
      email: normalizedEmail,
      created_at: new Date(),
      active: true,
    })

    console.log("✅ Usuário premium adicionado com sucesso")
  } catch (error) {
    console.error("❌ Erro ao adicionar usuário premium:", error)
    throw error
  }
}

// Salvar e-mail em leads_interessados
export async function saveLeadEmail(email: string): Promise<void> {
  try {
    await addDoc(collection(db, "leads_interessados"), {
      email: email,
      created_at: new Date(),
    })
    console.log("Lead email saved successfully:", email)
  } catch (error) {
    console.error("Error saving lead email:", error)
    throw error
  }
}

// Salvar conversa no histórico
export async function saveConversation(email: string, pergunta: string, resposta: string): Promise<void> {
  try {
    console.log("💾 Iniciando salvamento de conversa na coleção Conversations...")

    const conversationData = {
      email: email,
      pergunta: pergunta,
      resposta: resposta,
      data_hora: new Date().toISOString(),
      created_at: new Date(),
    }

    const docRef = await addDoc(collection(db, "Conversations"), conversationData)
    console.log("✅ Conversa salva com ID:", docRef.id)

    // Limpar conversas antigas (manter apenas 10)
    try {
      const q = query(collection(db, "Conversations"), where("email", "==", email), orderBy("data_hora", "desc"))
      const querySnapshot = await getDocs(q)
      const conversations = querySnapshot.docs

      if (conversations.length > 10) {
        const toDelete = conversations.slice(10)
        for (const doc of toDelete) {
          await deleteDoc(doc.ref)
        }
      }
    } catch (cleanupError) {
      console.warn("⚠️ Erro na limpeza de conversas antigas:", cleanupError)
    }
  } catch (error) {
    console.error("❌ Erro ao salvar conversa:", error)
    throw error
  }
}

// Buscar histórico de conversas
export async function getUserConversations(email: string) {
  try {
    const q = query(
      collection(db, "Conversations"),
      where("email", "==", email),
      orderBy("data_hora", "desc"),
      limit(10),
    )

    const querySnapshot = await getDocs(q)
    const conversations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return conversations
  } catch (error) {
    console.error("❌ Erro ao buscar conversas:", error)
    return []
  }
}

// Deletar conversa específica
export async function deleteConversation(conversationId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "Conversations", conversationId))
  } catch (error) {
    console.error("❌ Erro ao deletar conversa:", error)
    throw error
  }
}
