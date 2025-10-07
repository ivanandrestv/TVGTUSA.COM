import { Suspense } from 'react'
import { getFeaturedPosts, getPosts } from '@/lib/graphql'
import { PostCard } from '@/components/PostCard'
import { LiveStream } from '@/components/LiveStream'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react'

// Componente de carga
function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero Section Skeleton */}
      <div className="h-96 bg-gray-800 rounded-xl animate-pulse"></div>
      
      {/* Featured Posts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 rounded-lg h-80 animate-pulse"></div>
        ))}
      </div>
      
      {/* Recent Posts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-800 rounded-lg h-48 animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

// Componente principal de la página
async function HomePageContent() {
  const [featuredPosts, recentPosts] = await Promise.all([
    getFeaturedPosts(3),
    getPosts(6)
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              TVGT <span className="text-blue-400">USA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Noticias para la Comunidad Hispana en Estados Unidos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/noticias">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Ver Noticias
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/en-vivo">
                <Button size="lg" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3">
                  <Clock className="mr-2 h-5 w-5" />
                  En Vivo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-blue-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-gray-400">Cobertura Continua</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">+1M</h3>
              <p className="text-gray-400">Audiencia Hispana</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">En Vivo</h3>
              <p className="text-gray-400">Streaming 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stream en Vivo */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Señal en <span className="text-red-400">Vivo</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Disfruta de nuestra programación en tiempo real
            </p>
          </div>
          <LiveStream className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Noticias Destacadas */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Noticias <span className="text-blue-400">Destacadas</span>
              </h2>
              <Link href="/noticias">
                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  featured={index === 0}
                  className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Noticias Recientes */}
      {recentPosts.posts.nodes.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Últimas <span className="text-red-400">Noticias</span>
              </h2>
              <Link href="/noticias">
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                  Ver Todas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.posts.nodes.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mantente Informado con <span className="text-blue-400">TVGT USA</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a nuestra comunidad y recibe las noticias más importantes 
            para la comunidad hispana en Estados Unidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/newsletter">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Suscribirse al Newsletter
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomePageContent />
    </Suspense>
  )
}

export const revalidate = 300 // Revalidar cada 5 minutos
