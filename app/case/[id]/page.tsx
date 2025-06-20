"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, updateUserBalance, addToInventory, addTransaction } from "@/lib/storage"
import { getCaseById, getSkinsForCase, type ValorantSkin } from "@/lib/valorant-skins"
import { CaseRoulette } from "@/components/case-roulette"
import { ArrowLeft, Package, Crown, Sparkles } from "lucide-react"
import Link from "next/link"
import type { User, InventoryItem } from "@/lib/storage"
import type { CaseType } from "@/lib/valorant-skins"

export default function CaseOpening() {
  const [user, setUser] = useState<User | null>(null)
  const [caseData, setCaseData] = useState<CaseType | null>(null)
  const [caseSkins, setCaseSkins] = useState<ValorantSkin[]>([])
  const [opening, setOpening] = useState(false)
  const [wonSkin, setWonSkin] = useState<ValorantSkin | null>(null)
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    checkAuth()
    fetchCaseData()
  }, [])

  function checkAuth() {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
  }

  function fetchCaseData() {
    const caseInfo = getCaseById(params.id as string)
    if (caseInfo) {
      setCaseData(caseInfo)
      const skins = getSkinsForCase(params.id as string)
      setCaseSkins(skins)
    }
  }

  function selectRandomSkin(): ValorantSkin {
    if (!caseData || caseSkins.length === 0) return caseSkins[0]

    const random = Math.random() * 100
    let cumulativeProbability = 0

    // Check each rarity based on probabilities
    const rarities: Array<keyof typeof caseData.probabilities> = ["Exclusive", "Ultra", "Premium", "Deluxe", "Select"]

    for (const rarity of rarities) {
      cumulativeProbability += caseData.probabilities[rarity]
      if (random <= cumulativeProbability) {
        const skinsOfRarity = caseSkins.filter((skin) => skin.rarity === rarity)
        if (skinsOfRarity.length > 0) {
          return skinsOfRarity[Math.floor(Math.random() * skinsOfRarity.length)]
        }
      }
    }

    // Fallback
    return caseSkins[Math.floor(Math.random() * caseSkins.length)]
  }

  async function openCase() {
    if (!user || !caseData || user.balance < caseData.price) return

    setOpening(true)
    setSpinning(true)

    const selectedSkin = selectRandomSkin()
    setWonSkin(selectedSkin)

    // Update user balance
    const newBalance = user.balance - caseData.price
    updateUserBalance(user.id, newBalance)

    // Add to inventory and get the item with redeem code
    const inventoryItem = addToInventory(user.id, selectedSkin.id)
    setWonItem(inventoryItem)

    // Add transaction
    addTransaction(user.id, "case_opening", -caseData.price, `Abertura de ${caseData.name} - ${selectedSkin.name}`)

    // Update local user state
    setUser((prev) => (prev ? { ...prev, balance: newBalance } : null))
  }

  function onSpinComplete() {
    setSpinning(false)
    setShowResult(true)
    setOpening(false)
  }

  function getRarityColor(rarity: string) {
    switch (rarity) {
      case "Exclusive":
        return "text-yellow-400 border-yellow-400"
      case "Ultra":
        return "text-purple-400 border-purple-400"
      case "Premium":
        return "text-blue-400 border-blue-400"
      case "Deluxe":
        return "text-green-400 border-green-400"
      case "Select":
        return "text-gray-400 border-gray-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  function getCaseTypeIcon(type: string) {
    switch (type) {
      case "knife":
        return <Crown className="h-8 w-8 text-yellow-400" />
      case "special":
        return <Sparkles className="h-8 w-8 text-purple-400" />
      default:
        return <Package className="h-8 w-8 text-blue-400" />
    }
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

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
            <div className="flex items-center gap-3">
              {getCaseTypeIcon(caseData.type)}
              <h1 className="text-2xl font-bold text-white">{caseData.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-600/20 px-3 py-2 rounded-lg border border-green-500/30">
            <Package className="h-4 w-4 text-green-400" />
            <span className="text-white font-semibold">R$ {user?.balance?.toFixed(2)}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showResult ? (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Case Info */}
            <Card className="bg-black/60 border-red-500/30">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">{getCaseTypeIcon(caseData.type)}</div>
                <CardTitle className="text-white text-3xl">{caseData.name}</CardTitle>
                <p className="text-gray-400 text-lg">{caseData.description}</p>
                <div className="text-3xl font-bold text-green-400">R$ {caseData.price.toFixed(2)}</div>
              </CardHeader>
            </Card>

            {/* Roulette Animation */}
            {spinning && wonSkin && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                    🎰{" "}
                    <span className="bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                      ABRINDO CAIXA
                    </span>{" "}
                    🎰
                  </h3>
                  <p className="text-gray-400 text-lg">Prepare-se para descobrir sua nova skin!</p>
                </div>

                {/* Sound effect indicator */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-red-500/30">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">🔊 Som ativado para melhor experiência</span>
                  </div>
                </div>

                <CaseRoulette
                  skins={caseSkins}
                  wonSkin={wonSkin}
                  isSpinning={spinning}
                  onSpinComplete={onSpinComplete}
                />

                {/* Progress indicator */}
                <div className="max-w-md mx-auto">
                  <div className="bg-black/60 rounded-full p-2 border border-red-500/30">
                    <div className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">Revelando resultado...</p>
                </div>
              </div>
            )}

            {/* Possible Skins */}
            {!spinning && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white text-center">Skins Disponíveis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {caseSkins.slice(0, 12).map((skin) => (
                    <Card key={skin.id} className={`bg-black/60 border-2 ${getRarityColor(skin.rarity)}`}>
                      <CardContent className="p-4 text-center">
                        <img
                          src={skin.imageUrl || "/placeholder.svg?height=80&width=80"}
                          alt={skin.name}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <h4 className="font-semibold text-white text-xs">{skin.name}</h4>
                        <p className="text-xs text-gray-400">{skin.weapon}</p>
                        <Badge variant="outline" className={`mt-2 text-xs ${getRarityColor(skin.rarity)}`}>
                          {skin.rarity}
                        </Badge>
                        <p className="text-xs text-green-400 mt-1">{skin.vpPrice} VP</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Open Button */}
            {!spinning && (
              <div className="text-center">
                <Button
                  onClick={openCase}
                  disabled={opening || !user || user.balance < caseData.price}
                  className={`px-8 py-4 text-lg font-bold ${
                    caseData.type === "knife"
                      ? "bg-yellow-600 hover:bg-yellow-700 text-black"
                      : caseData.type === "special"
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {opening
                    ? "Abrindo..."
                    : !user || user.balance < caseData.price
                      ? "Saldo Insuficiente"
                      : caseData.type === "knife"
                        ? `Garantir Faca - R$ ${caseData.price.toFixed(2)}`
                        : `Abrir por R$ ${caseData.price.toFixed(2)}`}
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Result Screen */
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">🎉 Parabéns!</h2>
              <p className="text-xl text-gray-400">Você ganhou:</p>
            </div>

            <Card className={`bg-black/60 border-4 ${getRarityColor(wonSkin!.rarity)} animate-pulse`}>
              <CardContent className="p-8">
                <img
                  src={wonSkin!.imageUrl || "/placeholder.svg?height=200&width=200"}
                  alt={wonSkin!.name}
                  className="w-48 h-48 object-cover rounded-lg mx-auto mb-4 border-2 border-current"
                />
                <h3 className="text-3xl font-bold text-white mb-2">{wonSkin!.name}</h3>
                <p className="text-lg text-gray-400 mb-2">{wonSkin!.weapon}</p>
                <p className="text-md text-gray-500 mb-4">{wonSkin!.collection}</p>
                <Badge variant="outline" className={`text-lg px-4 py-2 ${getRarityColor(wonSkin!.rarity)}`}>
                  {wonSkin!.rarity}
                </Badge>
                <div className="mt-4 text-2xl font-bold text-green-400">Valor: {wonSkin!.vpPrice} VP</div>

                {/* Redeem Code */}
                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">🎫 Código de Resgate</h4>
                  <div className="text-2xl font-mono text-blue-400 bg-black/50 p-3 rounded border">
                    {wonItem?.redeemCode}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Use este código para resgatar sua skin no jogo (sistema fictício)
                  </p>
                </div>

                {/* Special Messages */}
                {wonSkin!.rarity === "Exclusive" && (
                  <div className="mt-4 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 font-bold">🗡️ FACA LENDÁRIA! Você teve muita sorte!</p>
                  </div>
                )}
                {wonSkin!.rarity === "Ultra" && (
                  <div className="mt-4 p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-400 font-bold">✨ SKIN ULTRA RARA! Excelente sorte!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="outline" className="border-red-500 text-red-400">
                  Abrir Outra Caixa
                </Button>
              </Link>
              <Link href="/inventory">
                <Button className="bg-blue-600 hover:bg-blue-700">Ver Inventário</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
