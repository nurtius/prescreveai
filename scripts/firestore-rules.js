// Regras de segurança do Firestore atualizadas
// Copie e cole estas regras no console do Firebase

const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Permite leitura da coleção users_premium para verificar acesso
    match /users_premium/{docId} {
      allow read: if true; // Permite leitura para qualquer um verificar acesso
      allow write: if false; // Apenas admin/webhook pode escrever
    }

    // Permite salvar e-mails na leads_interessados
    match /leads_interessados/{docId} {
      allow read: if false; // Ninguém precisa ler
      allow write: if true; // Qualquer um pode escrever (para salvar leads)
    }

    // consultations collection - usuários autenticados podem ler/escrever suas próprias conversas
    match /consultations/{consultationId} {
      allow read, write: if request.auth != null && 
        request.auth.token.email == resource.data.email;
      allow create: if request.auth != null && 
        request.auth.token.email == request.resource.data.email;
    }

    // Bloqueia todo o resto por segurança
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
`

console.log("✅ REGRAS DO FIRESTORE ATUALIZADAS")
console.log("Copie as regras acima e cole em:")
console.log("1. Acesse: https://console.firebase.google.com")
console.log("2. Projeto: prescreve-ai-mvp")
console.log("3. Menu: Firestore Database → Aba 'Regras'")
console.log("4. Substitua todas as regras atuais pelas regras acima")
console.log("5. Clique em 'Publicar'")
console.log("")
console.log("🔧 PRINCIPAIS MUDANÇAS:")
console.log("- users_premium: Leitura liberada para verificação de acesso")
console.log("- leads_interessados: Escrita liberada para salvar leads")
console.log("- consultations: Apenas usuários autenticados podem acessar seus dados")
