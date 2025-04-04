import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// GET profile data
export async function GET(request: Request) {
  try {
    // Verificar autenticación
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    try {
      const decoded = verifyToken(token)
      
      // Obtener perfil del usuario
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB)
      
      const user = await db.collection('users').findOne(
        { _id: new ObjectId(decoded.userId) }
      )
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      
      // Devolver perfil, excluyendo la contraseña
      const { password, ...userWithoutPassword } = user
      
      return NextResponse.json({
        message: 'Profile data retrieved successfully',
        profile: userWithoutPassword
      })
      
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  } catch (error: any) {
    console.error('Profile retrieval error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// UPDATE profile data
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const token = request.headers.get('authorization')?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    
    try {
      const decoded = verifyToken(token)
      const profileData = await request.json()
      
      // Actualizar perfil del usuario
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB)
      
      // Formatear datos del perfil
      const profileUpdate = {
        profile: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          city: profileData.city,
          state: profileData.state,
          zipCode: profileData.zipCode,
          education: profileData.education,
          gender: profileData.gender,
          yearsExperience: profileData.yearsExperience,
          skills: profileData.skills || [],
          employment: {
            company: profileData.company,
            jobTitle: profileData.jobTitle,
            currentlyEmployed: profileData.currentlyEmployed,
            salary: profileData.salary,
          },
          updatedAt: new Date()
        }
      }
      
      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(decoded.userId) },
        { $set: profileUpdate }
      )
      
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
      
      return NextResponse.json({
        message: 'Profile updated successfully',
        profile: profileUpdate.profile
      })
      
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token or data' }, { status: 401 })
    }
  } catch (error: any) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 