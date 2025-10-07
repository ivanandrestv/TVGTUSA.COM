import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/graphql'
import { getCleanExcerpt } from '@/lib/graphql'

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tvgtusa.com'
    const postsData = await getPosts(20) // Últimas 20 noticias
    const posts = postsData.posts.nodes

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TVGT USA - Noticias para la Comunidad Hispana</title>
    <description>Portal digital con las últimas noticias de TVGT USA, enfocado en la comunidad hispana en Estados Unidos.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>es-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>TVGT USA</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${posts
      .map((post) => {
        const excerpt = getCleanExcerpt(post.excerpt, 200)
        const imageUrl = post.featuredImage?.node.sourceUrl
        const category = post.categories.nodes[0]?.name || 'Noticias'
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${excerpt}]]></description>
      <link>${baseUrl}/noticias/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/noticias/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author.node.name}</author>
      <category>${category}</category>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg"/>` : ''}
    </item>`
      })
      .join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}
