"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth"
import { auth } from "./firebase"
import { checkPremiumAccess } from "./firebase-utils"

interface UserData {
  name: string
  email: string
  premium: boolean
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  sendVerificationEmail: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🔄 Auth state changed:", user?.email)
      setUser(user)

      if (user) {
        try {
          // Verificar acesso premium
          const isPremium = await checkPremiumAccess(user.email!)
          console.log("🔍 Premium access check:", isPremium)

          const userData: UserData = {
            name: user.displayName || user.email?.split("@")[0] || "Usuário",
            email: user.email!,
            premium: isPremium,
          }

          setUserData(userData)
          console.log("✅ User data set:", userData)
        } catch (error) {
          console.error("❌ Error checking premium access:", error)
          // Em caso de erro, assumir que tem acesso para não bloquear
          const userData: UserData = {
            name: user.displayName || user.email?.split("@")[0] || "Usuário",
            email: user.email!,
            premium: true, // Assumir acesso em caso de erro
          }
          setUserData(userData)
        }
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log("🔐 Attempting sign in for:", email)
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log("✅ Sign in successful:", result.user.email)
    } catch (error) {
      console.error("❌ Sign in error:", error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("📝 Attempting sign up for:", email)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(result.user)
      console.log("✅ Sign up successful, verification email sent")
    } catch (error) {
      console.error("❌ Sign up error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      console.log("🚪 Signing out...")
      await firebaseSignOut(auth)
      setUser(null)
      setUserData(null)
      console.log("✅ Sign out successful")
    } catch (error) {
      console.error("❌ Sign out error:", error)
      throw error
    }
  }

  const sendVerificationEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user)
        console.log("✅ Verification email sent")
      } catch (error) {
        console.error("❌ Error sending verification email:", error)
        throw error
      }
    }
  }

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
    sendVerificationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
