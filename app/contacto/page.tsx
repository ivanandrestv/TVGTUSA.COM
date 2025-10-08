import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function ContactoPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estamos aquí para escucharte. Envíanos tus comentarios, sugerencias o consultas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600/20 rounded-full p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">contacto@tvgtusa.com</p>
                    <p className="text-gray-400 text-sm">Respuesta en 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-600/20 rounded-full p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Teléfono</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Lun - Vie, 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-600/20 rounded-full p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Oficina</h3>
                    <p className="text-gray-300">
                      123 Main Street<br />
                      Miami, FL 33101<br />
                      Estados Unidos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Horarios de Atención</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Lunes - Viernes</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sábados</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Domingos</span>
                  <span className="text-white">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Síguenos en Redes</h3>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', href: '#', color: 'bg-blue-600' },
                  { name: 'Twitter', href: '#', color: 'bg-sky-500' },
                  { name: 'Instagram', href: '#', color: 'bg-pink-600' },
                  { name: 'YouTube', href: '#', color: 'bg-red-600' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`${social.color} text-white p-3 rounded-full hover:opacity-80 transition-opacity`}
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto estático */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
            
            <div className="space-y-6">
              <div className="text-center py-8">
                <Mail className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Contáctanos por Email</h3>
                <p className="text-gray-300 mb-6">
                  Para enviarnos un mensaje, utiliza nuestro email de contacto.
                </p>
                <a 
                  href="mailto:contacto@tvgtusa.com?subject=Consulta desde TVGT USA"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Enviar Email
                </a>
              </div>
              
              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-white font-semibold mb-3">Información del Mensaje</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>• Incluye tu nombre completo</p>
                  <p>• Especifica el asunto de tu consulta</p>
                  <p>• Proporciona detalles relevantes</p>
                  <p>• Te responderemos en 24 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Contacto - TVGT USA',
  description: 'Contáctanos para consultas, sugerencias o información. Estamos aquí para servir a la comunidad hispana en Estados Unidos.',
  openGraph: {
    title: 'Contacto - TVGT USA',
    description: 'Contáctanos para consultas, sugerencias o información.',
    type: 'website',
  },
}