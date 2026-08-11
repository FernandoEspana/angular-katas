# Kata 02 — Lista con filtro en vivo

**Tiempo objetivo: 12 minutos.**

Partiendo de una lista fija de frameworks, filtra los elementos visibles a
medida que el usuario escribe.

## Datos de partida

```ts
frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'Ember', 'Backbone'];
```

## Requisitos

1. Un `<input>` con `data-testid="filter-input"`.
2. Cada elemento visible se renderiza con `data-testid="item"`.
3. Sin texto en el filtro, se ven los 6 elementos en su orden original.
4. El filtro es **por coincidencia parcial** e **ignora mayúsculas/minúsculas**:
   escribir `"ue"` deja `Vue`; escribir `"e"` deja `React`, `Vue`, `Svelte`, `Ember`, `Backbone`.
5. Cuando ningún elemento coincide, se muestra un elemento con
   `data-testid="empty-message"` y el texto `No results`.
6. Ese mensaje **no existe en el DOM** cuando hay resultados.
7. Borrar el filtro restaura la lista completa.

## Restricciones

- Sintaxis legacy: `*ngFor`, `*ngIf`, `[(ngModel)]`.
- No uses un `Pipe` personalizado: resuélvelo con un getter o un método.
