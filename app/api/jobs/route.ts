import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { scrapeLinkedInJobs } from '@/scrapers/linkedin/jobScraper'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const keywords = searchParams.get('keywords')

    if (!keywords) {
      return NextResponse.json(
        { error: 'Keywords parameter is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    // Buscar trabajos en caché
    const cachedJobs = await db.collection('jobs').find({
      keywords,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }).toArray()

    if (cachedJobs.length > 0) {
      return NextResponse.json(cachedJobs)
    }

    // Si no hay en caché, buscar nuevos trabajos
    const jobs = await scrapeLinkedInJobs(keywords)

    // Guardar en la base de datos
    if (jobs.length > 0) {
      await db.collection('jobs').insertMany(
        jobs.map(job => ({
          ...job,
          keywords,
          createdAt: new Date()
        }))
      )
    }

    return NextResponse.json(jobs)
  } catch (error: any) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 