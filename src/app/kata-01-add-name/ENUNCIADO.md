# Kata 01 — Agregar nombre a una lista

**Tiempo objetivo: 12 minutos.**

Construye un componente que permita escribir un nombre y agregarlo a una lista
que se renderiza en la misma página.

## Requisitos

1. Un `<input>` de texto con `data-testid="name-input"`.
2. Un `<button>` con `data-testid="add-btn"` y el texto `Add`.
3. Cada nombre de la lista se renderiza en un elemento con `data-testid="name-item"`.
4. Al agregar, el input queda vacío.
5. Los espacios sobrantes se recortan: `"  Ada  "` se guarda como `"Ada"`.
6. No se agregan nombres vacíos ni compuestos solo de espacios.
7. No se agregan duplicados. La comparación **ignora mayúsculas/minúsculas**:
   si ya existe `"Ada"`, escribir `"ADA"` no agrega nada.
8. El botón está `disabled` cuando el input está vacío o solo tiene espacios.
9. Los nombres se muestran en el orden en que fueron agregados.

## Restricciones

- Sintaxis legacy: `*ngFor`, `[(ngModel)]`. Sin signals, sin `@for`.
- No cambies los `data-testid`. Los tests los buscan literalmente.

## Trampa clásica

`[(ngModel)]` no funciona si `FormsModule` no está importado en el módulo.
En una prueba real ese olvido te cuesta diez minutos de depuración.
