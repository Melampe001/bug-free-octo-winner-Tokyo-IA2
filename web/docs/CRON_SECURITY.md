# Seguridad de Cron Jobs

## Autenticación con Bearer Token

Todos los endpoints de cron jobs requieren autenticación mediante Bearer token.

### Configuración

1. Generar un secreto seguro:
   ```bash
   openssl rand -base64 32
   ```

2. Agregar a `.env.local`:
   ```bash
   CRON_SECRET=tu_secreto_generado
   ```

3. Agregar a Vercel Dashboard:
   - Ir a Settings > Environment Variables
   - Agregar `CRON_SECRET` con el mismo valor
   - Aplicar a todos los entornos (Production, Preview, Development)

### Uso

#### Desde Vercel Cron (automático)
Vercel inyecta automáticamente el header de autorización cuando ejecuta cron jobs configurados.

#### Manualmente (para testing)
```bash
curl -X POST https://tu-app.vercel.app/api/cron/workflows \
  -H "Authorization: Bearer tu_secreto" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "action": "onboarding"}'
```

### Endpoints Disponibles

- **POST /api/cron/workflows**: Ejecutar workflow
- **GET /api/cron/workflows**: Health check

### Mejores Prácticas

1. **Rotar el secreto periódicamente** (cada 90 días)
2. **Monitorear intentos no autorizados** en los logs
3. **Usar diferentes secretos** para cada entorno
4. **Nunca commitear** el secreto en el repositorio
5. **Implementar rate limiting** en producción

### Monitoreo

Los intentos no autorizados se registran con:
- IP de origen
- Timestamp
- Prefijo del header (para debugging)

Revisar logs en Vercel Dashboard > Logs
