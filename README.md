# TVGT USA - Portal Digital

Portal digital enfocado en la comunidad hispana en Estados Unidos, construido con Next.js 15 y WordPress como backend.

## 🚀 Características

- **Frontend Moderno**: Next.js 15 con App Router y TypeScript
- **Diseño Responsivo**: Tailwind CSS + shadcn/ui + Framer Motion
- **Backend WordPress**: Integración con WPGraphQL
- **Streaming en Vivo**: Clappr Player integrado
- **SEO Optimizado**: Meta tags dinámicos, sitemap y RSS
- **OG Dinámico**: Generación automática de imágenes para redes sociales
- **Automatización Social**: Webhook para Make/Integromat
- **ISR**: Revalidación automática cada 5 minutos

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 18, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: WordPress + WPGraphQL
- **Streaming**: Clappr Player
- **Despliegue**: Vercel + Cloudflare
- **Automatización**: Make/Integromat (opcional)

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd tvgtusa
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   NEXT_PUBLIC_WP_GRAPHQL_URL=https://redaccion.centraldenoticiasgt.com/graphql
   NEXT_PUBLIC_CATEGORY_SLUG=tvgtusa
   NEXT_PUBLIC_SITE_URL=https://tvgtusa.com
   MAKE_WEBHOOK_URL=tu-webhook-url-de-make
   NEXT_PUBLIC_STREAM_URL=tu-url-de-stream
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
2. **Configurar variables de entorno** en el dashboard de Vercel
3. **Desplegar automáticamente** desde la rama principal

### Configuración de Dominio

1. **Configurar DNS** en Cloudflare apuntando a Vercel
2. **SSL automático** con Cloudflare
3. **CDN global** para mejor rendimiento

## 🔧 Configuración

### WordPress Backend

El sitio utiliza WordPress como CMS con WPGraphQL:

- **Endpoint**: `https://redaccion.centraldenoticiasgt.com/graphql`
- **Categoría**: `tvgtusa`
- **Campos**: Posts, categorías, autores, imágenes destacadas

### Automatización Social

Configurar webhook en Make/Integromat:

1. **Crear escenario** en Make
2. **Configurar webhook** con la URL: `https://tvgtusa.com/api/webhook/new-post`
3. **Agregar token** de seguridad en variables de entorno
4. **Conectar** a redes sociales (Facebook, Twitter, Instagram)

### Streaming en Vivo

Configurar Clappr Player:

1. **Obtener URL** del stream HLS/DASH
2. **Configurar** en variables de entorno
3. **Personalizar** controles y configuración

## 📁 Estructura del Proyecto

```
tvgtusa/
├── app/                    # App Router de Next.js
│   ├── api/               # APIs y endpoints
│   ├── noticias/          # Páginas de noticias
│   ├── en-vivo/           # Página de streaming
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI base
│   ├── Header.tsx        # Header principal
│   ├── Footer.tsx        # Footer
│   ├── PostCard.tsx      # Tarjeta de noticia
│   └── LiveStream.tsx    # Player de streaming
├── lib/                  # Utilidades y configuraciones
│   ├── graphql.ts        # Cliente GraphQL
│   └── notificaciones/   # Webhooks y automatización
├── types/                # Tipos TypeScript
└── public/               # Archivos estáticos
```

## 🎨 Personalización

### Colores y Tema

Editar `tailwind.config.js` para personalizar:
- Colores de marca
- Tipografías
- Animaciones
- Espaciados

### Componentes

Los componentes están en `/components` y utilizan:
- **shadcn/ui** para componentes base
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones

### SEO y Meta Tags

Configurar en `app/layout.tsx`:
- Título y descripción por defecto
- Open Graph tags
- Twitter Cards
- Verificación de Google

## 🔍 SEO y Rendimiento

### Optimizaciones Implementadas

- **ISR**: Revalidación cada 5 minutos
- **Imágenes optimizadas**: Next.js Image component
- **Lazy loading**: Carga bajo demanda
- **Sitemap automático**: `/sitemap.xml`
- **RSS feed**: `/rss.xml`
- **Meta tags dinámicos**: Por cada noticia

### Métricas de Rendimiento

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **SEO Score**: 100/100

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error de GraphQL**
   - Verificar endpoint de WordPress
   - Comprobar categoría configurada
   - Revisar permisos de WPGraphQL

2. **Imágenes no cargan**
   - Verificar dominio en `next.config.js`
   - Comprobar CORS en WordPress
   - Revisar URLs de imágenes

3. **Webhook no funciona**
   - Verificar URL de Make
   - Comprobar token de seguridad
   - Revisar logs de Vercel

### Logs y Debugging

```bash
# Ver logs en desarrollo
npm run dev

# Ver logs en producción (Vercel)
vercel logs

# Verificar build
npm run build
```

## 📞 Soporte

Para soporte técnico:
- **Email**: soporte@tvgtusa.com
- **Documentación**: [Wiki del proyecto]
- **Issues**: [GitHub Issues]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

**TVGT USA** - Noticias para la Comunidad Hispana en Estados Unidos 🇺🇸
