import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || 'TVGT USA - Noticias para la Comunidad Hispana'
    const category = searchParams.get('category') || 'Noticias'
    const imageUrl = searchParams.get('image') || null

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e40af',
            backgroundImage: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #dc2626 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                T
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                TVGT USA
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                }}
              >
                Noticias para la Comunidad Hispana
              </p>
            </div>
          </div>

          {/* Category Badge */}
          <div
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '30px',
            }}
          >
            {category}
          </div>

          {/* Title */}
          <div
            style={{
              maxWidth: '800px',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: '1.2',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h2>
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              right: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '16px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#dc2626',
                  borderRadius: '50%',
                  marginRight: '8px',
                  animation: 'pulse 2s infinite',
                }}
              />
              EN VIVO 24/7
            </div>
            
            <div
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '16px',
              }}
            >
              tvgtusa.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
