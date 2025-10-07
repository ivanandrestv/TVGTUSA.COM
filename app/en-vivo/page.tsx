import { LiveStream } from '@/components/LiveStream'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Volume2, Settings, Maximize, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function EnVivoPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              TVGT USA <span className="text-red-400">En Vivo</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Disfruta de nuestra programación en tiempo real las 24 horas del día
            </p>
          </div>
        </div>

        {/* Player principal */}
        <div className="mb-12">
          <LiveStream className="max-w-6xl mx-auto" />
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-red-600/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
              <Volume2 className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Audio en Vivo</h3>
            <p className="text-gray-300">
              Escucha nuestra programación con la mejor calidad de audio disponible.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
              <Settings className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Controles Avanzados</h3>
            <p className="text-gray-300">
              Ajusta la calidad, volumen y configuración del reproductor según tus preferencias.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="bg-green-600/20 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
              <Maximize className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Pantalla Completa</h3>
            <p className="text-gray-300">
              Disfruta de la experiencia completa con nuestro modo pantalla completa.
            </p>
          </div>
        </div>

        {/* Programación */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Programación <span className="text-blue-400">Diaria</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { time: '06:00 - 09:00', program: 'Desayuno Informativo', host: 'María González' },
              { time: '09:00 - 12:00', program: 'Noticias Matutinas', host: 'Carlos Rodríguez' },
              { time: '12:00 - 15:00', program: 'Almuerzo con Noticias', host: 'Ana Martínez' },
              { time: '15:00 - 18:00', program: 'Tarde Informativa', host: 'Luis Hernández' },
              { time: '18:00 - 21:00', program: 'Noticias del Atardecer', host: 'Carmen López' },
              { time: '21:00 - 00:00', program: 'Noche Informativa', host: 'Roberto Silva' },
              { time: '00:00 - 03:00', program: 'Madrugada Informativa', host: 'Patricia Morales' },
              { time: '03:00 - 06:00', program: 'Amanecer Informativo', host: 'Diego Fernández' },
            ].map((schedule, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="text-red-400 font-semibold text-sm mb-2">{schedule.time}</div>
                <h4 className="text-white font-medium mb-1">{schedule.program}</h4>
                <p className="text-gray-400 text-sm">{schedule.host}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Problemas con la señal?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Si experimentas problemas con la transmisión en vivo, puedes contactarnos 
            o intentar refrescar la página. También puedes seguirnos en nuestras redes sociales 
            para actualizaciones en tiempo real.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Refrescar Página
            </Button>
            <Link href="/contacto">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Reportar Problema
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'En Vivo - TVGT USA',
  description: 'Disfruta de la señal en vivo de TVGT USA las 24 horas del día. Programación continua para la comunidad hispana en Estados Unidos.',
  openGraph: {
    title: 'TVGT USA - En Vivo',
    description: 'Disfruta de la señal en vivo de TVGT USA las 24 horas del día.',
    type: 'website',
  },
}
