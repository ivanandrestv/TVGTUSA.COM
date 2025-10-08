import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'TVGT USA - Noticias para la Comunidad Hispana en Estados Unidos',
    template: '%s | TVGT USA'
  },
  description: 'Portal digital con las últimas noticias de TVGT USA, enfocado en la comunidad hispana en Estados Unidos. Información actualizada, análisis y cobertura especializada.',
  keywords: ['TVGT USA', 'noticias hispanas', 'Estados Unidos', 'comunidad hispana', 'noticias en español', 'TVGT'],
  authors: [{ name: 'TVGT USA' }],
  creator: 'TVGT USA',
  publisher: 'TVGT USA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tvgtusa.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tvgtusa.com',
    title: 'TVGT USA - Noticias para la Comunidad Hispana en Estados Unidos',
    description: 'Portal digital con las últimas noticias de TVGT USA, enfocado en la comunidad hispana en Estados Unidos.',
    siteName: 'TVGT USA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TVGT USA - Noticias para la Comunidad Hispana',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TVGT USA - Noticias para la Comunidad Hispana en Estados Unidos',
    description: 'Portal digital con las últimas noticias de TVGT USA, enfocado en la comunidad hispana en Estados Unidos.',
    images: ['/og-image.jpg'],
    creator: '@TVGTUSA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
