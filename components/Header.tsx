'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()

  // Comprobar si el usuario está autenticado cuando el componente se monta
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      setIsUserLoggedIn(Boolean(token && user))
    }
  }, [])

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Actualizar estado
    setIsUserLoggedIn(false)
    setShowLogoutModal(false)
    
    // Redirigir a la página de autenticación
    router.push('/auth')
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  return (
    <header className="bg-white shadow-sm">
      {/* Modal de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-xl transform transition-all">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">¿Estás seguro que deseas salir?</h3>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelLogout}
                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Joby
            </Link>
          </div>
          <div>
            {isUserLoggedIn ? (
              <div className="flex space-x-4">
                <Link href="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Dashboard
                </Link>
                <Link href="/profile" className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-900">
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link href="/auth" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 