"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000) // Muda a cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  // Update carousel position when currentSlide changes
  useEffect(() => {
    const container = document.getElementById("carousel-container")
    if (container) {
      container.style.transform = `translateX(-${currentSlide * 100}%)`
    }
  }, [currentSlide])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500/30"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-emerald-500 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  const faqs = [
    {
      question: "O Prescreve AI substitui a consulta médica?",
      answer:
        "Não. O Prescreve AI é uma ferramenta de apoio educacional que utiliza inteligência artificial para fornecer informações gerais sobre medicamentos e práticas médicas. Não constitui consulta médica, diagnóstico ou tratamento. Sempre consulte fontes primárias confiáveis antes de tomar decisões clínicas.",
    },
    {
      question: "Como funciona a assinatura premium?",
      answer:
        "A assinatura premium custa R$ 29,90 por mês e oferece acesso ilimitado ao chat com IA médica, histórico de conversas, respostas em tempo real e suporte técnico especializado. Você pode cancelar a qualquer momento.",
    },
    {
      question: "As informações são confiáveis?",
      answer:
        "As informações são geradas por inteligência artificial treinada com literatura médica atualizada. No entanto, podem conter imprecisões ou informações desatualizadas. É essencial sempre verificar informações em fontes primárias e usar seu julgamento clínico profissional.",
    },
    {
      question: "Meus dados estão seguros?",
      answer:
        "Sim. Utilizamos criptografia de ponta, autenticação segura via Firebase e estamos em conformidade com a LGPD. Seus dados pessoais e conversas são protegidos e nunca compartilhados para fins comerciais.",
    },
    {
      question: "Posso usar no celular?",
      answer:
        "Sim! O Prescreve AI é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode acessar de qualquer lugar, a qualquer hora.",
    },
    {
      question: "Como cancelo minha assinatura?",
      answer:
        "Você pode cancelar sua assinatura a qualquer momento enviando um email para prescrevaaisuporte@gmail.com. O cancelamento será processado em até 48 horas úteis e você manterá acesso até o final do período pago.",
    },
    {
      question: "Há limite de perguntas?",
      answer:
        "Não! Com a assinatura premium você tem acesso ilimitado ao chat com IA médica, podendo fazer quantas perguntas precisar, 24 horas por dia, 7 dias por semana.",
    },
    {
      question: "Preciso ser médico para usar?",
      answer:
        "O serviço é destinado a profissionais de saúde qualificados, estudantes de medicina e profissionais que tenham conhecimento para interpretar informações médicas adequadamente.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-3/4 left-1/6 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-3000" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-4 sm:py-6 animate-in fade-in slide-in-from-top duration-1000">
          <nav className="flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/prescreve-ai-logo.png"
                  alt="Prescreve AI"
                  width={32}
                  height={32}
                  className="sm:w-10 sm:h-10 rounded-lg hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md -z-10 animate-pulse" />
              </div>
              <div>
                <h1
                  className="text-lg sm:text-xl font-semibold text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Prescreve AI
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              <div className="relative inline-block">
                <Image
                  src="/prescreve-ai-logo.png"
                  alt="Prescreve AI"
                  width={120}
                  height={120}
                  className="sm:w-36 sm:h-36 mx-auto mb-6 sm:mb-8 drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-emerald-500/30 rounded-full blur-2xl -z-10 animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl -z-20 animate-pulse delay-1000" />
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
              <Badge className="mb-6 sm:mb-8 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 sm:px-6 py-2 text-sm hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                1257+ Médicos Ativos
              </Badge>
            </div>

            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-600"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Prescreve AI
            </h1>

            <p
              className="text-lg sm:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-800 px-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Revolucione sua prática médica com inteligência artificial especializada em prescrições clínicas precisas
              e fundamentadas
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-1000 px-4">
              <Link href="/premium">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-10 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
                >
                  Garantir Acesso Premium
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-white hover:bg-white/20 border border-white/20 hover:border-white/40 px-10 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  Fazer Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* App Screenshots Carousel - Versão Minimalista com Auto-rotate */}
        <section className="container mx-auto px-4 py-4 sm:py-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
              <p
                className="text-sm sm:text-base text-slate-400 max-w-md mx-auto px-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Interface desenvolvida para médicos
              </p>
            </div>

            <div className="relative max-w-xs sm:max-w-md mx-auto">
              <div className="relative overflow-hidden rounded-lg bg-white/3 backdrop-blur-sm border border-white/5 shadow-sm group">
                <div className="flex transition-transform duration-700 ease-in-out" id="carousel-container">
                  <div className="w-full flex-shrink-0 p-1.5 sm:p-2">
                    <Image
                      src="/app-screenshot-1.png"
                      alt="Interface do Prescreve AI - Menu lateral"
                      width={300}
                      height={200}
                      className="w-full h-auto rounded-md shadow-sm opacity-80"
                    />
                  </div>
                  <div className="w-full flex-shrink-0 p-1.5 sm:p-2">
                    <Image
                      src="/app-screenshot-2.png"
                      alt="Interface do Prescreve AI - Chat principal"
                      width={300}
                      height={200}
                      className="w-full h-auto rounded-md shadow-sm opacity-80"
                    />
                  </div>
                  <div className="w-full flex-shrink-0 p-1.5 sm:p-2">
                    <Image
                      src="/app-screenshot-3.png"
                      alt="Interface do Prescreve AI - Resposta da IA"
                      width={300}
                      height={200}
                      className="w-full h-auto rounded-md shadow-sm opacity-80"
                    />
                  </div>
                </div>

                {/* Navigation Arrows - Apenas para desktop e mais discretas */}
                <button
                  onClick={() => {
                    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
                  }}
                  className="hidden sm:flex absolute left-0.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-black/5 backdrop-blur-sm border border-white/5 rounded-full items-center justify-center text-white/40 hover:text-white/70 hover:bg-black/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-2.5 h-2.5" />
                </button>

                <button
                  onClick={() => {
                    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
                  }}
                  className="hidden sm:flex absolute right-0.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-black/5 backdrop-blur-sm border border-white/5 rounded-full items-center justify-center text-white/40 hover:text-white/70 hover:bg-black/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-2.5 h-2.5" />
                </button>

                {/* Dots Indicator - Extremamente Discretos */}
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                        currentSlide === index ? "bg-white/40" : "bg-white/15"
                      } hover:bg-white/30`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-center hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">1257+</h3>
                  <p className="text-slate-300">Médicos Ativos</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-center hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">24/7</h3>
                  <p className="text-slate-300">
                    {"Disponibilidade -\nEm qualquer celular, sem baixar nenhum aplicativo"}{" "}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-center hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 sm:p-8">
                  <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">99.9%</h3>
                  <p className="text-slate-300">Precisão</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Recursos Revolucionários
              </h2>
              <p
                className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Tecnologia de ponta desenvolvida especificamente para profissionais da saúde
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:scale-105 transition-all duration-500 group animate-in fade-in slide-in-from-left duration-1000 delay-200">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                    IA Especializada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    Algoritmos treinados especificamente para prescrições médicas, diagnósticos clínicos e protocolos
                    terapêuticos
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:scale-105 transition-all duration-500 group animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Segurança Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    Dados criptografados end-to-end com conformidade total às regulamentações médicas internacionais
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:scale-105 transition-all duration-500 group animate-in fade-in slide-in-from-right duration-1000 delay-600">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Precisão Clínica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-base sm:text-lg leading-relaxed">
                    Respostas baseadas em evidências científicas atualizadas e guidelines médicos internacionais
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Por que escolher o Prescreve AI?
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                "Respostas instantâneas para dúvidas clínicas complexas",
                "Base de conhecimento atualizada constantemente com literatura médica",
                "Interface intuitiva desenvolvida por e para médicos",
                "Suporte especializado 24/7 para profissionais da saúde",
                "Integração perfeita com protocolos médicos estabelecidos",
                "Análise de interações medicamentosas em tempo real",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 sm:space-x-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-left duration-1000`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Perguntas Frequentes
              </h2>
              <p
                className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Tire suas principais dúvidas sobre o Prescreve AI
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                    >
                      <h3
                        className="text-base sm:text-lg font-semibold text-white pr-4"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {faq.question}
                      </h3>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-in fade-in slide-in-from-top duration-300">
                        <p
                          className="text-slate-300 text-sm sm:text-base leading-relaxed"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-5xl mx-auto text-center animate-in fade-in slide-in-from-bottom duration-1000">
            <Card className="bg-slate-800 border-2 border-slate-600 hover:scale-105 transition-all duration-500">
              <CardContent className="p-8 sm:p-16">
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
                  </div>
                </div>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Pronto para revolucionar sua prática médica?
                </h2>
                <p
                  className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Junte-se a mais de 1257 médicos que já confiam no Prescreve AI para decisões clínicas mais precisas e
                  eficientes
                </p>
                <Link href="/premium">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 max-w-full"
                  >
                    Garantir Acesso Premium
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 sm:py-12 border-t border-white/10 animate-in fade-in duration-1000">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="relative">
                <Image src="/prescreve-ai-logo.png" alt="Prescreve AI" width={36} height={36} className="rounded-lg" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md -z-10" />
              </div>
              <div>
                <p className="text-slate-400 text-base sm:text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
                  © 2024 Prescreve AI. Todos os direitos reservados.
                </p>
                <p className="text-slate-500 text-sm">Desenvolvido com ❤️ para profissionais da saúde</p>
              </div>
            </div>
            <div className="flex space-x-6 sm:space-x-8">
              <Link
                href="/login"
                className="text-slate-400 hover:text-white transition-colors duration-300 text-base sm:text-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-slate-400 hover:text-white transition-colors duration-300 text-base sm:text-lg"
              >
                Registro
              </Link>
            </div>
          </div>

          {/* Disclaimer Legal - BEM DISCRETO */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-500 opacity-60">
                Este serviço é fornecido "como está" para fins educacionais e informativos.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 opacity-60">
                <Link href="/disclaimer" className="hover:text-slate-400 transition-colors">
                  Disclaimer Legal
                </Link>
                <span>•</span>
                <Link href="/privacidade" className="hover:text-slate-400 transition-colors">
                  Política de Privacidade
                </Link>
                <span>•</span>
                <Link href="/termos" className="hover:text-slate-400 transition-colors">
                  Termos de Uso
                </Link>
              </div>
              <p className="text-xs text-slate-500 opacity-50 max-w-4xl mx-auto leading-relaxed">
                <em>
                  O Prescreve AI é uma ferramenta de apoio educacional que utiliza inteligência artificial. NÃO
                  constitui consulta médica, diagnóstico ou tratamento. Sempre consulte fontes primárias confiáveis e
                  use seu julgamento clínico profissional. Uso por conta e risco.
                </em>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
