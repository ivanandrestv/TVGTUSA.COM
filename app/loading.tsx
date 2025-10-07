export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Logo animado */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-white">TVGT USA</h1>
          <p className="text-gray-400">Cargando...</p>
        </div>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 mt-6">
          Preparando tu experiencia...
        </p>
      </div>
    </div>
  )
}
