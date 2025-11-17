# Guía de Deployment - Formulario de Contacto

Esta guía explica cómo desplegar el sistema de formulario de contacto en diferentes plataformas.

## Tabla de Contenidos

- [Opciones de Deployment](#opciones-de-deployment)
- [Opción 1: Static Hosting (Formspree/EmailJS)](#opción-1-static-hosting-formspreeemailjs)
- [Opción 2: Serverless Functions (Resend)](#opción-2-serverless-functions-resend)
- [Opción 3: Full Server (Resend)](#opción-3-full-server-resend)
- [Configuración por Plataforma](#configuración-por-plataforma)

---

## Opciones de Deployment

### Comparación Rápida

| Método | Complejidad | Costo | Escalabilidad | Email Service |
|--------|-------------|-------|---------------|---------------|
| **Static** | Fácil | Gratis | Alta | Formspree/EmailJS |
| **Serverless** | Media | Gratis-$$ | Muy Alta | Resend/cualquiera |
| **Full Server** | Alta | $$-$$$ | Depende | Cualquiera |

---

## Opción 1: Static Hosting (Formspree/EmailJS)

### Cuando usar

- No quieres gestionar backend
- Tráfico bajo-medio
- Presupuesto limitado
- Deploy rápido

### Plataformas Soportadas

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

### Setup

#### 1. Configurar astro.config.mjs

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static', // ✅ Ya configurado
  // ...
});
```

#### 2. Elegir servicio de email

**Opción A: Formspree**

```astro
<!-- En tu página -->
<ContactForm apiEndpoint="https://formspree.io/f/YOUR_FORM_ID" />
```

**Opción B: EmailJS**

Ver `CONTACT-FORM-ALTERNATIVES.md` para implementación completa.

#### 3. Build

```bash
npm run build
```

Esto genera archivos estáticos en `dist/`

#### 4. Deploy

**Netlify**:
```bash
netlify deploy --prod --dir=dist
```

**Vercel**:
```bash
vercel --prod
```

**GitHub Pages**:
```bash
# Push dist/ folder o usa GitHub Actions
```

### Limitaciones

- No puedes usar el endpoint `/api/contact` con Resend
- Dependes de servicio externo (Formspree/EmailJS)
- Menos control sobre emails
- Límites de envíos según plan

---

## Opción 2: Serverless Functions (Resend)

### Cuando usar

- Quieres usar Resend para emails
- No necesitas servidor 24/7
- Escalabilidad automática
- Pay-per-use pricing

### Plataformas Soportadas

- Netlify Functions
- Vercel Edge Functions
- Cloudflare Workers
- AWS Lambda

### Setup General

#### 1. Instalar Adapter

El adapter depende de la plataforma:

**Netlify**:
```bash
npm install --save-dev @astrojs/netlify
```

**Vercel**:
```bash
npm install --save-dev @astrojs/vercel
```

**Cloudflare**:
```bash
npm install --save-dev @astrojs/cloudflare
```

#### 2. Configurar astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify'; // o vercel, cloudflare

export default defineConfig({
  output: 'server', // ✅ Cambiar a server
  adapter: netlify(), // ✅ Agregar adapter

  // Resto de configuración...
});
```

#### 3. Configurar Variables de Entorno

En la plataforma de hosting, agrega:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=contacto@plandemedios.com
RESEND_TO_EMAIL=info@plandemedios.com
```

#### 4. Build y Deploy

```bash
npm run build
# Deploy según plataforma
```

### Configuración por Plataforma

#### Netlify

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**astro.config.mjs**:
```javascript
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true, // Opcional: mejor performance
  }),
});
```

**Deploy**:
```bash
# Opción 1: CLI
netlify deploy --prod

# Opción 2: Git (recomendado)
git push origin main
# Netlify auto-deploys
```

#### Vercel

**vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**astro.config.mjs**:
```javascript
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
```

**Deploy**:
```bash
# Opción 1: CLI
vercel --prod

# Opción 2: Git (recomendado)
git push origin main
# Vercel auto-deploys
```

#### Cloudflare Pages

**wrangler.toml**:
```toml
name = "plan-de-medios"
compatibility_date = "2024-01-01"

[build]
  command = "npm run build"

[build.upload]
  format = "modules"
  dir = "dist"
```

**astro.config.mjs**:
```javascript
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: 'directory', // o 'advanced'
  }),
});
```

**Deploy**:
```bash
# Opción 1: CLI
wrangler pages publish dist

# Opción 2: Git
git push origin main
# Cloudflare auto-deploys
```

### Costos

| Plataforma | Gratis | Paid |
|------------|--------|------|
| **Netlify** | 125k requests/mes | $19/mes (starter) |
| **Vercel** | 100k requests/mes | $20/mes (pro) |
| **Cloudflare** | 100k requests/día | $5/mes (workers) |

---

## Opción 3: Full Server (Resend)

### Cuando usar

- Necesitas total control
- Tráfico muy alto y predecible
- Múltiples servicios backend
- Requisitos especiales de seguridad

### Plataformas

- DigitalOcean
- AWS EC2
- Google Cloud Compute
- Heroku
- Railway

### Setup con Node.js Adapter

#### 1. Instalar Node Adapter

```bash
npm install --save-dev @astrojs/node
```

#### 2. Configurar astro.config.mjs

```javascript
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone', // o 'middleware'
  }),
});
```

#### 3. Build

```bash
npm run build
```

Esto genera una aplicación Node.js en `dist/`

#### 4. Crear servidor

**server.js** (opcional, para customización):
```javascript
import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';

