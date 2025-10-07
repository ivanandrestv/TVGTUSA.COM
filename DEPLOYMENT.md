# Guía de Despliegue - TVGT USA

Esta guía te ayudará a desplegar TVGT USA en producción usando Vercel y Cloudflare.

## 🚀 Despliegue en Vercel

### 1. Preparación del Repositorio

```bash
# Asegúrate de que el código esté en GitHub/GitLab
git add .
git commit -m "Initial commit - TVGT USA"
git push origin main
```

### 2. Configuración en Vercel

1. **Crear cuenta en Vercel**
   - Visita [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub/GitLab

2. **Importar proyecto**
   - Click en "New Project"
   - Selecciona el repositorio de TVGT USA
   - Configura el framework: Next.js

3. **Variables de entorno**
   ```env
   NEXT_PUBLIC_WP_GRAPHQL_URL=https://redaccion.centraldenoticiasgt.com/graphql
   NEXT_PUBLIC_CATEGORY_SLUG=tvgtusa
   NEXT_PUBLIC_SITE_URL=https://tvgtusa.com
   MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-id
   NEXT_PUBLIC_STREAM_URL=https://your-stream-url.com/stream.m3u8
   WP_WEBHOOK_TOKEN=your-secure-token-here
   NEXT_PUBLIC_REVALIDATE_TIME=300
   ```

4. **Configuración de build**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 3. Despliegue

```bash
# Despliegue automático desde main branch
git push origin main
```

## 🌐 Configuración de Dominio

### 1. Configurar DNS en Cloudflare

1. **Agregar dominio**
   - Login en [cloudflare.com](https://cloudflare.com)
   - Agregar dominio: `tvgtusa.com`

2. **Configurar registros DNS**
   ```
   Tipo: A
   Nombre: @
   Contenido: 76.76.19.61 (IP de Vercel)
   TTL: Auto

   Tipo: CNAME
   Nombre: www
   Contenido: cname.vercel-dns.com
   TTL: Auto
   ```

3. **Configurar SSL**
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - HSTS: Enable

### 2. Configurar en Vercel

1. **Agregar dominio personalizado**
   - Dashboard de Vercel → Project → Settings → Domains
   - Agregar: `tvgtusa.com` y `www.tvgtusa.com`

2. **Verificar DNS**
   - Esperar propagación DNS (puede tomar hasta 24 horas)
   - Verificar certificado SSL automático

## 🔧 Configuración de WordPress

### 1. Configurar WPGraphQL

```php
// En functions.php del tema de WordPress
add_action('graphql_register_types', function() {
    register_graphql_field('Post', 'featuredImage', [
        'type' => 'MediaItem',
        'description' => 'Featured image of the post',
        'resolve' => function($post) {
            return get_post_thumbnail_id($post->ID) ? 
                get_post(get_post_thumbnail_id($post->ID)) : null;
        }
    ]);
});
```

### 2. Configurar CORS

```php
// Permitir CORS para el frontend
add_action('init', function() {
    header("Access-Control-Allow-Origin: https://tvgtusa.com");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
```

### 3. Configurar Webhook

```php
// En functions.php - Webhook para nuevas publicaciones
add_action('publish_post', function($post_id) {
    $post = get_post($post_id);
    $categories = wp_get_post_categories($post_id);
    
    // Verificar si es de la categoría correcta
    $target_category = get_category_by_slug('tvgtusa');
    if (!in_array($target_category->term_id, $categories)) {
        return;
    }
    
    // Enviar webhook
    $webhook_url = 'https://tvgtusa.com/api/webhook/new-post';
    $data = [
        'id' => $post_id,
        'title' => $post->post_title,
        'slug' => $post->post_name,
        'content' => $post->post_content,
        'excerpt' => $post->post_excerpt,
        'date' => $post->post_date,
        'status' => $post->post_status,
        'categories' => array_map(function($cat_id) {
            $cat = get_category($cat_id);
            return ['id' => $cat->term_id, 'name' => $cat->name, 'slug' => $cat->slug];
        }, $categories),
        'author' => [
            'name' => get_the_author_meta('display_name', $post->post_author),
            'slug' => get_the_author_meta('user_nicename', $post->post_author)
        ]
    ];
    
    wp_remote_post($webhook_url, [
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . get_option('webhook_token')
        ],
        'body' => json_encode($data)
    ]);
});
```

## 🤖 Configuración de Make (Integromat)

### 1. Crear Escenario

1. **Trigger: Webhook**
   - URL: `https://tvgtusa.com/api/webhook/new-post`
   - Método: POST
   - Headers: `Authorization: Bearer your-token`

2. **Módulos a agregar:**
   - Facebook: Create a Post
   - Twitter: Create a Tweet
   - Instagram: Create a Media Object
   - LinkedIn: Create a Post

### 2. Configurar Formato de Mensajes

```javascript
// Para Facebook
`${title}

${excerpt}

📰 ${category} | 👤 ${author}

#TVGTUSA #Noticias #ComunidadHispana #EstadosUnidos

🔗 ${url}`

// Para Twitter (280 caracteres)
`${title.substring(0, 100)}...

${excerpt.substring(0, 150)}...

#TVGTUSA #Noticias

${url}`
```

## 📊 Monitoreo y Analytics

### 1. Google Analytics 4

```javascript
// En _app.tsx o layout.tsx
import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaMeasurementId="G-XXXXXXXXXX" />
      <Component {...pageProps} />
    </>
  )
}
```

### 2. Vercel Analytics

```bash
npm install @vercel/analytics
```

```javascript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🔍 SEO y Performance

### 1. Verificar SEO

- **Google Search Console**: Verificar propiedad del sitio
- **Google PageSpeed Insights**: Optimizar Core Web Vitals
- **Lighthouse**: Auditar rendimiento

### 2. Configurar Sitemap

```bash
# El sitemap se genera automáticamente en:
# https://tvgtusa.com/sitemap.xml
```

### 3. Configurar RSS

```bash
# El RSS se genera automáticamente en:
# https://tvgtusa.com/rss.xml
```

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error 500 en Vercel**
   ```bash
   # Verificar logs
   vercel logs
   
   # Verificar variables de entorno
   vercel env ls
   ```

2. **GraphQL no funciona**
   - Verificar endpoint de WordPress
   - Comprobar CORS
   - Revisar permisos de WPGraphQL

3. **Imágenes no cargan**
   - Verificar dominio en next.config.js
   - Comprobar configuración de imágenes en WordPress

4. **Webhook no funciona**
   - Verificar token de seguridad
   - Comprobar logs de Make
   - Revisar configuración de WordPress

### Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Verificar tipos
npm run type-check

# Linting
npm run lint

# Despliegue manual
vercel --prod
```

## 📞 Soporte

Para problemas de despliegue:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Cloudflare**: [developers.cloudflare.com](https://developers.cloudflare.com)
- **WordPress**: [wordpress.org/support](https://wordpress.org/support)

---

¡Tu sitio TVGT USA debería estar funcionando en https://tvgtusa.com! 🎉
