"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ArrowLeft, Shield, FileText, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DisclaimerPage() {
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
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Disclaimer Legal</h1>
              <p className="text-xl text-slate-300">Prescreve AI - Aviso Importante</p>
            </div>

            <Alert className="mb-8 border-red-200 bg-red-50/10 backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <AlertDescription className="text-red-200 font-medium text-lg">
                <strong>LEIA ANTES DE USAR</strong> - Este serviço NÃO constitui consulta médica, diagnóstico ou
                tratamento.
              </AlertDescription>
            </Alert>

            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-emerald-400" />
                    Natureza do Serviço
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>
                    O Prescreve AI é uma ferramenta de apoio educacional e informativo que utiliza inteligência
                    artificial para fornecer informações gerais sobre medicamentos e práticas médicas. Este serviço{" "}
                    <strong>
                      NÃO constitui consulta médica, diagnóstico, tratamento ou aconselhamento médico profissional
                    </strong>
                    .
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-yellow-400" />
                    Limitações e Responsabilidades
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">1. NÃO É FONTE PRIMÁRIA DE INFORMAÇÃO</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>
                        As informações fornecidas são geradas por inteligência artificial e podem conter imprecisões,
                        erros ou informações desatualizadas
                      </li>
                      <li>
                        Este serviço é apenas um facilitador de busca e não substitui literatura médica oficial, bulas,
                        protocolos institucionais ou guidelines médicas
                      </li>
                      <li>Sempre consulte fontes primárias confiáveis antes de tomar decisões clínicas</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">2. RESPONSABILIDADE PROFISSIONAL</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>O usuário é inteiramente responsável por todas as decisões médicas tomadas</li>
                      <li>
                        Toda prescrição, diagnóstico ou conduta médica deve ser baseada no julgamento clínico
                        profissional do médico
                      </li>
                      <li>
                        Este serviço não assume qualquer responsabilidade por decisões tomadas com base nas informações
                        fornecidas
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">3. LIMITAÇÕES TÉCNICAS</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>A inteligência artificial pode gerar informações incorretas, incompletas ou inapropriadas</li>
                      <li>
                        As respostas podem não refletir as mais recentes descobertas médicas ou mudanças em protocolos
                      </li>
                      <li>Informações podem não ser aplicáveis a casos específicos ou populações especiais</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-500/10 backdrop-blur-xl border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-3" />
                    USO POR CONTA E RISCO
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-red-200 space-y-4">
                  <p className="text-lg font-semibold">VOCÊ UTILIZA ESTE SERVIÇO INTEIRAMENTE POR SUA CONTA E RISCO</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Não nos responsabilizamos por consequências diretas ou indiretas do uso das informações</li>
                    <li>
                      Não garantimos a precisão, completude ou adequação das informações para qualquer propósito
                      específico
                    </li>
                    <li>
                      Não assumimos responsabilidade por danos resultantes do uso ou impossibilidade de uso do serviço
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-blue-400" />
                    Obrigações do Usuário
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>O usuário deve estar ciente e cumprir:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Código de Ética Médica</li>
                    <li>Regulamentações do CFM</li>
                    <li>Lei Geral de Proteção de Dados (LGPD)</li>
                    <li>Código de Defesa do Consumidor</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-emerald-400" />
                    Contato e Suporte
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                  <p>Para dúvidas sobre este disclaimer ou questões técnicas:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: prescrevaaisuporte@gmail.com</li>
                    <li>Não fornecemos suporte para questões médicas ou clínicas</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-emerald-500/10 backdrop-blur-xl border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-emerald-300">Declaração de Concordância</CardTitle>
                </CardHeader>
                <CardContent className="text-emerald-200 space-y-4">
                  <p className="text-lg font-semibold">AO UTILIZAR ESTE SERVIÇO, VOCÊ DECLARA QUE:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Leu e compreendeu integralmente este disclaimer</li>
                    <li>Concorda com todos os termos e limitações apresentados</li>
                    <li>Assume integral responsabilidade pelo uso das informações</li>
                    <li>É um profissional qualificado para interpretar informações médicas</li>
                    <li>Utilizará o serviço apenas como ferramenta de apoio</li>
                    <li>Sempre verificará informações em fontes primárias confiáveis</li>
                  </ul>

                  <Alert className="bg-red-500/20 border-red-500/50 mt-6">
                    <AlertTriangle className="h-4 w-4 text-red-300" />
                    <AlertDescription className="text-red-200 font-medium">
                      SE VOCÊ NÃO CONCORDA COM ESTES TERMOS, NÃO UTILIZE ESTE SERVIÇO
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <div className="text-center text-slate-400 text-sm space-y-2">
                <p>Última atualização: Dezembro 2024</p>
                <p>Versão: 1.0</p>
                <p className="font-semibold">
                  IMPORTANTE: Este disclaimer deve ser aceito explicitamente pelo usuário antes do primeiro uso e estar
                  sempre visível durante a utilização do serviço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
