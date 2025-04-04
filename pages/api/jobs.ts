import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'
import { scrapeLinkedInJobs } from '../../scrapers/linkedin/jobScraper'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { keywords } = req.query
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    // Primero intentamos obtener los trabajos de la base de datos
    const cachedJobs = await db.collection('jobs').find({
      keywords: keywords,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Últimas 24 horas
    }).toArray()

    if (cachedJobs.length > 0) {
      return res.status(200).json(cachedJobs)
    }

    // Si no hay trabajos en caché, los obtenemos del scraper
    const jobs = await scrapeLinkedInJobs(keywords as string)
    
    // Guardamos los trabajos en la base de datos
    if (jobs.length > 0) {
      await db.collection('jobs').insertMany(
        jobs.map(job => ({
          ...job,
          keywords,
          createdAt: new Date()
        }))
      )
    }

    res.status(200).json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 