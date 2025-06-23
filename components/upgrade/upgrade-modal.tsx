"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, X, Zap } from "lucide-react"

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const handleUpgrade = () => {
    // Redirect to TriboPay payment page
    window.open("https://tribopay.com.br/prescreve-ai-premium", "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#0B132B]">
            Você atingiu o limite gratuito de hoje
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#E2B93B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">Upgrade para Premium e tenha acesso ilimitado ao Prescreve AI</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Gratuito</CardTitle>
                <Badge variant="secondary">Atual</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">2 perguntas por dia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Acesso limitado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Sem histórico completo</span>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-[#E2B93B] bg-gradient-to-br from-[#E2B93B]/5 to-[#E2B93B]/10">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-[#E2B93B]">
                  <Crown className="w-5 h-5 inline mr-2" />
                  Premium
                </CardTitle>
                <Badge className="bg-[#E2B93B] text-black">Recomendado</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Perguntas ilimitadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Respostas mais rápidas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Histórico completo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Suporte prioritário</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#F5F6FA] p-6 rounded-lg">
            <h3 className="font-semibold text-[#0B132B] mb-2 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-[#00C49A]" />
              Por que escolher Premium?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • <strong>Economize tempo:</strong> Respostas instantâneas sem limites
              </li>
              <li>
                • <strong>Decisões mais rápidas:</strong> Acesso 24/7 ao assistente médico
              </li>
              <li>
                • <strong>Sem interrupções:</strong> Foque no que importa - seus pacientes
              </li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continuar Gratuito
            </Button>
            <Button onClick={handleUpgrade} className="flex-1 bg-[#E2B93B] hover:bg-[#D4A429] text-black font-semibold">
              <Crown className="w-4 h-4 mr-2" />
              Assinar Premium
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
