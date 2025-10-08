'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LiveStreamProps {
  streamUrl?: string
  className?: string
}

export function LiveStream({ streamUrl, className }: LiveStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // URL por defecto si no se proporciona una
  const defaultStreamUrl = process.env.NEXT_PUBLIC_STREAM_URL || ''

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }
    const handleError = () => {
      setError('Error al cargar el stream en vivo')
      setIsLoading(false)
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadstart', handleLoadStart)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  if (error) {
    return (
      <div className={`bg-gray-900 rounded-lg p-8 text-center ${className}`}>
        <div className="text-red-400 mb-4">
          <Play className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">Error de Conexión</h3>
        <p className="text-gray-400 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 hover:bg-red-700"
        >
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className={`bg-black rounded-lg overflow-hidden shadow-2xl ${className}`}>
      {/* Player Container */}
      <div className="relative aspect-video bg-gray-900">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-white">Cargando stream en vivo...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Video Player */}
            {streamUrl || defaultStreamUrl ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={false}
                autoPlay
                muted={isMuted}
                playsInline
              >
                <source src={streamUrl || defaultStreamUrl} type="application/x-mpegURL" />
                <source src={streamUrl || defaultStreamUrl} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-red-600 rounded-full p-4 mb-4 inline-block animate-pulse">
                    <Play className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">EN VIVO</h3>
                  <p className="text-lg opacity-90">TVGT USA</p>
                  <p className="text-sm opacity-75 mt-2">URL de stream no configurada</p>
                </div>
              </div>
            )}

            {/* Overlay de controles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Barra de progreso simulada */}
                <div className="w-full bg-gray-600 rounded-full h-1 mb-4">
                  <div className="bg-red-600 h-1 rounded-full w-full animate-pulse"></div>
                </div>

                {/* Controles */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicador EN VIVO */}
            <div className="absolute top-4 left-4">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">EN VIVO</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Información del stream */}
      <div className="p-4 bg-gray-900">
        <h3 className="text-white font-semibold text-lg mb-2">TVGT USA - Señal en Vivo</h3>
        <p className="text-gray-400 text-sm">
          Disfruta de nuestra programación en vivo las 24 horas del día
        </p>
      </div>
    </div>
  )
}
