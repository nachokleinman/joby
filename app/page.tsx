'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // La redirección automática al perfil estaba causando problemas
    // Removemos esta redirección para permitir ver la landing page
    // incluso si el usuario ya está autenticado
    
    /*
    // Verificar si el usuario ya ha iniciado sesión
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      // Si hay una sesión activa, redirigir al perfil
      router.push('/profile')
    }
    */
  }, [router])

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Job Seeker's Dream: Streamline Your Job Search with AI
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
              In today's competitive job market, finding the right opportunity can be a daunting task. With countless job listings and endless applications, it's easy to get overwhelmed and lose motivation. But what if there was a way to streamline your job search and make it more efficient?
            </p>
            <Link href="/auth" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 shadow-lg">
              Try Job Seeker's Dream Today
            </Link>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Introduction</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Introducing Job Seeker's Dream, an AI-powered tool that revolutionizes the way you find and apply for jobs. With just a few clicks, you can upload your resume, set your job preferences, and let our AI do the rest.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How it Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Resume Analysis</h3>
                <p className="text-gray-600">
                  Job Seeker's Dream uses advanced algorithms to analyze your resume and identify your skills, experience, and desired job roles.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Job Matching</h3>
                <p className="text-gray-600">
                  It then scours the web for relevant job listings that match your profile, saving you hours of manual searching.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full mb-4 mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Automated Applications</h3>
                <p className="text-gray-600">
                  Once it finds potential opportunities, Job Seeker's Dream automatically applies to them on your behalf. It fills out application forms, uploads your resume, and even crafts personalized cover letters, all in a matter of seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Benefits of Using Job Seeker's Dream</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Save Time</h3>
                  <p className="mt-2 text-gray-600">
                    No more wasting hours browsing through irrelevant job listings or filling out repetitive application forms.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Increase Your Chances</h3>
                  <p className="mt-2 text-gray-600">
                    Our AI-powered matching algorithm identifies opportunities that align perfectly with your skills and experience.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Stand Out from the Crowd</h3>
                  <p className="mt-2 text-gray-600">
                    Personalized cover letters and automated applications make your application more appealing to recruiters.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Reduce Stress</h3>
                  <p className="mt-2 text-gray-600">
                    Let Job Seeker's Dream handle the tedious parts of the job search so you can focus on what matters most: finding your dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-6">Ready to streamline your job search?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Ready to streamline your job search and land your dream job faster? Sign up for Job Seeker's Dream today and experience the future of job hunting.
            </p>
            <Link href="/auth" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 shadow-lg">
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
} 