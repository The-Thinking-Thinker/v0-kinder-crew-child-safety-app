export interface User {
  id: string
  email: string
  name: string
  role: "parent" | "guardian"
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication for demo purposes
export const mockUsers: User[] = [
  {
    id: "1",
    email: "parent@example.com",
    name: "Sarah Johnson",
    role: "parent",
    createdAt: new Date("2024-01-15"),
  },
]

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock authentication logic
  if (email === "parent@example.com" && password === "password") {
    return mockUsers[0]
  }

  return null
}

export const registerUser = async (email: string, password: string, name: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock registration logic
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: "parent",
    createdAt: new Date(),
  }

  mockUsers.push(newUser)
  return newUser
}
