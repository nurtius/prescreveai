"use client"

import type React from "react"
import { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { checkPremiumAccess } from "@/lib/firebase-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(false)
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<"email" | "password">("email")
  const router = useRouter()

  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setCheckingAccess(true)
    setError("")

    try {
      const hasPremiumAccess = await checkPremiumAccess(email)

      if (hasPremiumAccess) {
        setStep("password")
      } else {
        router.push("/premium")
      }
    } catch (error) {
      console.error("Error checking email access:", error)
      setError("Erro ao verificar acesso. Tente novamente.")
    } finally {
      setCheckingAccess(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (!userCredential.user.emailVerified) {
        setError("Por favor, verifique seu email antes de fazer login")
        setLoading(false)
        return
      }

      console.log("Login successful, redirecting...")
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("Login error:", error)

      switch (error.code) {
        case "auth/user-not-found":
          setError("Usuário não encontrado")
          break
        case "auth/wrong-password":
          setError("Senha incorreta")
          break
        case "auth/invalid-email":
          setError("Email inválido")
          break
        case "auth/user-disabled":
          setError("Conta desabilitada")
          break
        case "auth/too-many-requests":
          setError("Muitas tentativas. Tente novamente mais tarde")
          break
        case "auth/invalid-credential":
          setError("Credenciais inválidas. Verifique email e senha")
          break
        default:
          setError("Erro ao fazer login. Verifique suas credenciais")
      }
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Digite seu email para recuperar a senha")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setResetSent(true)
    } catch (error) {
      setError("Erro ao enviar email de recuperação")
    }
  }

  const handleBackToEmail = () => {
    setStep("email")
    setPassword("")
    setError("")
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
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
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
            <h1 className="text-5xl font-semibold text-white mb-4 tracking-tight animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
              Prescreve AI
            </h1>
            <p className="text-slate-300 text-xl animate-in fade-in slide-in-from-top-4 duration-700 delay-400">
              Seu assistente médico inteligente
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-2xl font-semibold text-slate-800 mb-2">
                {step === "email" ? "Acesse sua conta" : "Digite sua senha"}
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                {step === "email"
                  ? "Digite seu email para verificar o acesso"
                  : `Bem-vindo de volta, ${email.split("@")[0]}`}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {resetSent ? (
                <Alert className="mb-6 border-emerald-200 bg-emerald-50/80 backdrop-blur-sm animate-in fade-in duration-500">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <AlertDescription className="text-emerald-800 font-medium">
                    Email de recuperação enviado! Verifique sua caixa de entrada.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  {step === "email" ? (
                    <form onSubmit={handleEmailCheck} className="space-y-6">
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="h-12 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                          required
                        />
                      </div>

                      {error && (
                        <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm animate-in fade-in duration-300">
                          <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        disabled={checkingAccess}
                      >
                        {checkingAccess && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        Continuar
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-3">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                          Senha
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                      {error && (
                        <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm animate-in fade-in duration-300">
                          <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        Entrar
                      </Button>

                      <div className="flex justify-between items-center text-sm">
                        <button
                          type="button"
                          onClick={handleBackToEmail}
                          className="flex items-center text-slate-500 hover:text-slate-700 transition-colors duration-200 font-medium"
                        >
                          <ArrowLeft className="w-4 h-4 mr-1" />
                          Voltar
                        </button>
                        <button
                          type="button"
                          onClick={handlePasswordReset}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200 font-medium"
                        >
                          Esqueci minha senha
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="text-center mt-8 text-sm text-slate-600">
                    Não tem conta?{" "}
                    <Link
                      href="/register"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Criar conta
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
