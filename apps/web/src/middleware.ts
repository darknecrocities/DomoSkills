import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight Edge-compatible sliding-window rate limiter
const ipRequestHistory = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_GENERAL_API_REQUESTS = 90; // 90 req/min for general API calls
const MAX_SEARCH_REQUESTS = 40; // 40 req/min for heavy search/catalog endpoints

function checkRateLimit(ip: string, maxRequests: number): boolean {
  const now = Date.now();
  const history = (ipRequestHistory.get(ip) || []).filter((time) => now - time < WINDOW_MS);

  if (history.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  history.push(now);
  ipRequestHistory.set(ip, history);

  // Periodic pruning to avoid Edge memory bloat
  if (ipRequestHistory.size > 2000) {
    for (const [key, timestamps] of ipRequestHistory.entries()) {
      if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] > WINDOW_MS) {
        ipRequestHistory.delete(key);
      }
    }
  }

  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Inject Defensive Security Headers on all pages and API routes
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Apply Rate Limiting & Anti-DDoS protections to API routes
  if (pathname.startsWith('/api')) {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous-client';

    const maxAllowed = pathname.includes('/search') ? MAX_SEARCH_REQUESTS : MAX_GENERAL_API_REQUESTS;

    if (!checkRateLimit(clientIp, maxAllowed)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Too Many Requests',
          message: 'Anti-DDoS rate limit triggered. Please wait before making more requests.',
          retryAfterSeconds: 60,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-Content-Type-Options': 'nosniff',
          },
        }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
