# Mate & Co. — App de ventas y reservas

App web simple (sin instalación) para mostrar el catálogo de productos, marcar reservas y controlar el stock. Pensada para subir a **GitHub Pages** y abrirla desde el celular como si fuera una app.

## Cómo publicarla en GitHub Pages

1. Creá un repositorio nuevo en GitHub (público), por ejemplo `mate-ventas`.
2. Subí **todos** los archivos y carpetas tal cual están acá (`index.html`, `style.css`, `app.js`, `data.js`, la carpeta `images/` y la carpeta `icons/`).
3. Andá a **Settings → Pages** del repositorio.
4. En "Branch" elegí `main` y la carpeta `/ (root)`. Guardá.
5. En un par de minutos la app va a estar online en algo como:
   `https://tu-usuario.github.io/mate-ventas/`
6. Desde el celular, abrí ese link en Chrome/Safari y usá **"Agregar a la pantalla de inicio"** — así queda con el ícono y abre directo con el splash, como una app.

## Cómo funciona

- **Catálogo**: tarjetas con foto, título, precio y variantes/colores. Si un color ya está reservado se ve tachado con ✕.
- **Sin Stock automático**: cuando TODAS las variantes de un producto quedan reservadas, aparece solo el sello "SIN STOCK" — no hay que hacer nada a mano.
- **Reservar**: el comprador elige color, cantidad y pone su nombre. La app le muestra el alias de Mercado Pago de la dueña para que transfiera, y un botón para escribirle directo por WhatsApp con un mensaje ya armado (producto, color, cantidad y nombre) para que mande el comprobante.
- **Panel de la dueña** (ícono ⚙ arriba a la derecha): pide un PIN de 4 dígitos (se crea la primera vez que se usa, y ya queda compartido para cualquier celular que entre al panel). Desde ahí se puede:
  - Cargar o editar el alias de Mercado Pago propio, que van a ver todos los que reserven.
  - Cargar o editar el número de WhatsApp (ya viene precargado con +54 9 11 7036-1019, se puede cambiar cuando quieras).
  - Agregar productos nuevos (foto, título, precio, categoría, variantes separadas por coma, si es kit).
  - Marcar o liberar manualmente cada variante como reservada.
  - Ver todas las reservas (borrador/confirmada), confirmar un borrador o eliminarlo.
  - Borrar productos.

## Dónde vive la información

Todo (productos, stock y reservas) se guarda en **Firebase Firestore** (plan gratuito Spark, sin costo). Esto significa que se sincroniza solo y en el momento: si alguien reserva desde su celular, la dueña lo ve al instante en el suyo, sin recargar nada.

### Paso obligatorio: reglas de Firestore

Para que la app pueda leer y escribir, hay que habilitar las reglas de acceso:

1. En la consola de Firebase, entrá a tu proyecto → **Compilación → Firestore Database**
2. Arriba, tocá la pestaña **"Reglas"**
3. Borrá lo que haya y pegá el contenido del archivo `firestore.rules` que está en esta carpeta
4. Tocá **"Publicar"**

Esas reglas dejan que cualquiera lea y escriba en la base — es lo más simple para una app sin sistema de usuarios. El panel de administración igual queda protegido por PIN dentro de la app. Si más adelante querés reglas más estrictas (por ejemplo, que nadie pueda borrar reservas ajenas), se puede ajustar.

## Agregar más fotos de productos más adelante

Podés subir productos nuevos directo desde el Panel (⚙) sin tocar código. Si preferís cargarlos "prolijos" en el repositorio:
1. Poné la foto en la carpeta `images/`.
2. Sumá un objeto nuevo en `data.js`, copiando el formato de los que ya están.

Desarrollado por **Nahualejandro**.