const app = express();
app.use(express.static('dist/client/'));
app.use(ssrHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

#### 5. Ejecutar

```bash
# Directo
node dist/server/entry.mjs

# Con PM2 (producción)
pm2 start dist/server/entry.mjs --name plan-de-medios

# Con Docker
docker build -t plan-de-medios .
docker run -p 3000:3000 plan-de-medios
```

### Dockerfile Ejemplo

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --production

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server/entry.mjs"]
```

### Deploy en VPS (DigitalOcean)

```bash
# 1. Crear droplet
# Ubuntu 22.04, Node.js preset

# 2. SSH al servidor
ssh root@your-server-ip

# 3. Clonar repo
git clone https://github.com/yourusername/plan-de-medios.git
cd plan-de-medios

# 4. Instalar dependencias
npm install

# 5. Configurar .env
nano .env
# Pegar variables de entorno

# 6. Build
npm run build

# 7. Instalar PM2
npm install -g pm2

# 8. Iniciar aplicación
pm2 start dist/server/entry.mjs --name plan-de-medios
pm2 save
pm2 startup

# 9. Configurar Nginx reverse proxy
sudo apt install nginx
# ... configurar nginx ...

# 10. SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d plandemedios.com
```

---

## Configuración por Plataforma

### Variables de Entorno

Todas las plataformas necesitan estas variables:

```env
# Resend (si aplica)
RESEND_API_KEY=re_xxxxxxxxxxxxxx
RESEND_FROM_EMAIL=contacto@plandemedios.com
RESEND_TO_EMAIL=info@plandemedios.com

# Site config
PUBLIC_SITE_URL=https://www.plandemedios.com
PUBLIC_CONTACT_EMAIL=info@plandemedios.com
```

### Cómo agregar variables

**Netlify**:
1. Site settings → Environment variables
2. Add variable
3. Redeploy

**Vercel**:
1. Project Settings → Environment Variables
2. Add New
3. Redeploy

**Cloudflare Pages**:
1. Pages project → Settings → Environment variables
2. Add variable
3. Redeploy

**Heroku**:
```bash
heroku config:set RESEND_API_KEY=re_xxx
heroku config:set RESEND_FROM_EMAIL=contacto@plandemedios.com
```

---

## Testing en Producción

### Checklist Pre-Deploy

- [ ] Build local exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Dominio de email verificado (Resend)
- [ ] Form ID configurado (Formspree/EmailJS)
- [ ] Tests manuales en staging

### Verificación Post-Deploy

1. **Enviar form de prueba**
   - Datos válidos → debe enviar
   - Datos inválidos → debe mostrar errores
   - Rate limit → debe activarse después de 3 envíos

2. **Verificar emails**
   - Email llegó a destinatario
   - Template se ve bien
   - Reply-to funciona

3. **Verificar logs**
   - No errores en consola
   - Logs de envíos exitosos

### Monitoreo

**Netlify**:
- Functions logs en dashboard
- Analytics integrado

**Vercel**:
- Runtime logs en dashboard
- Analytics y Web Vitals

**Cloudflare**:
- Workers analytics
- Logs en Logpush

---

## Troubleshooting por Plataforma

### Netlify

**Error: Function timeout**
- Aumenta timeout en `netlify.toml`:
```toml
[functions]
  timeout = 10
```

**Error: Build fails**
- Verifica Node version en `netlify.toml`
- Check build logs por errores específicos

### Vercel

**Error: Serverless Function size limit**
- Optimiza bundle size
- Usa edge functions en lugar de serverless

**Error: Cold start timeout**
- Usa regions más cercanas
- Considera warming strategy

### Cloudflare

**Error: Workers KV not found**
- Verifica wrangler.toml bindings
- Check environment en dashboard

**Error: CPU limit exceeded**
- Optimiza código
- Reduce operaciones síncronas

---

## Recomendaciones

### Para Proyectos Pequeños
**Usa**: Static + Formspree
- Más simple
- Gratis o muy barato
- Suficiente para < 50 leads/mes

### Para Proyectos Medianos
**Usa**: Netlify/Vercel + Resend
- Balance perfecto
- Escalabilidad automática
- Professional email handling

### Para Proyectos Enterprise
**Usa**: Full server + Resend
- Control total
- Sin límites
- Integración con sistemas existentes

---

## Migración

### De Static a Serverless

1. Instalar adapter: `npm install @astrojs/netlify`
2. Actualizar `astro.config.mjs`: `output: 'server'`
3. Configurar variables de entorno
4. Rebuild y deploy
5. Cambiar ContactForm endpoint a `/api/contact`

### De Formspree a Resend

1. Configurar Resend (API key, dominio)
2. Agregar variables de entorno
3. Cambiar endpoint: `apiEndpoint="/api/contact"`
4. Testing en staging
5. Deploy a producción
6. Monitorear primeras 24h

---

## Checklist Final

Antes de deployment a producción:

- [ ] Email service configurado y testeado
- [ ] Variables de entorno en hosting
- [ ] Dominio verificado (si Resend)
- [ ] Build exitoso localmente
- [ ] Tests manuales completos
- [ ] Rate limiting verificado
- [ ] Monitoring configurado
- [ ] Backup plan (fallback a Formspree)
- [ ] Documentación actualizada
- [ ] Equipo entrenado en troubleshooting

---

## Recursos

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Cloudflare Docs: https://developers.cloudflare.com
- Astro Adapters: https://docs.astro.build/en/guides/integrations-guide/
- Resend Docs: https://resend.com/docs
