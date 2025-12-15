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