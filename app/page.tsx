"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createUser, loginUser, getCurrentUser, setCurrentUser, initializeAdminUser } from "@/lib/storage"
import { Gamepad2, Trophy, Zap } from "lucide-react"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    initializeAdminUser()
    checkUser()
  }, [])

  function checkUser() {
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    }
  }

  function handleSignIn() {
    try {
      setLoading(true)
      const user = loginUser(email, password)

      if (user) {
        setCurrentUser(user)
        router.push("/dashboard")
      } else {
        alert("Email ou senha incorretos!")
      }
    } catch (error) {
      alert("Erro ao fazer login: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function handleSignUp() {
    try {
      setLoading(true)

      // Verificar se usuário já existe
      const existingUser = localStorage.getItem(`user_${email}`)
      if (existingUser) {
        alert("Este email já está cadastrado!")
        return
      }

      const user = createUser(username, email, password)
      setCurrentUser(user)
      router.push("/dashboard")
    } catch (error) {
      alert("Erro ao criar conta: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-white space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
              VALORANT
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold">Case Opening</h2>
            <p className="text-lg text-gray-300">Abra caixas, colete skins raras e monte sua coleção dos sonhos!</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-red-500/20">
              <Gamepad2 className="h-8 w-8 text-red-400" />
              <div>
                <h3 className="font-semibold">Diversão Garantida</h3>
                <p className="text-sm text-gray-400">Sistema de abertura de caixas realista</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-red-500/20">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="font-semibold">Skins Raras</h3>
                <p className="text-sm text-gray-400">Facas lendárias e skins épicas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-red-500/20">
              <Zap className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="font-semibold">R$ 1000 Grátis</h3>
                <p className="text-sm text-gray-400">Crédito inicial para começar</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>Conta Admin:</strong> admin@valorant.com | Senha: admin123
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="w-full max-w-md bg-black/80 border-red-500/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Entrar na Batalha</CardTitle>
            <CardDescription className="text-gray-400">Faça login ou crie sua conta para começar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-red-600">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-red-600">
                  Registrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button onClick={handleSignIn} disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white">
                    Nome de Usuário
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="SeuNick"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email-register"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register" className="text-white">
                    Senha
                  </Label>
                  <Input
                    id="password-register"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <Button onClick={handleSignUp} disabled={loading} className="w-full bg-red-600 hover:bg-red-700">
                  {loading ? "Criando..." : "Criar Conta"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
