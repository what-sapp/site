import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    
    // Use environment variable for maintenance mode (Edge Runtime compatible)
    const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'
    
    if (maintenanceMode && path !== '/maintenance' && !path.startsWith('/api')) {
      // Allow admin bypass
      const isAdmin = token?.isAdmin || token?.email === 'phantomdev@gmail.com'
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/maintenance', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        // Allow public pages
        const publicPaths = ['/', '/videos', '/docs', '/maintenance']
        if (publicPaths.includes(path) || path.startsWith('/api/auth')) {
          return true
        }
        // Protect dashboard and profile
        if (path.startsWith('/dashboard') || path.startsWith('/profile')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
}