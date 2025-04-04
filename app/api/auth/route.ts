import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { name, email, password, action } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    if (action === 'register') {
      // Verificar si el usuario ya existe
      const existingUser = await db.collection('users').findOne({ email })
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }

      // Crear nuevo usuario
      const hashedPassword = await hashPassword(password)
      const result = await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      })

      return NextResponse.json({
        message: 'User created successfully',
        userId: result.insertedId,
      })
    } else {
      // Login
      const user = await db.collection('users').findOne({ email })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      const isValidPassword = await verifyPassword(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        )
      }

      const token = generateToken({
        userId: user._id.toString(),
        email: user.email
      })

      return NextResponse.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          profileImage: user.profileImage || null
        }
      })
    }
  } catch (error: any) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 