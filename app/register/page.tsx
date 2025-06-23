"use client"

import type React from "react"
import { useState } from "react"
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { checkPremiumAccess, saveLeadEmail } from "@/lib/firebase-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Eye, EyeOff, CheckCircle, ArrowLeft, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(false)
  const [error, setError] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState<"email" | "form">("email")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    setCheckingAccess(true)
    setError("")

    try {
      const hasPremiumAccess = await checkPremiumAccess(formData.email)

      if (hasPremiumAccess) {
        setStep("form")
      } else {
        // Salvar como lead e redirecionar para página premium
        try {
          await saveLeadEmail(formData.email)
        } catch (saveError) {
          console.log("Erro ao salvar lead, mas continuando...")
        }
        router.push("/premium")
      }
    } catch (error) {
      console.error("Error checking email access:", error)
      setError("Erro ao verificar acesso. Tente novamente.")
    } finally {
      setCheckingAccess(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      })

      await sendEmailVerification(userCredential.user)
      setVerificationSent(true)
    } catch (error: any) {
      console.error("Registration error:", error)

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Este email já está em uso")
          break
        case "auth/invalid-email":
          setError("Email inválido")
          break
        case "auth/operation-not-allowed":
          setError("Operação não permitida")
          break
        case "auth/weak-password":
          setError("Senha muito fraca")
          break
        default:
          setError("Erro ao criar conta. Tente novamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setStep("email")
    setError("")
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

        {/* Animated elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <CheckCircle className="w-20 h-20 text-emerald-400 drop-shadow-2xl" />
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl -z-10 animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">Verifique seu Email</h1>
              <p className="text-slate-300 text-lg">Quase pronto! Só falta confirmar seu email</p>
            </div>

            <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-2xl">
              <CardContent className="space-y-6 pt-8 pb-8 px-6 sm:px-8">
                {/* Email enviado */}
                <Alert className="border-emerald-200 bg-emerald-50/80 backdrop-blur-sm">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <AlertDescription className="text-emerald-800 font-medium">
                    Enviamos um email de verificação para <strong>{formData.email}</strong>
                  </AlertDescription>
                </Alert>

                {/* Aviso importante sobre spam */}
                <Alert className="border-amber-200 bg-amber-50/80 backdrop-blur-sm">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <div className="font-semibold mb-2">⚠️ IMPORTANTE - Verifique sua caixa de SPAM/LIXO ELETRÔNICO</div>
                    <div className="text-sm space-y-1">
                      <p>• O email pode ter ido para a pasta de spam ou lixo eletrônico</p>
                      <p>• Verifique todas as pastas do seu email</p>
                      <p>• Se encontrar na spam, marque como "não é spam"</p>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Instruções detalhadas */}
                <Alert className="border-blue-200 bg-blue-50/80 backdrop-blur-sm">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <div className="font-semibold mb-2">📧 Como proceder:</div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>1.</strong> Abra seu email e procure por "Prescreve AI"
                      </p>
                      <p>
                        <strong>2.</strong> Verifique SPAM, Lixo Eletrônico e Promoções
                      </p>
                      <p>
                        <strong>3.</strong> Clique no link de verificação
                      </p>
                      <p>
                        <strong>4.</strong> Retorne aqui e faça login
                      </p>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Botões de ação */}
                <div className="space-y-3 pt-4">
                  <Link href="/login">
                    <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
                      Já Verifiquei - Fazer Login
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200"
                    onClick={() => window.location.reload()}
                  >
                    Reenviar Email de Verificação
                  </Button>
                </div>

                {/* Suporte */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">Não recebeu o email?</p>
                  <p className="text-xs text-slate-500">
                    Entre em contato: <strong>prescrevaaisuporte@gmail.com</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

      {/* Animated elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <Image
                  src="/prescreve-ai-logo.png"
                  alt="Prescreve AI"
                  width={120}
                  height={120}
                  className="drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl -z-10 animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl font-semibold text-white mb-4 tracking-tight">Prescreve AI</h1>
            <p className="text-slate-300 text-xl">Crie sua conta premium</p>
          </div>

          {/* Register Card */}
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-2xl">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-semibold text-slate-800 mb-2">
                {step === "email" ? "Verificar Acesso" : "Criar Conta"}
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                {step === "email"
                  ? "Digite seu email para verificar o acesso premium"
                  : "Complete seus dados para criar a conta"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {step === "email" ? (
                <form onSubmit={handleEmailCheck} className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                      required
                    />
                  </div>

                  {error && (
                    <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                      <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={checkingAccess}
                  >
                    {checkingAccess && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Verificar Acesso
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700 block">
                      Nome Completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. João Silva"
                      className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email-display" className="text-sm font-medium text-slate-700 block">
                      Email
                    </label>
                    <Input
                      id="email-display"
                      type="email"
                      value={formData.email}
                      className="h-12 border-slate-200 bg-slate-50 rounded-xl"
                      disabled
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                      Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 pr-12 transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 block">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Digite sua senha novamente"
                        className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 pr-12 transition-all duration-200"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                      <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Criar Conta
                  </Button>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleBackToEmail}
                      className="flex items-center text-slate-500 hover:text-slate-700 transition-colors duration-200 font-medium text-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Voltar
                    </button>
                  </div>
                </form>
              )}

              <div className="text-center mt-8 text-sm text-slate-600">
                Já tem conta?{" "}
                <Link
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 hover:underline"
                >
                  Fazer login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
