import { NextRequest, NextResponse } from 'next/server'
import { notificarMake, generarDatosWebhook } from '@/lib/notificaciones/notificarMake'

export async function POST(request: NextRequest) {
  try {
    // Verificar que la solicitud viene de WordPress
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.WP_WEBHOOK_TOKEN

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Verificar que es un post de la categoría correcta
    const categorySlug = process.env.NEXT_PUBLIC_CATEGORY_SLUG || 'tvgtusa'
    const postCategories = body.categories || []
    
    const isTargetCategory = postCategories.some((cat: any) => 
      cat.slug === categorySlug
    )

    if (!isTargetCategory) {
      return NextResponse.json({ 
        message: 'Post no pertenece a la categoría objetivo',
        skipped: true 
      })
    }

    // Verificar que el post está publicado
    if (body.status !== 'publish') {
      return NextResponse.json({ 
        message: 'Post no está publicado',
        skipped: true 
      })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tvgtusa.com'
    const webhookData = generarDatosWebhook(body, baseUrl)

    // Enviar notificación a Make
    const success = await notificarMake(webhookData)

    if (success) {
      return NextResponse.json({ 
        message: 'Webhook enviado exitosamente',
        postId: body.id,
        title: body.title,
        url: webhookData.url
      })
    } else {
      return NextResponse.json({ 
        error: 'Error enviando webhook',
        postId: body.id 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error procesando webhook:', error)
    return NextResponse.json({ 
      error: 'Error interno del servidor' 
    }, { status: 500 })
  }
}

// Endpoint para probar el webhook
export async function GET() {
  const testData = {
    title: 'Noticia de Prueba - TVGT USA',
    excerpt: 'Esta es una noticia de prueba para verificar que el webhook funciona correctamente.',
    url: 'https://tvgtusa.com/noticias/noticia-de-prueba',
    imageUrl: 'https://tvgtusa.com/images/test-image.jpg',
    category: 'Noticias',
    author: 'Equipo TVGT USA',
    date: new Date().toISOString(),
    siteName: 'TVGT USA',
  }

  try {
    const success = await notificarMake(testData)
    
    return NextResponse.json({
      message: success ? 'Webhook de prueba enviado exitosamente' : 'Error enviando webhook de prueba',
      testData,
      success
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Error en webhook de prueba',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}
