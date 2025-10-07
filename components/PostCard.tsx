import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { WordPressPost } from '@/types/wordpress'
import { formatDate, getCleanExcerpt } from '@/lib/graphql'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: WordPressPost
  featured?: boolean
  className?: string
}

export function PostCard({ post, featured = false, className }: PostCardProps) {
  const imageUrl = post.featuredImage?.node.sourceUrl
  const imageAlt = post.featuredImage?.node.altText || post.title
  const excerpt = getCleanExcerpt(post.excerpt, featured ? 200 : 120)
  const category = post.categories.nodes[0]?.name || 'Noticias'

  if (featured) {
    return (
      <article className={cn("group cursor-pointer", className)}>
        <Link href={`/noticias/${post.slug}`}>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl">
            {/* Imagen destacada */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">TVGT</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-300 text-lg mb-4 line-clamp-3">
                {excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author.node.name}
                  </div>
                </div>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                  <span className="text-sm font-medium mr-2">Leer más</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className={cn("group cursor-pointer", className)}>
      <Link href={`/noticias/${post.slug}`}>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
          {/* Imagen */}
          <div className="relative h-48 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-red-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">TVGT</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                {category}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                <span className="mr-1">Leer</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
