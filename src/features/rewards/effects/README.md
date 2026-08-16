# Sistema de efectos

Los efectos visuales son componentes del frontend. La API conserva únicamente la propiedad y el estado equipado de cada recompensa.

## Carpetas

- `core/`: contratos y registro único de efectos.
- `runtime/`: resolución del efecto equipado, aislamiento de errores y control de actividad.
- `renderers/`: bases compartidas para DOM/CSS y WebGL.
- `motion/`: duraciones, curvas y escalas comunes.
- `backgrounds/`, `borders/`, `surfaces/`, `calendar/`, `pomodoro/`: catálogo organizado por lugar de aplicación.

## Agregar un efecto

1. Crear su carpeta dentro del lugar correspondiente.
2. Implementar `RewardEffectProps`.
3. Declararlo en `core/registry.tsx` mediante una importación dinámica.
4. Asignarle un `slot` y el motor `css`, `motion` o `webgl`.
5. Mantener una alternativa estática cuando utilice WebGL.

Los slots `USER_CARD` y `PARTICLES` ya están reservados para próximas categorías. No deben utilizarse desde la tienda hasta que la API publique esas categorías en su contrato.

## Rendimiento y accesibilidad

- Los efectos WebGL sólo se cargan cuando se utilizan.
- El canvas limita su densidad de píxeles y la adapta durante la ejecución.
- Las animaciones se pausan cuando la pestaña queda oculta.
- La preferencia `prefers-reduced-motion` utiliza una representación estática.
- Un fallo gráfico muestra el fallback sin romper el dashboard.
