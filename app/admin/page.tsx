"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, getAllUsers, updateUserBalance, addTransaction, getUserInventory } from "@/lib/storage"
import { ArrowLeft, Users, DollarSign, Package, Search } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/storage"

export default function AdminPanel() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [depositAmount, setDepositAmount] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAdminAuth()
    fetchUsers()
  }, [])

  function checkAdminAuth() {
    const user = getCurrentUser()
    if (!user) {
      router.push("/")
      return
    }

    if (!user.isAdmin) {
      router.push("/dashboard")
      return
    }

    setCurrentUser(user)
    setLoading(false)
  }

  function fetchUsers() {
    const allUsers = getAllUsers()
    setUsers(allUsers)
  }

  function addBalance() {
    if (!selectedUser || !depositAmount || Number.parseFloat(depositAmount) <= 0) {
      alert("Selecione um usuário e insira um valor válido")
      return
    }

    const user = users.find((u) => u.id === selectedUser)
    if (!user) return

    const amount = Number.parseFloat(depositAmount)
    const newBalance = user.balance + amount

    try {
      // Update user balance
      updateUserBalance(selectedUser, newBalance)

      // Record transaction
      addTransaction(selectedUser, "deposit", amount, `Depósito administrativo de R$ ${amount.toFixed(2)}`)

      // Update local state
      setUsers((prev) => prev.map((u) => (u.id === selectedUser ? { ...u, balance: newBalance } : u)))

      setDepositAmount("")
      setSelectedUser("")
      alert(`R$ ${amount.toFixed(2)} adicionado à conta de ${user.username}`)
    } catch (error) {
      alert("Erro ao adicionar saldo: " + (error as Error).message)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalUsers = users.length
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0)
  const adminUsers = users.filter((user) => user.isAdmin).length
  const totalSkins = users.reduce((sum, user) => sum + getUserInventory(user.id).length, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center">
        <div className="text-white text-xl">Carregando painel administrativo...</div>
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
            <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
            <Badge variant="outline" className="border-purple-500 text-purple-400">
              Admin: {currentUser?.username}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/60 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total de Usuários</p>
                  <p className="text-2xl font-bold text-white">{totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <DollarSign className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Saldo Total</p>
                  <p className="text-2xl font-bold text-white">R$ {totalBalance.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Total de Skins</p>
                  <p className="text-2xl font-bold text-white">{totalSkins}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Administradores</p>
                  <p className="text-2xl font-bold text-white">{adminUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Balance Section */}
        <Card className="bg-black/60 border-red-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Adicionar Saldo</CardTitle>
            <CardDescription className="text-gray-400">Adicione saldo à conta de qualquer usuário</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-select" className="text-white">
                  Selecionar Usuário
                </Label>
                <select
                  id="user-select"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                >
                  <option value="">Selecione um usuário</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} - R$ {user.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deposit-amount" className="text-white">
                  Valor (R$)
                </Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Ação</Label>
                <Button
                  onClick={addBalance}
                  disabled={!selectedUser || !depositAmount || Number.parseFloat(depositAmount) <= 0}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Adicionar Saldo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="bg-black/60 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-white">Gerenciar Usuários</CardTitle>
            <CardDescription className="text-gray-400">Lista de todos os usuários registrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-3 text-white">Usuário</th>
                    <th className="text-left p-3 text-white">Email</th>
                    <th className="text-left p-3 text-white">Saldo</th>
                    <th className="text-left p-3 text-white">Skins</th>
                    <th className="text-left p-3 text-white">Tipo</th>
                    <th className="text-left p-3 text-white">Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{user.username}</span>
                          {user.isAdmin && (
                            <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-gray-400">{user.email}</td>
                      <td className="p-3">
                        <span className="text-green-400 font-semibold">R$ {user.balance.toFixed(2)}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-blue-400">{getUserInventory(user.id).length}</span>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            user.isAdmin ? "border-purple-500 text-purple-400" : "border-gray-500 text-gray-400"
                          }
                        >
                          {user.isAdmin ? "Administrador" : "Usuário"}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString("pt-BR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">Nenhum usuário encontrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
