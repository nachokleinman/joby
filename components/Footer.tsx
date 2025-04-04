import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="text-2xl font-bold">
              Joby
            </Link>
          </div>
          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Job Seeker's Dream. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
} 