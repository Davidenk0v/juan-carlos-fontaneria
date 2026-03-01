# L&M Fontanería — Sitio Web Corporativo

Sitio web de una sola página (landing page) para **L&M Fontanero Autorizado**, empresa de fontanería profesional. Construido con Astro 5, React 19 y Tailwind CSS 4.

---

## Tabla de contenidos

- [Descripción del proyecto](#descripción-del-proyecto)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Componentes](#componentes)
- [Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
- [Comandos disponibles](#comandos-disponibles)
- [Información de contacto del negocio](#información-de-contacto-del-negocio)
- [Créditos](#créditos)

---

## Descripción del proyecto

Landing page profesional para el servicio de fontanería **L&M Fontanero Autorizado** (N° 05-B-D90). El sitio presenta los servicios ofrecidos, facilita el contacto directo con el cliente a través de formulario, WhatsApp y teléfono, y está optimizado para dispositivos móviles y escritorio.

**Objetivo principal:** convertir visitantes en clientes potenciales mostrando los servicios disponibles y proporcionando múltiples vías de contacto inmediato.

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| [Astro](https://astro.build) | ^5.13.10 | Framework principal (SSG) |
| [React](https://react.dev) | ^19.1.1 | Integración de componentes interactivos |
| [Tailwind CSS](https://tailwindcss.com) | ^4.1.13 | Estilos utilitarios |
| [TypeScript](https://www.typescriptlang.org) | vía Astro | Tipado estático |
| [Google Fonts](https://fonts.google.com) | — | Tipografía Inter |

**Integraciones de Astro:**
- `@astrojs/react` — soporte para componentes React dentro de Astro
- `@tailwindcss/vite` — plugin de Tailwind para el bundler Vite

---

## Estructura del proyecto

```
juan-carlos-fontaneria/
├── public/                  # Archivos estáticos servidos directamente
├── src/
│   ├── assets/
│   │   ├── logo.svg         # Logotipo en SVG
│   │   └── logo.webp        # Logotipo en WebP (usado en producción)
│   ├── components/
│   │   ├── Header.astro     # Barra de navegación fija
│   │   ├── Hero.astro       # Sección principal / banner
│   │   ├── Services.astro   # Tarjetas de servicios
│   │   ├── Contact.astro    # Formulario y datos de contacto
│   │   └── Footer.astro     # Pie de página
│   ├── layouts/
│   │   └── Layout.astro     # Layout base HTML (head, meta, fuentes)
│   ├── pages/
│   │   └── index.astro      # Página única — monta todos los componentes
│   └── styles/
│       └── global.css       # Importación global de Tailwind CSS
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.mjs      # Configuración de Tailwind (legacy, v4 usa Vite)
├── tsconfig.json            # Configuración de TypeScript
└── package.json
```

---

## Componentes

### `Layout.astro`
Layout base que envuelve toda la página. Declara la estructura HTML, el idioma (`lang="es"`), las meta etiquetas SEO, el favicon y carga la fuente **Inter** desde Google Fonts.

**Props:**
| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la pestaña del navegador |

---

### `Header.astro`
Barra de navegación fija en la parte superior (`position: fixed`). Contiene:
- Logotipo con imagen optimizada vía `<Image>` de Astro.
- Nombre y subtítulo de la empresa.
- Links de navegación hacia las secciones ancla (`#inicio`, `#servicios`, `#contacto`).
- Botón de llamada directa visible desde pantallas `sm` en adelante.
- Botón de menú hamburguesa visible sólo en móvil (decorativo, sin lógica JS aún).

---

### `Hero.astro`
Sección principal con fondo en gradiente azul (`#inicio`). Incluye:
- Título y subtítulo de presentación.
- Dos CTA principales:
  - **Solicitar Presupuesto** — ancla a `#contacto`.
  - **WhatsApp** — abre chat directo con el número `+34 643 368 225`.
- Indicadores de confianza: "Servicio 24/7" y "Fontanero Autorizado".
- Panel visual con las 4 categorías de servicio en cuadrícula 2×2.

---

### `Services.astro`
Sección de servicios (`#servicios`) sobre fondo gris claro. Muestra cuatro tarjetas con efecto hover:

| Servicio | Color identificador | Destacado |
|---|---|---|
| Reparaciones de Urgencia | Rojo | Disponible 24h |
| Instalaciones de Agua | Azul/Cyan | Garantía incluida |
| Calefacción y Termos | Naranja | Eficiencia garantizada |
| Mantenimiento Preventivo | Verde | Ahorro a largo plazo |

Al final de la sección hay un banner CTA con enlace para llamar.

---

### `Contact.astro`
Sección de contacto (`#contacto`) con diseño de dos columnas:

**Columna izquierda — Información de contacto:**
- Botón de WhatsApp (`https://wa.me/34643368225`).
- Botón de llamada directa (`tel:643368225`).
- Email para presupuestos (`luismedinagua@gmail.com`).
- Horario de atención:
  - Lunes–Viernes: 8:00–20:00
  - Sábados: 9:00–15:00
  - Domingos: Solo urgencias
  - Emergencias 24h: Disponible

**Columna derecha — Formulario de solicitud de presupuesto:**
- Campos: nombre completo, teléfono, tipo de servicio (select), descripción del problema.
- Los campos nombre, teléfono y mensaje son obligatorios.
- El bloque `<script>` está disponible para lógica de envío futura.

---

### `Footer.astro`
Pie de página sobre fondo azul oscuro (`bg-blue-800`). Contiene:
- Logotipo, nombre, número de licencia y descripción de la empresa.
- Iconos de redes/contacto rápido: WhatsApp, teléfono, email.
- Columna de navegación (anclas internas).
- Columna con lista completa de servicios:
  - Mantenimiento e instalaciones
  - Grupos de bombeo
  - Piscinas
  - Sistemas sanitarios
  - Calentadores y aires acondicionados
  - Electricidad y saneamiento
- Copyright y crédito del desarrollador.

---

## Instalación y puesta en marcha

### Prerrequisitos
- Node.js 18 o superior.
- npm, pnpm o yarn.

### Pasos

```bash
# 1. Entrar al directorio del proyecto
cd juan-carlos-fontaneria

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El servidor de desarrollo arranca en `http://localhost:4321`.

---

## Comandos disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Genera el sitio estático en `./dist/` |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run astro ...` | Ejecuta comandos de la CLI de Astro |

---

## Información de contacto del negocio

| Canal | Valor |
|---|---|
| Teléfono / WhatsApp | 643 368 225 |
| Email | luismedinagua@gmail.com |
| N° de licencia | 05-B-D90 |

---

## Créditos

- **Negocio:** L&M Fontanería — Juan Carlos Luis
- **Desarrollo:** [Luis David Álvarez Perdigón](https://www.linkedin.com/in/luis-david-%C3%A1lvarez-perdig%C3%B3n-67135b271/)
- **Framework:** [Astro](https://astro.build)
