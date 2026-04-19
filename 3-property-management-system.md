Voy a construir un design system en Vue 3 + TailwindCSS v4 + Storybook, inspirado
en el sistema "Parcela" (ver archivos adjuntos: design-tokens.md,
components-catalog.md, y el HTML de referencia).

CONTEXTO DEL PRODUCTO
- Sistema de administración de propiedades para mercado chileno
- Estética: warm neutral, graphite ink, olive/wheat/rust accents, densidad alta
- Type: Inter + IBM Plex Mono
- Voz visual: minimalista, profesional, data-dense (similar a Linear/Stripe pero
  más warm)

STACK
- Vue 3 + <script setup> + Composition API
- TypeScript estricto
- TailwindCSS v4 (usa @theme para definir tokens)
- Storybook 8
- Vitest para tests
- Iconos: lucide-vue-next
- Estructura: packages/ui (componentes) + apps/storybook

LO QUE NECESITO

Fase 1 — Setup de fundamentos
1. Configurar tailwind.config con los tokens de design-tokens.md como CSS vars
   (--color-ink, --color-surface, etc.) usando @theme de Tailwind v4
2. Crear src/styles/tokens.css con todos los tokens como custom properties
3. Montar Storybook con tema custom que refleje el bg warm (#FAFAF7)
4. Crear tipografía global (fuentes Google, font-smoothing, etc.)

Fase 2 — Atoms (una story por componente)
Construir los atoms de components-catalog.md. Cada uno:
- Archivo .vue con <script setup lang="ts">
- Props tipadas con defineProps<...>
- Variantes expuestas como prop (variant, size, tone)
- Story en Storybook CSF3 con Controls para cada prop
- Al menos 3 stories: Default, AllVariants, Playground
- Incluir doc comment con ejemplo de uso

Fase 3 — Molecules y Organisms
Igual que Fase 2, pero con stories que muestren composición real
(DataTable con datos ficticios, Sidebar completo, etc.)

Fase 4 — Templates
Recrear las 8 pantallas del HTML de referencia como composiciones de los
componentes construidos. Viven en stories/templates/.

REGLAS DURAS
- NO inventes tokens; si necesitas un valor nuevo, agrégalo primero a tokens.css
- NO uses colores arbitrarios de Tailwind (bg-blue-500) — solo los del theme
- Componentes controlados: nunca manejen su propio estado salvo hover/focus
- Accesibilidad: roles ARIA, labels, contraste AA mínimo
- Nombres de props consistentes: `variant`, `size`, `tone`, `disabled`
- Mobile-friendly aunque el diseño sea desktop-first (1280×820)

EMPIEZA POR
1. Leer los 3 archivos adjuntos completos
2. Confirmar entendimiento del sistema con un resumen
3. Proponer estructura de carpetas del monorepo
4. Esperar mi ok antes de codear

Al terminar cada fase, hacé un commit lógico y mostrame los screenshots de
Storybook de lo que construiste.