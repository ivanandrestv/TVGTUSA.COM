import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/graphql'
import { formatDate, getCleanExcerpt } from '@/lib/graphql'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Generar rutas estáticas
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generar metadata dinámico
export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Noticia no encontrada - TVGT USA',
    }
  }

  const excerpt = getCleanExcerpt(post.excerpt, 160)
  const imageUrl = post.featuredImage?.node.sourceUrl

  return {
    title: `${post.title} - TVGT USA`,
    description: excerpt,
    authors: [{ name: post.author.node.name }],
    publishedTime: post.date,
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.node.name],
      images: imageUrl ? [
        {
          url: imageUrl,
          width: post.featuredImage?.node.mediaDetails.width || 1200,
          height: post.featuredImage?.node.mediaDetails.height || 630,
          alt: post.featuredImage?.node.altText || post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

// Componente de carga
function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-8 bg-gray-800 rounded animate-pulse w-32"></div>
      <div className="h-96 bg-gray-800 rounded-xl animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-800 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-800 rounded animate-pulse w-5/6"></div>
      </div>
    </div>
  )
}

// Componente principal
async function PostPageContent({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.featuredImage?.node.sourceUrl
  const imageAlt = post.featuredImage?.node.altText || post.title
  const category = post.categories.nodes[0]?.name || 'Noticias'
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/noticias/${post.slug}`

  return (
    <article className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/noticias">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a noticias
            </Button>
          </Link>
        </div>

        {/* Header del artículo */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author.node.name}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Compartir:</span>
              <div className="flex space-x-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Imagen destacada */}
        {imageUrl && (
          <div className="mb-8">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          </div>
        )}

        {/* Contenido del artículo */}
        <div className="prose-custom max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-300 leading-relaxed"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.nodes.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.nodes.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-xl p-8 text-center border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Te gustó esta noticia?
          </h3>
          <p className="text-gray-300 mb-6">
            Mantente al día con todas las noticias de TVGT USA para la comunidad hispana en Estados Unidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/noticias">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Ver más noticias
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Suscribirse al newsletter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PostPageContent params={params} />
    </Suspense>
  )
}

export const revalidate = 300 // Revalidar cada 5 minutos
