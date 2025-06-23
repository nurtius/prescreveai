"use client"

import type React from "react"

import { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      setError("Email ou senha incorretos")
    } finally {
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

  return (
    <div className="min-h-screen bg-[#0B132B] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#0B132B]">Prescreve AI</CardTitle>
          <CardDescription>Entre na sua conta para acessar o assistente médico</CardDescription>
        </CardHeader>
        <CardContent>
          {resetSent ? (
            <Alert className="mb-4">
              <Mail className="h-4 w-4" />
              <AlertDescription>Email de recuperação enviado! Verifique sua caixa de entrada.</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#00C49A] hover:bg-[#00A085]" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>

              <div className="text-center space-y-2">
                <Button type="button" variant="link" onClick={handlePasswordReset} className="text-sm text-[#0B132B]">
                  Esqueci minha senha
                </Button>

                <div className="text-sm text-gray-600">
                  Não tem conta?{" "}
                  <Link href="/register" className="text-[#00C49A] hover:underline">
                    Criar conta
                  </Link>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
