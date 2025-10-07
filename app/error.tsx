'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-10 w-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Oops!</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Algo salió mal
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado 
            y está trabajando para solucionarlo.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-800 rounded-lg p-4 mt-4">
              <summary className="text-red-400 cursor-pointer font-medium">
                Detalles del error (solo en desarrollo)
              </summary>
              <pre className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Intentar de nuevo
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3">
              <Home className="h-5 w-5 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Si el problema persiste, puedes{' '}
            <Link href="/contacto" className="text-blue-400 hover:text-blue-300">
              contactarnos
            </Link>
            {' '}para obtener ayuda.
          </p>
        </div>
      </div>
    </div>
  )
}
