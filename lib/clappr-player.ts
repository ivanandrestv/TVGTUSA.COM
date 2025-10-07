'use client'

// Configuración del Clappr Player para TVGT USA
export const clapprConfig = {
  // Configuración base
  width: '100%',
  height: '100%',
  autoPlay: true,
  mute: false,
  volume: 50,
  
  // Configuración de fuente
  source: process.env.NEXT_PUBLIC_STREAM_URL || '',
  
  // Configuración de plugins
  plugins: {
    // Plugin de calidad
    'quality-selector': {},
    // Plugin de estadísticas
    'stats': {},
    // Plugin de pantalla completa
    'fullscreen': {},
  },
  
  // Configuración de controles
  controls: {
    play: true,
    pause: true,
    stop: false,
    volume: true,
    fullscreen: true,
    seekbar: true,
    time: true,
    progress: true,
    loading: true,
    live: true,
    quality: true,
  },
  
  // Configuración de eventos
  events: {
    onReady: () => {
      console.log('Clappr Player está listo')
    },
    onPlay: () => {
      console.log('Reproducción iniciada')
    },
    onPause: () => {
      console.log('Reproducción pausada')
    },
    onError: (error: any) => {
      console.error('Error en Clappr Player:', error)
    },
  },
  
  // Configuración de UI
  poster: '/images/live-poster.jpg',
  
  // Configuración de streaming
  hlsjsConfig: {
    enableWorker: true,
    lowLatencyMode: true,
    backBufferLength: 90,
  },
  
  // Configuración de branding
  branding: {
    logo: '/images/tvgt-logo.png',
    logoLink: '/',
    logoPosition: 'top-left',
  },
}

// Función para inicializar Clappr Player
export function initializeClapprPlayer(
  containerId: string,
  streamUrl?: string
): any {
  if (typeof window === 'undefined') {
    return null
  }

  // Importar Clappr dinámicamente
  const Clappr = require('clappr')
  
  const config = {
    ...clapprConfig,
    source: streamUrl || clapprConfig.source,
  }

  return new Clappr.Player(config)
}

// Función para destruir el player
export function destroyClapprPlayer(player: any): void {
  if (player && typeof player.destroy === 'function') {
    player.destroy()
  }
}

// Función para cambiar la fuente del stream
export function changeStreamSource(player: any, newSource: string): void {
  if (player && typeof player.configure === 'function') {
    player.configure({
      source: newSource,
    })
  }
}

// Función para obtener estadísticas del player
export function getPlayerStats(player: any): any {
  if (player && player.getPlugin && player.getPlugin('stats')) {
    return player.getPlugin('stats').getStats()
  }
  return null
}

// Configuración de calidad de video
export const qualityOptions = [
  { label: 'Auto', value: 'auto' },
  { label: '1080p', value: '1080p' },
  { label: '720p', value: '720p' },
  { label: '480p', value: '480p' },
  { label: '360p', value: '360p' },
]

// Configuración de idiomas (para subtítulos si están disponibles)
export const languageOptions = [
  { label: 'Español', value: 'es' },
  { label: 'English', value: 'en' },
]

// Función para manejar errores de streaming
export function handleStreamError(error: any): string {
  const errorMessages: { [key: string]: string } = {
    'network_error': 'Error de conexión. Verifica tu internet.',
    'format_error': 'Formato de video no soportado.',
    'manifest_error': 'Error al cargar la lista de reproducción.',
    'timeout_error': 'Tiempo de espera agotado.',
    'unknown_error': 'Error desconocido. Intenta refrescar la página.',
  }

  return errorMessages[error.type] || errorMessages['unknown_error']
}

// Función para verificar si el stream está disponible
export async function checkStreamAvailability(streamUrl: string): Promise<boolean> {
  try {
    const response = await fetch(streamUrl, {
      method: 'HEAD',
      mode: 'no-cors',
    })
    return true
  } catch (error) {
    console.error('Stream no disponible:', error)
    return false
  }
}
