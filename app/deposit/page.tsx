"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getCurrentUser, updateUserBalance, addTransaction } from "@/lib/storage"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/storage"

export default function Deposit() {
  const [user, setUser] = useState<User | null>(null)
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  function checkAuth() {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
  }

  function handleDeposit() {
    if (!user || !amount || Number.parseFloat(amount) <= 0) return

    setLoading(true)

    try {
      const depositAmount = Number.parseFloat(amount)
      const newBalance = user.balance + depositAmount

      // Update user balance
      updateUserBalance(user.id, newBalance)

      // Record transaction
      addTransaction(user.id, "deposit", depositAmount, `Depósito via cartão de crédito`)

      // Update local state
      setUser((prev) => (prev ? { ...prev, balance: newBalance } : null))
      setAmount("")

      alert(`Depósito de R$ ${depositAmount.toFixed(2)} realizado com sucesso!`)
    } catch (error) {
      alert("Erro ao processar depósito: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const quickAmounts = [10, 25, 50, 100, 200, 500]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800">
      {/* Header */}
      <header className="border-b border-red-500/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-red-500 text-red-400">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">Depositar Saldo</h1>
          </div>

          <div className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
            <Wallet className="h-4 w-4 text-green-400" />
            <span className="text-white font-semibold">R$ {user?.balance?.toFixed(2)}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Current Balance */}
          <Card className="bg-black/60 border-green-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Saldo Atual</h3>
              <p className="text-4xl font-bold text-green-400">R$ {user?.balance?.toFixed(2)}</p>
            </CardContent>
          </Card>

          {/* Quick Amounts */}
          <Card className="bg-black/60 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white">Valores Rápidos</CardTitle>
              <CardDescription className="text-gray-400">
                Clique em um valor para selecioná-lo rapidamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-white"
                  >
                    R$ {quickAmount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deposit Form */}
          <Card className="bg-black/60 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informações do Depósito
              </CardTitle>
              <CardDescription className="text-gray-400">
                Insira o valor que deseja depositar em sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">
                  Valor do Depósito (R$)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-600 text-white text-lg"
                />
              </div>

              {amount && Number.parseFloat(amount) > 0 && (
                <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Resumo do Depósito</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Valor:</span>
                      <span>R$ {Number.parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Taxa:</span>
                      <span>R$ 0,00</span>
                    </div>
                    <div className="border-t border-blue-500/30 pt-1 mt-2">
                      <div className="flex justify-between text-white font-semibold">
                        <span>Total:</span>
                        <span>R$ {Number.parseFloat(amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-400 text-xs mt-1">
                        <span>Novo Saldo:</span>
                        <span>R$ {(user?.balance + Number.parseFloat(amount)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">⚠️ Aviso Importante</h4>
                  <p className="text-sm text-gray-300">
                    Este é um sistema de entretenimento. Os valores são fictícios e não representam dinheiro real. O
                    depósito será processado instantaneamente em sua conta.
                  </p>
                </div>

                <Button
                  onClick={handleDeposit}
                  disabled={loading || !amount || Number.parseFloat(amount) <= 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                >
                  {loading
                    ? "Processando..."
                    : `Depositar R$ ${amount ? Number.parseFloat(amount).toFixed(2) : "0,00"}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
