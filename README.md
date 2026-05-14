# TP7 - Sistema de Registro de Participantes con Autenticación JWT y Roles

Este proyecto implementa un sistema de registro de participantes con un backend en FastAPI y un frontend en React. La característica principal es la integración de autenticación JWT (JSON Web Tokens) y control de acceso basado en roles (RBAC), permitiendo diferenciar entre usuarios `ADMIN` y `CONSULTA`.

## Tecnologías Utilizadas

*   **Backend**: FastAPI, SQLModel, SQLite, Uvicorn, Python-Jose.
*   **Frontend**: React 19, TypeScript, Vite, React Router DOM.

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:

*   **Python 3.8+** y `pip`
*   **Node.js** y `npm`

## Guía de Ejecución Rápida

Sigue estos pasos para levantar el proyecto y probarlo.

### 1. Clonar el Repositorio (si aún no lo hiciste)

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd TP6-Programacion-Magni # O el nombre de tu carpeta raíz
```

### 2. Instalar Dependencias del Backend

Abre una **terminal nueva** y navega a la carpeta `Backend`:

```bash
cd Backend
pip install -r requirements.txt
```

### 3. Instalar Dependencias del Frontend

Abre otra **terminal nueva** y navega a la carpeta `Frontend`:

```bash
cd Frontend
npm install
```

### 4. Ejecutar el Backend (Terminal 1)

En la terminal donde instalaste las dependencias del backend (en la carpeta `Backend`), ejecuta:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Deberías ver un mensaje similar a:
`INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)`
Esto indica que el backend está listo y ha ejecutado los seeders para crear los usuarios de prueba.

### 5. Ejecutar el Frontend (Terminal 2)

En la terminal donde instalaste las dependencias del frontend (en la carpeta `Frontend`), ejecuta:

```bash
npm run dev
```

Deberías ver un mensaje similar a:
`➜ Local: http://localhost:5173/`
Abre esa URL en tu navegador web.

## Credenciales de Prueba

El backend inicializa automáticamente los siguientes usuarios:

*   **ADMIN**:
    *   **Usuario**: `admin`
    *   **Contraseña**: `admin123`
*   **CONSULTA**:
    *   **Usuario**: `consulta`
    *   **Contraseña**: `consulta123`

## Verificación Rápida

1.  **Login como ADMIN**:
    *   Ingresa con las credenciales `admin/admin123`.
    *   Deberías ver el menú completo, incluyendo la opción "Nuevo participante", y los botones de Editar/Eliminar en las tarjetas. Podrás crear, editar y eliminar participantes.
2.  **Login como CONSULTA**:
    *   Ingresa con las credenciales `consulta/consulta123`.
    *   Deberías ver la lista de participantes, pero **no** la opción "Nuevo participante" en el menú, ni los botones de Editar/Eliminar en las tarjetas. No podrás realizar acciones de modificación.
3.  **Sin autenticación**:
    *   Al intentar acceder a la aplicación sin haber iniciado sesión, o al cerrar sesión, serás redirigido automáticamente a la página de login.
