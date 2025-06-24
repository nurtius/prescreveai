# Prescreve AI - Assistente Médico Inteligente

## Deploy no Netlify

### Passo a passo para deploy:

1. **Preparar o repositório no GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/prescreve-ai.git
   git push -u origin main
   \`\`\`

2. **Configurar variáveis de ambiente no Netlify:**
   - Acesse o painel do Netlify
   - Vá em Site settings > Environment variables
   - Adicione as seguintes variáveis:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`

3. **Deploy automático:**
   - Conecte seu repositório GitHub ao Netlify
   - O build será automático usando as configurações do `netlify.toml`

### Configurações importantes:
- Build command: `npm run build`
- Publish directory: `out`
- Node version: 18

### Estrutura do projeto otimizada para Netlify:
- Static export habilitado
- Imagens otimizadas desabilitadas (compatibilidade)
- Redirects configurados para SPA
- Variáveis de ambiente com prefixo NEXT_PUBLIC_
