# Diagrama de la base de datos — Trazabilidad de panela

Sitio estático (sin compilación) que muestra el esquema completo de la base de datos de forma interactiva: zoom, búsqueda de tablas y columnas, filtro por módulo y ficha de cada tabla con sus relaciones.

## Contenido

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página completa (estilos y lógica incluidos). |
| `schema.json` | Los datos del esquema que dibuja la página. |
| `vercel.json` | Configuración de Vercel (evita que los buscadores indexen el sitio). |
| `robots.txt` | Pide a los buscadores no indexar el sitio. |
| `herramientas/` | Script para regenerar `schema.json` desde el archivo DBML. No se publica. |

## Publicar en Vercel

**Opción A: desde la web de Vercel**
1. Subir esta carpeta a un repositorio de GitHub.
2. En vercel.com, elegir "Add New → Project" e importar el repositorio.
3. En "Framework Preset" dejar **Other**, sin comando de build. Si la carpeta está dentro de un repositorio más grande, indicar `bd-diagrama-web` como "Root Directory".
4. Pulsar "Deploy".

**Opción B: con la línea de comandos**
```
npm install -g vercel
cd bd-diagrama-web
vercel          # primera vez: crea el proyecto y publica una vista previa
vercel --prod   # publica en producción
```

## Ver la página en la computadora antes de publicar

La página carga `schema.json`, así que hay que abrirla con un servidor local (con doble clic sobre `index.html` no carga los datos):
```
cd bd-diagrama-web
npx serve .
```
y abrir la dirección que muestra (normalmente http://localhost:3000).

## Actualizar el esquema

1. Reemplazar `herramientas/esquema.dbml` con el esquema nuevo. Cada tabla debe estar dentro de un `TableGroup` (módulo); el color de cada módulo se define con `[color: #xxxxxx]`.
2. Ejecutar:
   ```
   cd herramientas
   npm install
   npm run actualizar
   ```
3. Volver a publicar en Vercel (si está conectado a GitHub, basta con subir el cambio).

La fecha "esquema al …" que aparece en la cabecera está en `index.html`; actualizarla a mano junto con el esquema.
