import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple in-memory store for demo purposes
const users = new Map<string, { id: string; name: string; email: string; password: string }>()

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check if user exists in our in-memory store
          const user = users.get(credentials.email as string)

          if (!user) {
            return null
          }

          // Simple password check (in production, use bcrypt)
          if (user.password !== credentials.password) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      // For Google OAuth, create user entry if doesn't exist
      if (account?.provider === "google" && user?.email) {
        if (!users.has(user.email)) {
          const userId = `google-${Date.now()}`
          users.set(user.email, {
            id: userId,
            name: user.name || '',
            email: user.email,
            password: '', // No password for OAuth users
          })
          token.id = userId
        } else {
          token.id = users.get(user.email)?.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", // Redirect errors to signin page
  },
  debug: process.env.NODE_ENV === "development",
})

// Export function to add users (for registration)
export function addUser(email: string, name: string, password: string) {
  if (users.has(email)) {
    throw new Error("User already exists")
  }

  const userId = `user-${Date.now()}`
  users.set(email, {
    id: userId,
    name,
    email,
    password
  })

  return { id: userId, email, name }
}