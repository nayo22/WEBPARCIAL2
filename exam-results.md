# Resultados del parcial práctico 2

Registrar resultados reales después de implementar y probar los endpoints. Sustituir los IDs de ejemplo por los utilizados.

| Petición y datos utilizados | Código esperado | Código obtenido | Observación |
| --- | --- | --- | --- |
| Crear una reserva con datos válidos y sala existente. | 201 | Created | |
| Crear con participants como texto. | 400 | Bad Request | |
| Crear con una propiedad adicional, como status. | 400 | Bad Request | |
| Crear con una sala inexistente. | 404 | Not Found | |
| Cancelar una reserva activa y consultar el cambio guardado. | 200 | OK | |
| Cancelar de nuevo la misma reserva. | 409 | Conflict | |
| Intentar cancelar con ID abc. | 400 | Bad Request | |
| Intentar cancelar con un ID entero inexistente. | 404 | NotFound | |

## Pruebas unitarias

Registrar el resultado de `npm test`.

| Caso | Resultado obtenido |
| --- | --- |
| 1. La regla real rechaza una reserva cancelada. | Pendiente |
| 2. El servicio cancela y guarda una reserva activa. | Pendiente |
| 3. Si la regla simulada rechaza, conserva active y no guarda. | Pendiente |

Resumen de ejecución: 
Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.402 s, estimated 2 s
Ran all test suites.
