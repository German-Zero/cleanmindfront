# CleanMind Frontend

Base de Next.js 16, React 19, TypeScript y Tailwind CSS 4.

```bash
npm install
npm run dev
```

## Proxy de la API

El frontend usa rutas relativas `/api/*`. Next.js las reenvía desde Vercel
hacia la API configurada en `API_URL`, manteniendo el dominio visible del
frontend y las cookies de autenticación en el mismo origen.

Desarrollo local:

```env
API_URL=http://localhost:3000
```

En Vercel, configura `API_URL` para Production y Preview:

```env
API_URL=https://cleanmind-api-germannaz.fly.dev
```

Después de cambiar la variable debes volver a desplegar. Google y Discord
deben usar callbacks del dominio estable de Vercel, por ejemplo:

```text
https://tu-proyecto.vercel.app/api/auth/google/callback
https://tu-proyecto.vercel.app/api/notifications/discord/callback
```

Los temas `LUNAR_MIND`, `DEEP_SERENITY` y `CALM_TECH` están declarados en `src/app/globals.css`. Para seleccionar uno, cambia el atributo `data-theme` del elemento `<html>`.

```text
src/
├── app/
├── components/
└── Styles/
```
