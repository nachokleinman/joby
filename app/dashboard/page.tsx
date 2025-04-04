'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/auth')
      return
    }

    setUser(JSON.parse(storedUser))
  }, [router])

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    // Eliminar datos de sesión
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Redirigir a la página de autenticación
    router.push('/auth')
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-2xl font-bold mb-4">Bienvenido a tu dashboard</h2>
            <p>Hola, {user.name}. Este es tu panel de control.</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 