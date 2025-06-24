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
                    <li>Acesso mediante assinatura mensal\
