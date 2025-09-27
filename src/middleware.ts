import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user has a valid token for protected routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        return true
      },
    },
    pages: {
      signIn: '/auth/signin',
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/generate/:path*'
  ]
}