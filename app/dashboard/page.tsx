"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { getCurrentUser, logoutUser, getUserInventory } from "@/lib/storage"
import { CASE_TYPES } from "@/lib/valorant-skins"
import { Package, Wallet, Trophy, Settings, LogOut, Sparkles, Crown } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/storage"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [inventoryCount, setInventoryCount] = useState(0)
  const [loading, setLoading] = useState(true)
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

    // Get inventory count
    const inventory = getUserInventory(currentUser.id)
    setInventoryCount(inventory.length)

    setLoading(false)
  }

  function handleSignOut() {
    logoutUser()
    router.push("/")
  }

  function getCaseTypeIcon(type: string) {
    switch (type) {
      case "knife":
        return <Crown className="h-6 w-6 text-yellow-400" />
      case "special":
        return <Sparkles className="h-6 w-6 text-purple-400" />
      default:
        return <Package className="h-6 w-6 text-blue-400" />
    }
  }

  function getCaseTypeBorder(type: string) {
    switch (type) {
      case "knife":
        return "border-yellow-500/60 hover:border-yellow-500/80 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
      case "special":
        return "border-purple-500/60 hover:border-purple-500/80 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
      default:
        return "border-blue-500/60 hover:border-blue-500/80 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  // Separate cases by type
  const commonCases = CASE_TYPES.filter((c) => c.type === "common")
  const specialCases = CASE_TYPES.filter((c) => c.type === "special")
  const knifeCases = CASE_TYPES.filter((c) => c.type === "knife")

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800">
      {/* Header */}
      <header className="border-b border-red-500/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">VALORANT Cases</h1>
            <Badge variant="outline" className="border-yellow-500 text-yellow-500">
              {user?.username}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
              <Wallet className="h-4 w-4 text-green-400" />
              <span className="text-white font-semibold">R$ {user?.balance?.toFixed(2)}</span>
            </div>

            {user?.isAdmin && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-red-500 text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/60 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Wallet className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Saldo Atual</p>
                  <p className="text-2xl font-bold text-white">R$ {user?.balance?.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/inventory">
            <Card className="bg-black/60 border-blue-500/30 hover:bg-black/80 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Package className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Inventário</p>
                    <p className="text-2xl font-bold text-white">{inventoryCount} Skins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/deposit">
            <Card className="bg-black/60 border-yellow-500/30 hover:bg-black/80 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Depositar</p>
                    <p className="text-2xl font-bold text-white">Adicionar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-black/60 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Trophy className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Rank</p>
                  <p className="text-2xl font-bold text-white">
                    {inventoryCount >= 50
                      ? "Radiante"
                      : inventoryCount >= 30
                        ? "Imortal"
                        : inventoryCount >= 20
                          ? "Ascendente"
                          : inventoryCount >= 10
                            ? "Diamante"
                            : inventoryCount >= 5
                              ? "Platina"
                              : "Ferro"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases Sections */}
        <div className="space-y-12">
          {/* Common Cases */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Package className="h-8 w-8 text-blue-400" />
                Caixas Comuns
              </h2>
              <p className="text-gray-400">Perfeitas para começar sua coleção - R$ 3 a R$ 10</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {commonCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`bg-black/60 ${getCaseTypeBorder(caseItem.type)} transition-all hover:scale-105`}
                >
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4">{getCaseTypeIcon(caseItem.type)}</div>
                    <CardTitle className="text-white text-lg">{caseItem.name}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">R$ {caseItem.price.toFixed(2)}</div>
                    </div>

                    <Link href={`/case/${caseItem.id}`}>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!user || user.balance < caseItem.price}
                      >
                        {!user || user.balance < caseItem.price ? "Saldo Insuficiente" : "Abrir Caixa"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Special Cases */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Sparkles className="h-8 w-8 text-purple-400" />
                Caixas Especiais
              </h2>
              <p className="text-gray-400">Skins premium e facas exclusivas - R$ 25 a R$ 40</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`bg-black/60 ${getCaseTypeBorder(caseItem.type)} transition-all hover:scale-105`}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">{getCaseTypeIcon(caseItem.type)}</div>
                    <CardTitle className="text-white text-xl">{caseItem.name}</CardTitle>
                    <CardDescription className="text-gray-400">{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">R$ {caseItem.price.toFixed(2)}</div>
                    </div>

                    {/* Probability Display */}
                    <div className="space-y-2">
                      {caseItem.probabilities.Exclusive > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-yellow-400">Exclusive</span>
                            <span className="text-gray-400">{caseItem.probabilities.Exclusive}%</span>
                          </div>
                          <Progress value={caseItem.probabilities.Exclusive} className="h-2" />
                        </>
                      )}

                      <div className="flex justify-between text-sm">
                        <span className="text-purple-400">Ultra</span>
                        <span className="text-gray-400">{caseItem.probabilities.Ultra}%</span>
                      </div>
                      <Progress value={caseItem.probabilities.Ultra} className="h-2" />
                    </div>

                    <Link href={`/case/${caseItem.id}`}>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        disabled={!user || user.balance < caseItem.price}
                      >
                        {!user || user.balance < caseItem.price ? "Saldo Insuficiente" : "Abrir Caixa"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Knife Cases */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <Crown className="h-8 w-8 text-yellow-400" />
                Caixas de Faca
              </h2>
              <p className="text-gray-400">100% garantido de conseguir uma faca! - R$ 90 a R$ 120</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {knifeCases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`bg-black/60 ${getCaseTypeBorder(caseItem.type)} transition-all hover:scale-105`}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">{getCaseTypeIcon(caseItem.type)}</div>
                    <CardTitle className="text-white text-2xl">{caseItem.name}</CardTitle>
                    <CardDescription className="text-gray-400 text-lg">{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">R$ {caseItem.price.toFixed(2)}</div>
                    </div>

                    <div className="text-center p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-yellow-400">🗡️ Faca Garantida</span>
                        <span className="text-yellow-400">100%</span>
                      </div>
                      <Progress value={100} className="h-3 mt-2" />
                    </div>

                    <Link href={`/case/${caseItem.id}`}>
                      <Button
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 text-lg"
                        disabled={!user || user.balance < caseItem.price}
                      >
                        {!user || user.balance < caseItem.price ? "Saldo Insuficiente" : "Garantir Faca"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
