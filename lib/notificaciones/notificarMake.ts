interface MakeWebhookData {
  title: string
  excerpt: string
  url: string
  imageUrl?: string
  category: string
  author: string
  date: string
  siteName: string
}

export async function notificarMake(data: MakeWebhookData): Promise<boolean> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  const isDevelopment = process.env.NODE_ENV === 'development'

  // No enviar notificaciones en desarrollo a menos que esté explícitamente habilitado
  if (isDevelopment && !process.env.ENABLE_WEBHOOKS_IN_DEV) {
    console.log('🚫 Webhook deshabilitado en desarrollo')
    return false
  }

  if (!webhookUrl) {
    console.log('⚠️ MAKE_WEBHOOK_URL no configurado')
    return false
  }

  try {
    const payload = {
      title: data.title,
      excerpt: data.excerpt,
      url: data.url,
      imageUrl: data.imageUrl || '',
      category: data.category,
      author: data.author,
      date: data.date,
      siteName: data.siteName,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TVGT-USA-Webhook/1.0',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log('✅ Webhook enviado exitosamente a Make')
      return true
    } else {
      console.error('❌ Error en webhook:', response.status, response.statusText)
      return false
    }
  } catch (error) {
    console.error('❌ Error enviando webhook a Make:', error)
    return false
  }
}

// Función para formatear el mensaje para redes sociales
export function formatearMensajeSocial(data: MakeWebhookData): {
  twitter: string
  facebook: string
  instagram: string
} {
  const hashtags = `#TVGTUSA #Noticias #ComunidadHispana #EstadosUnidos`
  const url = data.url

  // Twitter (280 caracteres máximo)
  const twitter = `${data.title}

${data.excerpt.substring(0, 200)}...

${hashtags}

${url}`

  // Facebook (más espacio para texto)
  const facebook = `${data.title}

${data.excerpt}

📰 ${data.category} | 👤 ${data.author}

${hashtags}

🔗 Lee la noticia completa: ${url}`

  // Instagram (enfocado en visual)
  const instagram = `${data.title}

${data.excerpt}

📰 ${data.category}
👤 ${data.author}
📅 ${new Date(data.date).toLocaleDateString('es-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}

${hashtags}

🔗 Link en bio: ${url}`

  return {
    twitter: twitter.substring(0, 280),
    facebook,
    instagram,
  }
}

// Función para generar datos de webhook desde un post de WordPress
export function generarDatosWebhook(post: any, baseUrl: string): MakeWebhookData {
  return {
    title: post.title,
    excerpt: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    url: `${baseUrl}/noticias/${post.slug}`,
    imageUrl: post.featuredImage?.node.sourceUrl,
    category: post.categories.nodes[0]?.name || 'Noticias',
    author: post.author.node.name,
    date: post.date,
    siteName: 'TVGT USA',
  }
}
