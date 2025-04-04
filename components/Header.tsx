'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Joby
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 border-2 border-[#fc7168] text-[#fc7168] px-4 py-2 rounded-md hover:bg-[#fc7168] hover:text-white transition-colors duration-200"
              >
                <UserIcon className="h-5 w-5" />
                <span>Registro</span>
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/auth"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Registro
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 