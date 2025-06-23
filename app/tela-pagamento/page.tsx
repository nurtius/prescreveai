"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Sparkles, Zap, Shield, Star, ArrowRight, Lock } from "lucide-react"
import Link from "next/link"

export default function TelaPagamento() {
  const handlePagamento = () => {
    window.open("https://tribopay.com.br/prescreve-ai-premium", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">🔒 Conteúdo Exclusivo</h1>
            <p className="text-slate-300 text-lg">Este conteúdo é exclusivo para assinantes</p>
          </div>

          {/* Card Principal */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-center py-6">
              <CardTitle className="text-2xl font-bold text-black flex items-center justify-center">
                <Crown className="w-6 h-6 mr-2" />
                Prescreve AI Premium
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              {/* Benefícios */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Consultas Ilimitadas</h3>
                    <p className="text-sm text-slate-600">Sem limites de perguntas</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Respostas Instantâneas</h3>
                    <p className="text-sm text-slate-600">IA especializada em medicina</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Histórico Completo</h3>
                    <p className="text-sm text-slate-600">Acesso a todas suas consultas</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-center">
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-700">+1.000 médicos já confiam</p>
                <p className="text-xs text-slate-500">no Prescreve AI</p>
              </div>

              {/* Call to Action */}
              <Button
                onClick={handlePagamento}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 text-lg rounded-xl transition-all duration-200 hover:scale-105 shadow-xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Quero Acessar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Urgência */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mt-4 text-center">
                <p className="text-emerald-700 font-semibold text-sm">⏰ Economize 2+ horas por dia</p>
                <p className="text-emerald-600 text-xs">Mais tempo para seus pacientes</p>
              </div>

              {/* Link de volta */}
              <div className="text-center mt-6">
                <Link href="/login" className="text-sm text-slate-500 hover:text-slate-700 underline">
                  Voltar ao login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
