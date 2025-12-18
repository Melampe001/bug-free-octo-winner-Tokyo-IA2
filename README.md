# TokyoIA

Descripción
-----------
Proyecto multi-componente que incluye backend (Python), web (JavaScript/Node) y aplicación Android. Este repositorio contiene el código fuente y la configuración para desarrollo local y despliegues.

Estructura principal
--------------------
- backend/: Servidor y lógica en Python
  - app/: código principal (main.py, auth, ml, casino, payments)
- web/: Aplicación web (pages, components, public)
- android/: Proyecto Android (app, build.gradle)
- .devcontainer/: configuración de Codespaces / devcontainer
- .github/: workflows y plantillas
- README.md
- LICENSE

Requisitos
----------
- Python 3.8+
- Node 16+ / npm o yarn
- Java + Android SDK (para la carpeta android)
- Docker (opcional, para contenedores/devcontainer)

Instalación y ejecución rápida
------------------------------

Backend (backend/app)
1. Crear y activar entorno virtual:
   - python -m venv .venv
   - source .venv/bin/activate  (Linux/macOS) o .venv\Scripts\activate (Windows)
2. Instalar dependencias:
   - pip install -r backend/app/requirements.txt
3. Ejecutar (ejemplo):
   - cd backend/app
   - python main.py
   (Ajusta según cómo esté configurado el servidor — p.ej. uvicorn o flask.)

Web (web/)
1. Entrar al directorio web:
   - cd web
2. Instalar dependencias:
   - npm install
3. Ejecutar en modo desarrollo:
   - npm run dev  (o el script definido en package.json)

Android (android/)
1. Abrir el proyecto `android` en Android Studio.
2. Sin Android Studio, usar gradle wrapper:
   - ./gradlew assembleDebug

Devcontainer / Codespaces
-------------------------
El repositorio incluye `.devcontainer/`. Abre el proyecto en GitHub Codespaces o en VS Code con Remote - Containers para un entorno listo para desarrollo.

Contribuir
----------
- Sigue las plantillas en `.github/` (ISSUE_TEMPLATE, PULL_REQUEST_TEMPLATE).
- Ejecuta linters/tests antes de subir cambios.
- Si introduces cambios en `proto/`, recuerda ejecutar `make proto` si aplica.

Pruebas y CI
------------
- Revisa los workflows en `.github/workflows/` para conocer las comprobaciones automáticas.
- Ejecuta pruebas locales según el subproyecto (p. ej. pytest en backend, tests de frontend con npm).

Licencia
--------
Incluye el archivo LICENSE en la raíz. Asegúrate de revisar los términos.

Contacto
--------
Para dudas o contribuciones, abre una issue o PR.

## Deployment

### Vercel Deployment

The Local Premium Elite web application can be deployed to Vercel. Complete deployment documentation is available:

- **[Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions
- **[Vercel Setup Checklist](./VERCEL_SETUP_CHECKLIST.md)** - Complete setup checklist to track progress
- **[Deployment Troubleshooting](./DEPLOYMENT_TROUBLESHOOTING.md)** - Common issues and solutions

#### Quick Start

1. Review the [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
2. Set up accounts (Vercel, Supabase, Stripe)
3. Configure environment variables using [.env.vercel](./.env.vercel) as reference
4. Deploy from GitHub repository

**Estimated deployment time:** 3-4 hours for initial setup

For detailed instructions and best practices, refer to the deployment guides linked above.
