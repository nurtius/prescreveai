"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, FileText, Users, Lock, Mail, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PrivacidadePage() {
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
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Política de Privacidade</h1>
              <p className="text-xl text-slate-300">Prescreve AI - Proteção de Dados</p>
            </div>

            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-emerald-400" />
                    Informações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Sobre Este Documento</h3>
                    <p>
                      Este documento estabelece os termos e condições de uso do Prescreve AI, bem como nossa política de
                      privacidade e tratamento de dados pessoais, em conformidade com a Lei Geral de Proteção de Dados
                      (LGPD - Lei 13.709/2018) e demais legislações aplicáveis.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Definições</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        <strong>"Prescreve AI", "Plataforma", "Serviço":</strong> Refere-se ao aplicativo web e todos os
                        serviços oferecidos
                      </li>
                      <li>
                        <strong>"Usuário", "Você":</strong> Pessoa física que utiliza nossos serviços
                      </li>
                      <li>
                        <strong>"Dados Pessoais":</strong> Informações relacionadas a pessoa natural identificada ou
                        identificável
                      </li>
                      <li>
                        <strong>"Controlador":</strong> Prescreve AI, responsável pelas decisões sobre o tratamento de
                        dados pessoais
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-6 h-6 mr-3 text-blue-400" />
                    Dados Coletados
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Dados de Cadastro:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nome completo</li>
                      <li>Email</li>
                      <li>Profissão/área de atuação</li>
                      <li>Senha (criptografada)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Dados de Uso:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Consultas realizadas</li>
                      <li>Histórico de perguntas e respostas</li>
                      <li>Data e hora de acesso</li>
                      <li>Informações de dispositivo e navegador</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Dados de Pagamento:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Processados exclusivamente pela TriboPay</li>
                      <li>Não armazenamos dados de cartão de crédito</li>
                      <li>Mantemos apenas status da assinatura</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-purple-400" />
                    Finalidades do Tratamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Prestação do Serviço:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Autenticação e controle de acesso</li>
                      <li>Processamento de consultas via IA</li>
                      <li>Manutenção do histórico pessoal</li>
                      <li>Comunicação com usuários</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Gestão Comercial:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Controle de assinaturas e pagamentos</li>
                      <li>Suporte técnico e atendimento</li>
                      <li>Análise de uso para melhorias</li>
                      <li>Comunicação sobre atualizações</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-emerald-400" />
                    Base Legal (LGPD)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Execução de contrato (Art. 7º, V):</strong> Prestação do serviço contratado
                    </li>
                    <li>
                      <strong>Legítimo interesse (Art. 7º, IX):</strong> Melhorias do serviço e suporte
                    </li>
                    <li>
                      <strong>Consentimento (Art. 7º, I):</strong> Comunicações promocionais (quando aplicável)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-6 h-6 mr-3 text-yellow-400" />
                    Compartilhamento de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Terceiros Autorizados:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>TriboPay: Processamento de pagamentos</li>
                      <li>Firebase/Google: Hospedagem e autenticação</li>
                      <li>DeepSeek: Processamento de consultas via IA</li>
                      <li>Make.com: Integração de sistemas</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Não Compartilhamos:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dados com finalidade comercial</li>
                      <li>Informações para marketing de terceiros</li>
                      <li>Conteúdo das consultas médicas</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-red-400" />
                    Segurança dos Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Medidas Implementadas:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Criptografia de dados sensíveis</li>
                      <li>Autenticação segura (Firebase Auth)</li>
                      <li>Acesso restrito por funções</li>
                      <li>Monitoramento de segurança</li>
                      <li>Backup regular dos dados</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Compromisso:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Notificação em caso de vazamento</li>
                      <li>Implementação de correções imediatas</li>
                      <li>Transparência sobre incidentes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-emerald-500/10 backdrop-blur-xl border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-emerald-300 flex items-center">
                    <Users className="w-6 h-6 mr-3" />
                    Direitos do Titular (LGPD)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-emerald-200 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-100 mb-3">Você tem direito a:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Confirmação da existência de tratamento</li>
                      <li>Acesso aos dados pessoais</li>
                      <li>Correção de dados incompletos/incorretos</li>
                      <li>Anonimização, bloqueio ou eliminação de dados</li>
                      <li>Portabilidade para outro fornecedor</li>
                      <li>Informação sobre compartilhamento</li>
                      <li>Revogação do consentimento</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-emerald-100 mb-3">Como exercer seus direitos:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Email: prescrevaaisuporte@gmail.com</li>
                      <li>Resposta em até 15 dias úteis</li>
                      <li>Solicitação gratuita (primeira vez)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-blue-400" />
                    Retenção de Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Durante a Assinatura:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dados mantidos para prestação do serviço</li>
                      <li>Histórico de consultas preservado</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Após Cancelamento:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dados de cadastro: 5 anos (prazo legal)</li>
                      <li>Histórico de consultas: 2 anos</li>
                      <li>Dados de pagamento: conforme legislação fiscal</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Exclusão Antecipada:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Solicitação expressa do usuário</li>
                      <li>Cumprimento de obrigações legais</li>
                      <li>Direito ao esquecimento (quando aplicável)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-emerald-400" />
                    Contato e Suporte
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Suporte Técnico:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Email: prescrevaaisuporte@gmail.com</li>
                      <li>Horário: Segunda a sexta, 9h às 18h</li>
                      <li>Prazo de resposta: até 48 horas úteis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Encarregado de Dados (DPO):</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Email: prescrevaaisuporte@gmail.com</li>
                      <li>Responsável por questões de privacidade</li>
                      <li>Contato para exercício de direitos LGPD</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-500/10 backdrop-blur-xl border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Declaração de Conformidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-200 space-y-4">
                  <p className="text-lg font-semibold">DECLARAMOS QUE:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Este documento está em conformidade com a LGPD</li>
                    <li>Implementamos medidas de segurança adequadas</li>
                    <li>Respeitamos todos os direitos dos titulares de dados</li>
                    <li>Mantemos transparência no tratamento de dados pessoais</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center text-slate-400 text-sm space-y-2">
                <p>Última atualização: Dezembro 2024</p>
                <p>Versão: 1.0</p>
                <p>Email: prescrevaaisuporte@gmail.com</p>
                <p className="font-semibold">
                  Este documento foi elaborado considerando as melhores práticas de privacidade e proteção de dados, em
                  conformidade com a legislação brasileira vigente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
