// Script para configurar as coleções do Firestore
// Execute este script no console do Firebase ou use o Firebase Admin SDK

// Estrutura das coleções:

// 1. Users Collection
const userExample = {
  email: "medico@exemplo.com",
  name: "Dr. João Silva",
  premium: false,
  uid: "firebase-user-uid",
  dailyCount: 0,
  lastUsed: "2024-01-15",
  createdAt: "2024-01-15T10:00:00.000Z",
}

// 2. Consultations Collection
const consultationExample = {
  userId: "firebase-user-uid",
  userEmail: "medico@exemplo.com",
  question: "Qual a dosagem recomendada de amoxicilina para adultos?",
  response: "A dosagem padrão de amoxicilina para adultos é...",
  timestamp: "2024-01-15T10:30:00.000Z",
  responseTimestamp: "2024-01-15T10:30:05.000Z",
}

// 3. Subscribers Collection (para controle de usuários premium)
const subscriberExample = {
  email: "medico@exemplo.com",
  subscriptionDate: "2024-01-15T10:00:00.000Z",
  active: true,
  paymentProvider: "TriboPay",
}

// Regras de segurança do Firestore:
const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only access their own data
    match /Users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Consultations collection - users can only access their own consultations
    match /Consultations/{consultationId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email == resource.data.userEmail);
    }
    
    // Subscribers collection - read only for authenticated users to check premium status
    match /Subscribers/{email} {
      allow read: if request.auth != null;
      allow write: if false; // Only admin can write
    }
  }
}
`

console.log("Configuração do Firestore preparada!")
console.log("1. Crie as coleções: Users, Consultations, Subscribers")
console.log("2. Configure as regras de segurança acima")
console.log("3. Configure os índices necessários para queries")
