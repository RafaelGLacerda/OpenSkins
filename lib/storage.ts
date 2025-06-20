export interface User {
  id: string
  username: string
  email: string
  balance: number
  isAdmin: boolean
  createdAt: string
}

export interface InventoryItem {
  id: string
  skinId: string
  obtainedAt: string
  redeemCode: string
  isRedeemed: boolean
}

export interface Transaction {
  id: string
  type: "deposit" | "case_opening" | "withdrawal"
  amount: number
  description: string
  createdAt: string
}

// User Management
export function createUser(username: string, email: string, password: string): User {
  const user: User = {
    id: generateId(),
    username,
    email,
    balance: 1000.0, // R$ 1000 inicial
    isAdmin: email === "admin@valorant.com", // Admin padrão
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem(`user_${email}`, JSON.stringify(user))
  localStorage.setItem(`password_${email}`, password)

  return user
}

export function loginUser(email: string, password: string): User | null {
  const storedPassword = localStorage.getItem(`password_${email}`)
  const storedUser = localStorage.getItem(`user_${email}`)

  if (storedPassword === password && storedUser) {
    return JSON.parse(storedUser)
  }

  return null
}

export function getCurrentUser(): User | null {
  const currentUserId = localStorage.getItem("currentUser")
  if (!currentUserId) return null

  const users = getAllUsers()
  return users.find((user) => user.id === currentUserId) || null
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("currentUser", user.id)
}

export function logoutUser(): void {
  localStorage.removeItem("currentUser")
}

export function updateUserBalance(userId: string, newBalance: number): void {
  const users = getAllUsers()
  const userIndex = users.findIndex((user) => user.id === userId)

  if (userIndex !== -1) {
    users[userIndex].balance = newBalance
    localStorage.setItem(`user_${users[userIndex].email}`, JSON.stringify(users[userIndex]))
  }
}

export function getAllUsers(): User[] {
  const users: User[] = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith("user_")) {
      const userData = localStorage.getItem(key)
      if (userData) {
        users.push(JSON.parse(userData))
      }
    }
  }

  return users
}

// Inventory Management
export function addToInventory(userId: string, skinId: string): InventoryItem {
  const inventoryItem: InventoryItem = {
    id: generateId(),
    skinId,
    obtainedAt: new Date().toISOString(),
    redeemCode: generateRedeemCode(),
    isRedeemed: false,
  }

  const inventory = getUserInventory(userId)
  inventory.push(inventoryItem)
  localStorage.setItem(`inventory_${userId}`, JSON.stringify(inventory))

  return inventoryItem
}

export function getUserInventory(userId: string): InventoryItem[] {
  const inventory = localStorage.getItem(`inventory_${userId}`)
  return inventory ? JSON.parse(inventory) : []
}

export function redeemSkin(userId: string, itemId: string): boolean {
  const inventory = getUserInventory(userId)
  const itemIndex = inventory.findIndex((item) => item.id === itemId)

  if (itemIndex !== -1) {
    inventory[itemIndex].isRedeemed = true
    localStorage.setItem(`inventory_${userId}`, JSON.stringify(inventory))
    return true
  }

  return false
}

// Transaction Management
export function addTransaction(userId: string, type: Transaction["type"], amount: number, description: string): void {
  const transaction: Transaction = {
    id: generateId(),
    type,
    amount,
    description,
    createdAt: new Date().toISOString(),
  }

  const transactions = getUserTransactions(userId)
  transactions.push(transaction)
  localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions))
}

export function getUserTransactions(userId: string): Transaction[] {
  const transactions = localStorage.getItem(`transactions_${userId}`)
  return transactions ? JSON.parse(transactions) : []
}

// Utility Functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

function generateRedeemCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = "VAL-"

  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  result += "-"

  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

// Initialize admin user if not exists
export function initializeAdminUser(): void {
  const adminEmail = "admin@valorant.com"
  const adminUser = localStorage.getItem(`user_${adminEmail}`)

  if (!adminUser) {
    createUser("Admin", adminEmail, "admin123")
  }
}
