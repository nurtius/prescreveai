// Script para configurar as coleções do Firestore para o sistema premium
// Execute este script no console do Firebase ou use o Firebase Admin SDK

// Estrutura das coleções:

// 1. users_premium Collection (controla acesso ao app)
const userPremiumExample = {
  // Documento ID = email do usuário
  email: "medico@exemplo.com",
  ativo: true,
  data_assinatura: "2024-01-15T10:00:00.000Z",
  plano: "premium_mensal",
  webhook_origem: "tribopay",
}

// 2. leads_interessados Collection (emails que tentaram acessar sem ser premium)
const leadInteressadoExample = {
  // Documento ID = email do usuário
  email: "interessado@exemplo.com",
  data_tentativa: "2024-01-15T10:30:00.000Z",
}

// 3. consultations Collection (histórico de conversas - máximo 10 por usuário)
const consultationExample = {
  email: "medico@exemplo.com",
  pergunta: "Qual a dosagem recomendada de amoxicilina para adultos?",
  resposta: "A dosagem padrão de amoxicilina para adultos é...",
  data_hora: "2024-01-15T10:30:00.000Z",
}

// Regras de segurança do Firestore:
const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // users_premium collection - apenas leitura para verificar acesso
    match /users_premium/{email} {
      allow read: if request.auth != null;
      allow write: if false; // Apenas admin/webhook pode escrever
    }
    
    // leads_interessados collection - apenas escrita para salvar leads
    match /leads_interessados/{email} {
      allow read: if false; // Não precisa ler
      allow write: if true; // Qualquer um pode escrever (para salvar leads)
    }
    
    // consultations collection - usuários podem ler/escrever suas próprias conversas
    match /consultations/{consultationId} {
      allow read, write: if request.auth != null && 
        request.auth.token.email == resource.data.email;
      allow create: if request.auth != null && 
        request.auth.token.email == request.resource.data.email;
    }
  }
}
`

// Índices necessários:
const requiredIndexes = [
  {
    collection: "consultations",
    fields: [
      { field: "email", order: "ASCENDING" },
      { field: "data_hora", order: "DESCENDING" },
    ],
  },
]

console.log("Configuração do Firestore Premium preparada!")
console.log("1. Crie as coleções: users_premium, leads_interessados, consultations")
console.log("2. Configure as regras de segurança acima")
console.log("3. Configure os índices necessários para queries")
console.log("4. A coleção users_premium será preenchida via webhook do Make.com")
console.log("5. A coleção leads_interessados captura emails de interessados")
console.log("6. A coleção consultations mantém histórico de até 10 conversas por usuário")
