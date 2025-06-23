// ✅ REGRAS FINAIS DO FIRESTORE - SOLUÇÃO DEFINITIVA
// Copie e cole estas regras no Firebase Console

const firestoreRulesFinal = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Permite leitura da coleção users_premium para verificar acesso
    match /users_premium/{docId} {
      allow read: if true; // Necessário para verificação de e-mail
      allow write: if false; // Apenas admin/webhook pode escrever
    }

    // Permite qualquer pessoa gravar leads (sem autenticação)
    match /leads_interessados/{docId} {
      allow create: if request.resource.data.keys().hasOnly(['email']) &&
                    request.resource.data.email is string &&
                    request.resource.data.email.size() > 4;
      allow read, update, delete: if false; // Ninguém pode ler/editar/deletar
    }

    // consultations collection - usuários autenticados podem ler/escrever suas próprias conversas
    match /consultations/{consultationId} {
      allow read, write: if request.auth != null && 
        request.auth.token.email == resource.data.email;
      allow create: if request.auth != null && 
        request.auth.token.email == request.resource.data.email;
    }

    // Bloquear todo o resto por segurança
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`

console.log("🔥 REGRAS FINAIS DO FIRESTORE")
console.log("=====================================")
console.log("")
console.log("✅ PRINCIPAIS RECURSOS:")
console.log("• users_premium: Leitura liberada para verificação")
console.log("• leads_interessados: Escrita anônima com validação")
console.log("• consultations: Apenas usuários autenticados")
console.log("• Resto: Bloqueado por segurança")
console.log("")
console.log("🚀 COMO APLICAR:")
console.log("1. Acesse: https://console.firebase.google.com")
console.log("2. Projeto: prescreve-ai-mvp")
console.log("3. Menu: Firestore Database → Aba 'Regras'")
console.log("4. Substitua TODAS as regras pelas regras acima")
console.log("5. Clique em 'Publicar'")
console.log("")
console.log("🔒 VALIDAÇÕES DE SEGURANÇA:")
console.log("• leads_interessados só aceita campo 'email'")
console.log("• Email deve ser string com mais de 4 caracteres")
console.log("• Não permite leitura/edição/exclusão de leads")
console.log("• Protege todas as outras coleções")
