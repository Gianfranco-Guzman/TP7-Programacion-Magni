# TP7 al TP9 - Sistema de Registro de Participantes con Autenticación JWT, Roles y Pago con Mercado Pago

Backend en FastAPI y frontend en React con autenticación JWT, control de acceso por roles (ADMIN / CONSULTA), hooks personalizados y pagos con Mercado Pago Checkout Pro.

## Tecnologías

- **Backend**: FastAPI, SQLModel, SQLite, Uvicorn, Python-Jose, Mercado Pago SDK
- **Frontend**: React 19, TypeScript, Vite, React Router DOM, Tailwind CSS

## Requisitos previos

- Python 3.8+ y `pip`
- Node.js y `npm`
- ngrok (solo para TP9)

## Instalación (una sola vez)

```bash
cd Backend
pip install -r requirements.txt
```

```bash
cd Frontend
npm install
```

## Ejecución

### Terminal 1 — Backend

```bash
cd Backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
```

### Terminal 3 — ngrok (solo para TP9 / Mercado Pago)

```bash
ngrok http --domain=lobularly-unprosaical-nedra.ngrok-free.dev 5173
```

## Si el puerto 8000 ya está ocupado

Correr esto en PowerShell antes de iniciar el backend:

```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8000 -State Listen).OwningProcess -Force
```

## Credenciales de prueba

### App

| Rol | Usuario | Contraseña |
|---|---|---|
| ADMIN | `admin` | `admin123` |
| CONSULTA | `consulta` | `consulta123` |

### Mercado Pago (sandbox)

| Campo | Valor |
|---|---|
| Usuario de prueba | `TESTUSER2269543688887660140` |
| Contraseña | `NkP07CHtmr` |
| Tarjeta | `4509 9535 6623 3704` |
| Vencimiento | `11/30` |
| CVV | `123` |
| DNI (para aprobar) | `12345678` |

Estado de pago: usar `APRO` con DNI `12345678` para pago aprobado, `OTHE` para rechazo.

## Funcionalidades

### TP7 — Autenticación y roles
- Login con JWT
- Rol ADMIN: crear, editar y eliminar participantes
- Rol CONSULTA: solo lectura

### TP8 — Hooks
- `useRef` para foco automático en el campo de búsqueda
- `useId` para IDs accesibles en formularios
- Hook personalizado `useHotkey` (atajo Ctrl+B para enfocar búsqueda)
- Hook personalizado `useTransientFlag` (notificaciones temporales)

### TP9 — Mercado Pago Checkout Pro
- Página `/cursos` con 6 cursos y sus precios
- Botón "QUIERO ESTE CURSO" que crea una preferencia de pago y redirige al checkout de MP
- Páginas de retorno: `/pago-exitoso`, `/pago-pendiente`, `/pago-fallido`
