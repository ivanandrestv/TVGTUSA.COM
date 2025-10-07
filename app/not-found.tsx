import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-400 mb-4">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Te ayudamos a encontrar lo que necesitas.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
              <Home className="h-5 w-5 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
          
          <Link href="/noticias">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3">
              <Search className="h-5 w-5 mr-2" />
              Ver Noticias
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full text-gray-400 hover:text-white py-3"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver Atrás
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            Si crees que esto es un error, puedes{' '}
            <Link href="/contacto" className="text-blue-400 hover:text-blue-300">
              contactarnos
            </Link>
            {' '}para reportar el problema.
          </p>
        </div>
      </div>
    </div>
  )
}
