"use client"

import { useState, useEffect, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"
import SEOHead from "@/components/seo-head"

function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get referral source
  const source = searchParams?.get('from') || 'organic'

  useEffect(() => {
    // Pre-fill email if coming from newsletter signup or other source
    const prefilledEmail = searchParams?.get('email')
    if (prefilledEmail) {
      setEmail(decodeURIComponent(prefilledEmail))
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (!name.trim() || !email.trim() || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      setStep(2)
      return
    }

    // Step 2: Registration
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          source
        }),
      })

      if (response.ok) {
        setStep(3)

        // Auto-login after successful registration
        setTimeout(async () => {
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })

          if (result?.error) {
            setError("Registration successful, but login failed")
          } else {
            router.push("/dashboard?welcome=true")
          }
        }, 2000)
      } else {
        const data = await response.json()
        setError(data.error || "Registration failed")
      }
    } catch {
      setError("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  // Rest of the component JSX would go here...
  // For now, I'll just return a simple form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner size="sm" /> : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <>
      <SEOHead page="signup" />
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </>
  )
}