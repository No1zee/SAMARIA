import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Trick 15: Real-time Edge Content Personalization
 * Injects metadata or redirects based on the "warrior" status or location.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Add a custom header to indicate "Warrior Mode" is active at the edge
  response.headers.set('x-warrior-active', 'true')
  
  // Example: Personalize based on a cookie or header
  const isReturningWarrior = request.cookies.has('warrior-visited')
  if (isReturningWarrior) {
    response.headers.set('x-warrior-welcome', 'Welcome back, Sword-Master')
  }

  return response
}

export const config = {
  matcher: '/',
}
