import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Target, Award, Globe } from 'lucide-react'
import Link from 'next/link'

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Sobre <span className="text-blue-400">TVGT USA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conoce nuestra misión de informar y conectar a la comunidad hispana en Estados Unidos
            </p>
          </div>
        </div>

        {/* Historia */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Nuestra Historia</h2>
            <div className="prose-custom">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                TVGT USA nació con la visión de ser el puente informativo entre la comunidad hispana 
                y los acontecimientos más relevantes que afectan sus vidas en Estados Unidos. 
                Somos parte del ecosistema de TVGT Noticias, pero con un enfoque específico 
                en las necesidades y realidades de los hispanos en territorio estadounidense.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Desde nuestro inicio, nos hemos comprometido a proporcionar noticias precisas, 
                oportunas y relevantes que empoderen a nuestra comunidad para tomar decisiones 
                informadas y participar activamente en la sociedad estadounidense.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 mb-6 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
              <p className="text-gray-300 leading-relaxed">
                Informar, educar y conectar a la comunidad hispana en Estados Unidos a través de 
                noticias precisas, análisis profundos y cobertura especializada que refleje 
                nuestras realidades y aspiraciones.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="bg-red-600/20 rounded-full p-3 w-12 h-12 mb-6 flex items-center justify-center">
                <Globe className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
              <p className="text-gray-300 leading-relaxed">
                Ser la fuente de información más confiable y completa para la comunidad hispana 
                en Estados Unidos, contribuyendo al fortalecimiento de nuestra presencia 
                y participación en la sociedad estadounidense.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Inclusión',
                description: 'Creemos en la diversidad y en dar voz a todas las perspectivas de nuestra comunidad.',
                color: 'blue'
              },
              {
                icon: Award,
                title: 'Excelencia',
                description: 'Nos comprometemos con los más altos estándares de periodismo y calidad informativa.',
                color: 'red'
              },
              {
                icon: Globe,
                title: 'Conectividad',
                description: 'Facilitamos la conexión entre nuestra comunidad y el mundo que nos rodea.',
                color: 'green'
              }
            ].map((value, index) => {
              const Icon = value.icon
              const colorClasses = {
                blue: 'bg-blue-600/20 text-blue-400',
                red: 'bg-red-600/20 text-red-400',
                green: 'bg-green-600/20 text-green-400'
              }
              
              return (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <div className={`rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center ${colorClasses[value.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Nuestro Equipo</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Contamos con un equipo de periodistas, editores y profesionales de medios 
              comprometidos con la excelencia y la representación auténtica de nuestra comunidad.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'María González', role: 'Directora Editorial', bio: 'Más de 15 años de experiencia en periodismo hispano en Estados Unidos.' },
                { name: 'Carlos Rodríguez', role: 'Editor de Noticias', bio: 'Especialista en política y asuntos comunitarios hispanos.' },
                { name: 'Ana Martínez', role: 'Corresponsal', bio: 'Cobertura especializada en inmigración y derechos civiles.' },
                { name: 'Luis Hernández', role: 'Productor Digital', bio: 'Experto en contenido multimedia y redes sociales.' },
                { name: 'Carmen López', role: 'Editora de Video', bio: 'Producción de contenido audiovisual para plataformas digitales.' },
                { name: 'Roberto Silva', role: 'Analista de Datos', bio: 'Investigación y análisis de tendencias en la comunidad hispana.' }
              ].map((member, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Quieres formar parte de nuestra historia?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Si compartes nuestra pasión por el periodismo y la comunidad hispana, 
              te invitamos a conocer las oportunidades de trabajo con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trabaja-con-nosotros">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Trabaja con Nosotros
                </Button>
              </Link>
              <Link href="/contacto">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Sobre Nosotros - TVGT USA',
  description: 'Conoce la historia, misión y equipo de TVGT USA. Información sobre nuestro compromiso con la comunidad hispana en Estados Unidos.',
  openGraph: {
    title: 'Sobre Nosotros - TVGT USA',
    description: 'Conoce la historia, misión y equipo de TVGT USA.',
    type: 'website',
  },
}
