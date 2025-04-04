import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    
    // Crear una colección de prueba
    const testCollection = db.collection('test')
    
    // Insertar un documento de prueba
    await testCollection.insertOne({
      message: 'Test connection successful',
      timestamp: new Date()
    })
    
    // Obtener todos los documentos de prueba
    const documents = await testCollection.find({}).toArray()
    
    res.status(200).json({
      success: true,
      message: 'MongoDB connection successful',
      documents
    })
  } catch (error: any) {
    console.error('MongoDB connection error:', error)
    res.status(500).json({
      success: false,
      message: 'MongoDB connection failed',
      error: error?.message || 'Unknown error'
    })
  }
} 