"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getCurrentUser, getUserInventory } from "@/lib/storage"
import { getSkinById } from "@/lib/valorant-skins"
import { ArrowLeft, Search, Copy, Check, Crown, Sparkles } from "lucide-react"
import Link from "next/link"
import type { User, InventoryItem } from "@/lib/storage"
import type { ValorantSkin } from "@/lib/valorant-skins"

interface InventoryItemWithSkin extends InventoryItem {
  skin: ValorantSkin
}

export default function Inventory() {
  const [user, setUser] = useState<User | null>(null)
  const [inventory, setInventory] = useState<InventoryItemWithSkin[]>([])
  const [filteredInventory, setFilteredInventory] = useState<InventoryItemWithSkin[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRarity, setSelectedRarity] = useState<string>("all")
  const [copiedCode, setCopiedCode] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchInventory()
  }, [])

  useEffect(() => {
    filterInventory()
  }, [inventory, searchTerm, selectedRarity])

  function checkAuth() {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
  }

  function fetchInventory() {
    const currentUser = getCurrentUser()
    if (!currentUser) return

    const userInventory = getUserInventory(currentUser.id)

    // Map inventory items with skin data
    const inventoryWithSkins: InventoryItemWithSkin[] = userInventory
      .map((item) => {
        const skin = getSkinById(item.skinId)
        if (skin) {
          return { ...item, skin }
        }
        return null
      })
      .filter((item): item is InventoryItemWithSkin => item !== null)
      .sort((a, b) => new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime())

    setInventory(inventoryWithSkins)
    setLoading(false)
  }

  function filterInventory() {
    let filtered = inventory

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.skin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.skin.weapon.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.skin.collection.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedRarity !== "all") {
      filtered = filtered.filter((item) => item.skin.rarity === selectedRarity)
    }

    setFilteredInventory(filtered)
  }

  function getRarityColor(rarity: string) {
    switch (rarity) {
      case "Exclusive":
        return "text-yellow-400 border-yellow-400 bg-yellow-400/10"
      case "Ultra":
        return "text-purple-400 border-purple-400 bg-purple-400/10"
      case "Premium":
        return "text-blue-400 border-blue-400 bg-blue-400/10"
      case "Deluxe":
        return "text-green-400 border-green-400 bg-green-400/10"
      case "Select":
        return "text-gray-400 border-gray-400 bg-gray-400/10"
      default:
        return "text-gray-400 border-gray-400 bg-gray-400/10"
    }
  }

  function getRarityIcon(rarity: string) {
    switch (rarity) {
      case "Exclusive":
        return <Crown className="h-4 w-4 text-yellow-400" />
      case "Ultra":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      default:
        return null
    }
  }

  function copyRedeemCode(code: string) {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const totalValue = inventory.reduce((sum, item) => sum + item.skin.vpPrice, 0)
  const rarityStats = inventory.reduce(
    (stats, item) => {
      stats[item.skin.rarity] = (stats[item.skin.rarity] || 0) + 1
      return stats
    },
    {} as Record<string, number>,
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando inventário...</div>
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
            <h1 className="text-2xl font-bold text-white">Meu Inventário</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-black/60 border-green-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white">Valor Total</h3>
              <p className="text-2xl font-bold text-green-400">{totalValue} VP</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white">Total de Skins</h3>
              <p className="text-2xl font-bold text-blue-400">{inventory.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white">Exclusive</h3>
              <p className="text-2xl font-bold text-yellow-400">{rarityStats.Exclusive || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white">Ultra</h3>
              <p className="text-2xl font-bold text-purple-400">{rarityStats.Ultra || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-red-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white">Premium</h3>
              <p className="text-2xl font-bold text-red-400">{rarityStats.Premium || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/60 border-red-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar skins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {["all", "Exclusive", "Ultra", "Premium", "Deluxe", "Select"].map((rarity) => (
                  <Button
                    key={rarity}
                    variant={selectedRarity === rarity ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRarity(rarity)}
                    className={selectedRarity === rarity ? "bg-red-600" : "border-gray-600 text-gray-400"}
                  >
                    {rarity === "all" ? "Todas" : rarity}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Grid */}
        {filteredInventory.length === 0 ? (
          <Card className="bg-black/60 border-red-500/30">
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                {inventory.length === 0 ? "Inventário Vazio" : "Nenhuma skin encontrada"}
              </h3>
              <p className="text-gray-400 mb-6">
                {inventory.length === 0
                  ? "Você ainda não possui nenhuma skin. Que tal abrir algumas caixas?"
                  : "Tente ajustar os filtros de busca."}
              </p>
              {inventory.length === 0 && (
                <Link href="/dashboard">
                  <Button className="bg-red-600 hover:bg-red-700">Abrir Caixas</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInventory.map((item) => (
              <Card key={item.id} className={`bg-black/60 border-2 ${getRarityColor(item.skin.rarity)}`}>
                <CardHeader className="pb-2">
                  <div className="relative">
                    <img
                      src={item.skin.imageUrl ? `/${item.skin.imageUrl}` : "/placeholder.svg?height=120&width=120"}
                      alt={item.skin.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />

                    <div className="absolute top-2 right-2">{getRarityIcon(item.skin.rarity)}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.skin.name}</h3>
                    <p className="text-xs text-gray-400">{item.skin.weapon}</p>
                    <p className="text-xs text-gray-500">{item.skin.collection}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getRarityColor(item.skin.rarity)}>
                      {item.skin.rarity}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <p className="text-green-400 font-semibold">{item.skin.vpPrice} VP</p>
                  </div>

                  {/* Redeem Code */}
                  <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                    <p className="text-xs text-blue-400 mb-2">Código de Resgate:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-white bg-black/50 px-2 py-1 rounded flex-1 text-center">
                        {item.redeemCode}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyRedeemCode(item.redeemCode)}
                        className="border-blue-500 text-blue-400 hover:bg-blue-500/20 p-2"
                      >
                        {copiedCode === item.redeemCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Obtido em {new Date(item.obtainedAt).toLocaleDateString("pt-BR")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
