import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  const footerLinks = {
    noticias: [
      { name: 'Últimas Noticias', href: '/noticias' },
      { name: 'Política', href: '/categoria/politica' },
      { name: 'Economía', href: '/categoria/economia' },
      { name: 'Deportes', href: '/categoria/deportes' },
    ],
    empresa: [
      { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
      { name: 'Contacto', href: '/contacto' },
      { name: 'Trabaja con Nosotros', href: '/trabaja-con-nosotros' },
      { name: 'Términos de Uso', href: '/terminos' },
    ],
    recursos: [
      { name: 'En Vivo', href: '/en-vivo' },
      { name: 'Podcasts', href: '/podcasts' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'RSS', href: '/rss.xml' },
    ],
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TVGT USA</h3>
                <p className="text-sm text-gray-400">Noticias para la Comunidad Hispana</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              Portal digital enfocado en la comunidad hispana en Estados Unidos. 
              Información actualizada, análisis y cobertura especializada.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Noticias */}
          <div>
            <h4 className="text-white font-semibold mb-4">Noticias</h4>
            <ul className="space-y-2">
              {footerLinks.noticias.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contacto */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>contacto@tvgtusa.com</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © {currentYear} TVGT USA. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
