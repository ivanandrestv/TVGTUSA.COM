import { Suspense } from 'react'
import { getPosts } from '@/lib/graphql'
import { PostCard } from '@/components/PostCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Calendar, Filter } from 'lucide-react'
import Link from 'next/link'

interface NoticiasPageProps {
  searchParams: {
    page?: string
    categoria?: string
  }
}

// Componente de carga
function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-32 bg-gray-800 rounded-xl animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-800 rounded-lg h-80 animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

// Componente principal
async function NoticiasPageContent({ searchParams }: NoticiasPageProps) {
  const currentPage = parseInt(searchParams.page || '1')
  const postsPerPage = 12
  const offset = (currentPage - 1) * postsPerPage

  const postsData = await getPosts(postsPerPage)
  const posts = postsData.posts.nodes
  const pageInfo = postsData.posts.pageInfo

  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Todas las <span className="text-blue-400">Noticias</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Mantente al día con las últimas noticias de TVGT USA para la comunidad hispana en Estados Unidos
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {posts.length} noticias encontradas
              </div>
            </div>
            
            <div className="text-gray-400 text-sm">
              Página {currentPage} de {totalPages}
            </div>
          </div>
        </div>

        {/* Grid de noticias */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <PostCard 
                key={post.id} 
                post={post}
                featured={index === 0}
                className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No hay noticias disponibles
            </h3>
            <p className="text-gray-400 mb-8">
              No se encontraron noticias en este momento. Vuelve pronto para ver las últimas actualizaciones.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Volver al inicio
              </Button>
            </Link>
          </div>
        )}

        {/* Paginación */}
        {posts.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4">
            {currentPage > 1 && (
              <Link href={`/noticias?page=${currentPage - 1}`}>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
              </Link>
            )}
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i
                if (pageNum > totalPages) return null
                
                return (
                  <Link key={pageNum} href={`/noticias?page=${pageNum}`}>
                    <Button
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      className={
                        pageNum === currentPage
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700"
                      }
                    >
                      {pageNum}
                    </Button>
                  </Link>
                )
              })}
            </div>
            
            {currentPage < totalPages && (
              <Link href={`/noticias?page=${currentPage + 1}`}>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl p-8 text-center border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿No quieres perderte ninguna noticia?
          </h3>
          <p className="text-gray-300 mb-6">
            Suscríbete a nuestro newsletter y recibe las noticias más importantes directamente en tu correo.
          </p>
          <Link href="/newsletter">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Suscribirse al Newsletter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function NoticiasPage({ searchParams }: NoticiasPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <NoticiasPageContent searchParams={searchParams} />
    </Suspense>
  )
}

export const metadata = {
  title: 'Noticias - TVGT USA',
  description: 'Todas las noticias de TVGT USA para la comunidad hispana en Estados Unidos. Información actualizada y cobertura especializada.',
  openGraph: {
    title: 'Noticias - TVGT USA',
    description: 'Todas las noticias de TVGT USA para la comunidad hispana en Estados Unidos.',
    type: 'website',
  },
}

export const revalidate = 300 // Revalidar cada 5 minutos
