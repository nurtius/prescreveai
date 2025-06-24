"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/prescreve-ai-logo.png" alt="Prescreve AI" width={40} height={40} className="rounded-xl" />
              <span className="text-xl font-bold text-white">Prescreve AI</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Termos de Uso</h1>
              <p className="text-xl text-slate-300">Prescreve AI - Condições de Utilização</p>
            </div>

            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-6 h-6 mr-3 text-emerald-400" />
                    Aceitação dos Termos
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Ao acessar e utilizar o Prescreve AI, você declara que:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Leu, compreendeu e concorda com estes termos</li>
                    <li>É maior de 18 anos e capaz juridicamente</li>
                    <li>É profissional de saúde ou estudante de medicina</li>
                    <li>Utilizará o serviço de forma ética e responsável</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-blue-400" />
                    Descrição do Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>O Prescreve AI é uma plataforma que oferece:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Consultas sobre prescrições médicas via inteligência artificial</li>
                    <li>Histórico de consultas realizadas</li>
                    <li>Suporte técnico via email</li>
                    <li>Acesso mediante assinatura mensal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-red-400" />
                    Limitações e Responsabilidades
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="font-semibold text-red-300 mb-2">⚠️ AVISO IMPORTANTE:</p>
                    <p>O Prescreve AI é uma ferramenta de apoio educacional e NÃO substitui:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Consulta médica presencial</li>
                      <li>Diagnóstico médico profissional</li>
                      <li>Prescrição médica oficial</li>
                      <li>Orientação médica personalizada</li>
                    </ul>
                  </div>
                  <p>O usuário é totalmente responsável por:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Verificar todas as informações fornecidas</li>
                    <li>Consultar fontes médicas oficiais</li>
                    <li>Buscar orientação médica adequada</li>
                    <li>Não utilizar as informações como diagnóstico final</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-yellow-400" />
                    Uso Adequado
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>É permitido:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Usar para fins educacionais e de pesquisa</li>
                    <li>Consultar informações sobre medicamentos</li>
                    <li>Obter orientações gerais sobre prescrições</li>
                    <li>Utilizar como ferramenta de apoio ao estudo</li>
                  </ul>
                  <p className="text-red-300 font-semibold">É PROIBIDO:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Usar as informações como prescrição médica oficial</li>
                    <li>Substituir consulta médica presencial</li>
                    <li>Compartilhar informações de pacientes</li>
                    <li>Usar para diagnósticos definitivos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-purple-400" />
                    Privacidade e Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Comprometemo-nos a:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Proteger seus dados pessoais</li>
                    <li>Não compartilhar informações com terceiros</li>
                    <li>Manter sigilo das consultas realizadas</li>
                    <li>Seguir a LGPD (Lei Geral de Proteção de Dados)</li>
                  </ul>
                  <p>Seus dados são utilizados apenas para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Funcionamento do serviço</li>
                    <li>Histórico de consultas</li>
                    <li>Melhorias na plataforma</li>
                    <li>Suporte técnico quando necessário</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-green-400" />
                    Assinatura e Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Condições da assinatura:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Cobrança mensal recorrente</li>
                    <li>Cancelamento a qualquer momento</li>
                    <li>Acesso imediato após confirmação do pagamento</li>
                    <li>Sem reembolso de períodos já utilizados</li>
                  </ul>
                  <p>Em caso de não pagamento:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Acesso será suspenso automaticamente</li>
                    <li>Dados serão mantidos por 30 dias</li>
                    <li>Após 30 dias, conta será excluída permanentemente</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-orange-400" />
                    Modificações e Atualizações
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Reservamo-nos o direito de:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Modificar estes termos a qualquer momento</li>
                    <li>Atualizar funcionalidades da plataforma</li>
                    <li>Suspender o serviço para manutenção</li>
                    <li>Descontinuar o serviço mediante aviso prévio</li>
                  </ul>
                  <p>Usuários serão notificados sobre:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mudanças significativas nos termos</li>
                    <li>Atualizações importantes do sistema</li>
                    <li>Manutenções programadas</li>
                    <li>Alterações na política de privacidade</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-cyan-400" />
                    Contato e Suporte
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Para dúvidas, suporte ou reclamações:</p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p>
                      <strong>Email:</strong> suporte@prescreve-ai.com
                    </p>
                    <p>
                      <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                    </p>
                    <p>
                      <strong>Tempo de resposta:</strong> Até 24 horas úteis
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>
                <Link href="/">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
