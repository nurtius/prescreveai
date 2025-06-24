"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Crown,
  CheckCircle,
  ArrowRight,
  Brain,
  MessageSquare,
  Shield,
  Clock,
  Zap,
  Users,
  Star,
  Sparkles,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PremiumPage() {
  const handleCheckout = () => {
    // Redirecionar para checkout TriboPay
    window.open("https://checkout.tribopay.com.br/prescreve-ai-premium", "_blank")
  }

  const features = [
    {
      icon: Brain,
      title: "IA Médica Avançada",
      description: "Acesso ilimitado ao chat com inteligência artificial especializada em medicina",
    },
    {
      icon: MessageSquare,
      title: "Chat Ilimitado",
      description: "Faça quantas perguntas precisar, 24 horas por dia, 7 dias por semana",
    },
    {
      icon: Clock,
      title: "Histórico Completo",
      description: "Todas suas conversas salvas e organizadas para consulta posterior",
    },
    {
      icon: Zap,
      title: "Respostas Instantâneas",
      description: "Processamento em tempo real para decisões clínicas rápidas",
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Dados criptografados e conformidade com LGPD e regulamentações médicas",
    },
    {
      icon: Users,
      title: "Suporte Especializado",
      description: "Atendimento técnico prioritário via email e WhatsApp",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Carlos Silva",
      specialty: "Cardiologia",
      text: "Revolucionou minha prática. Respostas precisas em segundos, principalmente para interações medicamentosas complexas.",
      rating: 5,
    },
    {
      name: "Dra. Ana Santos",
      specialty: "Pediatria",
      text: "Indispensável para dosagens pediátricas. A IA considera peso, idade e contraindicações automaticamente.",
      rating: 5,
    },
    {
      name: "Dr. Roberto Lima",
      specialty: "Clínica Geral",
      text: "Aumentou minha confiança nas prescrições e otimizou meu tempo de consulta significativamente.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

      {/* Animated elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/prescreve-ai-logo.png" alt="Prescreve AI" width={40} height={40} className="rounded-xl" />
              <span className="text-xl font-bold text-white">Prescreve AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-white border border-white/20 hover:bg-white/10 hover:text-white px-4 sm:px-6 py-2 sm:py-3"
                >
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 mb-6 text-sm sm:text-base">
              <Crown className="w-4 h-4 mr-2" />
              Acesso Premium Necessário
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Desbloqueie o Poder da
              <span className="block text-emerald-400 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                IA Médica Premium
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 px-4">
              Junte-se a mais de 1257 médicos que já revolucionaram sua prática com o Prescreve AI Premium
            </p>

            {/* Pricing Card */}
            <div className="max-w-md mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
              <Card className="bg-slate-800 border-2 border-emerald-400/60 shadow-2xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-emerald-400" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-2">Plano Premium</CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-emerald-400">R$ 29,90</span>
                    <span className="text-slate-300">/mês</span>
                  </div>
                  <CardDescription className="text-slate-300 mt-2">Cancele a qualquer momento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Chat ilimitado com IA médica",
                    "Histórico completo de conversas",
                    "Respostas em tempo real",
                    "Suporte técnico prioritário",
                    "Atualizações automáticas",
                    "Segurança e privacidade total",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800">
              <Button
                onClick={handleCheckout}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6"
              >
                Quero Acesso Premium
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-xs sm:text-sm text-slate-400 mt-3">Pagamento seguro via TriboPay</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
              O que você ganha com o Premium
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-slate-800 border-2 border-slate-600 hover:border-emerald-400/50 hover:bg-slate-700 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-slate-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
              O que dizem nossos médicos
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-slate-800 border-2 border-slate-600 hover:border-emerald-400/50 hover:bg-slate-700 transition-all duration-300"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 mb-3 sm:mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-slate-400">{testimonial.specialty}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800 border-2 border-slate-600">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
                  Precisa de ajuda? Entre em contato
                </h2>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                    <p className="text-slate-300">prescrevaaisuporte@gmail.com</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
                    <p className="text-slate-300">Disponível após contratação</p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Alert className="bg-yellow-500/10 border-yellow-500/30 max-w-md mx-auto">
                    <CreditCard className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-200">
                      <strong>Pagamento seguro:</strong> Processado via TriboPay com criptografia bancária
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-slate-800 border-2 border-emerald-400/60">
              <CardContent className="p-6 sm:p-8">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Transforme sua prática médica hoje
                </h2>
                <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8">
                  Mais de 1257 médicos já revolucionaram sua prática com o Prescreve AI
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCheckout}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 sm:px-12 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Quero Acesso Premium
                  </Button>
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="text-white border border-white/20 hover:bg-white/10 hover:text-white px-8 sm:px-12 py-5 sm:py-6 rounded-xl"
                    >
                      Voltar ao Início
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-8 border-t border-white/10">
          <div className="text-center text-slate-400 text-sm">© 2024 Prescreve AI. Todos os direitos reservados.</div>
        </div>
      </div>
    </div>
  )
}
