# SOLe - Frontend Application

Este repositorio contiene el código fuente del frontend para la plataforma **SOLe**. Es una aplicación web moderna construida con **React**, **TypeScript** y **Vite**, diseñada para gestionar una tienda de kits (e-commerce), un sistema de blog, autenticación de usuarios y mapas interactivos.

## 🚀 Características Principales

* **Autenticación Completa:** Login, registro, recuperación y cambio de contraseñas, y gestión de perfil de usuario.
* **Tienda (Shop):**
    * Visualización de productos (Kits).
    * Carrito de compras (Shopping Cart).
    * Gestión de pedidos (Orders).
    * Administración de productos (CRUD).
* **Blog:** Sistema completo para listar, crear, editar y visualizar artículos.
* **Mapas Interactivos:** Integración con Leaflet para visualizar rutas (CaminoMap).
* **Diseño Responsivo:** UI moderna estilizada con Tailwind CSS y componentes animados.

## 🛠 Stack Tecnológico

El proyecto utiliza las siguientes tecnologías y librerías principales:

* **Core:** React 19, TypeScript, Vite.
* **Estado y Datos:** @tanstack/react-query (Server state), Context API (Auth).
* **Enrutamiento:** React Router DOM v7.
* **Estilos y UI:** Tailwind CSS, CLSX, Tailwind-merge, Framer Motion.
* **Formularios:** React Hook Form, Zod (validación), @hookform/resolvers.
* **Mapas:** Leaflet, React-leaflet.
* **HTTP Client:** Axios.
* **Utilidades:** Sonner (Notificaciones), Lucide React (Iconos).

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* npm

## 🔧 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd SOLe_FRONT
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto (puedes basarte en el ejemplo existente). Las variables requeridas son:

    ```env
    # URL del Backend API
    VITE_API_URL=http://localhost:3000
    
    # URL base para servir imágenes
    VITE_IMAGE_URL=http://localhost:3000
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible generalmente en `http://localhost:5173`.

## 📂 Estructura del Proyecto

El código fuente está organizado bajo una arquitectura basada en **features** (características) dentro de `src/`:

```text
src/
├── api/            # Configuración de Axios
├── assets/         # Recursos estáticos (imágenes, svg)
├── components/     # Componentes compartidos (Layout, Navbar, Footer, UI)
├── config/         # Constantes y configuraciones globales
├── features/       # Módulos principales de la aplicación
│   ├── auth/       # Login, Registro, Contexto de Auth
│   ├── blog/       # Listados y detalles de blogs
│   ├── contact/    # Página de contacto
│   ├── Home/       # Página de inicio y Landing
│   └── shop/       # Carrito, Kits, Órdenes, Productos
├── lib/            # Utilidades de librerías (ej. utils.ts para shadcn/tailwind)
├── routes/         # Configuración de rutas (AppRouter)
└── utils/          # Funciones de utilidad generales
