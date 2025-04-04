import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: Request) {
  const path = new URL(request.url).pathname

  // Rutas que no requieren autenticación
  if (path.startsWith('/api/auth') || path.startsWith('/api/users')) {
    return NextResponse.next()
  }

  // Obtener el token del header
  const token = request.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  try {
    // Verificar el token
    const decoded = verifyToken(token)
    
    // Agregar el userId a los headers para uso posterior
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decoded.userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: '/api/:path*',
} 