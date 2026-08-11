# Kata 03 — Editar y eliminar elementos

**Tiempo objetivo: 18 minutos.** Es el más largo de los seis.

Lista editable en línea: cada fila puede eliminarse o entrar en modo edición.

## Datos de partida

```ts
people = ['Ada', 'Grace', 'Linus'];
```

## Requisitos

1. Cada fila se renderiza con `data-testid="item"`, en orden.
2. En modo lectura, la fila muestra:
   - el nombre dentro de `data-testid="item-name"`
   - un botón `data-testid="edit-btn"`
   - un botón `data-testid="delete-btn"`
3. `delete-btn` elimina esa fila.
4. `edit-btn` pone **esa** fila en modo edición. En modo edición la fila muestra:
   - un `<input>` `data-testid="edit-input"` precargado con el nombre actual
   - un botón `data-testid="save-btn"`
   - un botón `data-testid="cancel-btn"`
   - y **no** muestra `item-name`, `edit-btn` ni `delete-btn`
5. Solo puede haber **una fila en edición a la vez**.
6. `save-btn` guarda el valor recortado y vuelve a modo lectura.
7. Guardar un valor vacío o solo espacios **no modifica nada** y vuelve a modo lectura.
8. `cancel-btn` descarta los cambios y vuelve a modo lectura.

## Pista

Guarda el índice en edición (`editingIndex`, con `-1` para "ninguno") y un
borrador separado (`draft`). No edites el array directamente mientras escribes:
si lo haces, cancelar deja de ser posible.
