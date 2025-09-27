import { NextRequest, NextResponse } from "next/server"
import { addUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Basic password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    try {
      // Create user using our in-memory store
      const user = addUser(email.toLowerCase().trim(), name.trim(), password)

      return NextResponse.json(
        {
          message: "User created successfully",
          userId: user.id,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        },
        { status: 201 }
      )
    } catch (error) {
      if (error instanceof Error && error.message === "User already exists") {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        )
      }
      throw error
    }

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}