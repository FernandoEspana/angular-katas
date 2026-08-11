# Kata 04 — Comunicación padre / hijo

**Tiempo objetivo: 15 minutos.**

Dos componentes: una tarjeta reutilizable (hijo) y una lista que reacciona a la
selección (padre).

## Modelo

```ts
export interface User {
  id: number;
  name: string;
  role: string;
}
```

## Hijo — `UserCardComponent`, selector `app-user-card`

1. Recibe `@Input() user: User`.
2. Renderiza el nombre en `data-testid="user-name"` y el rol en `data-testid="user-role"`.
3. Tiene un botón `data-testid="select-btn"`.
4. Al pulsarlo emite `@Output() selected` con el objeto `user` completo.

## Padre — `UserListComponent`, selector `app-user-list`

Datos de partida:

```ts
users = [
  { id: 1, name: 'Ada',   role: 'Engineer' },
  { id: 2, name: 'Grace', role: 'Admiral'  },
  { id: 3, name: 'Linus', role: 'Architect'},
];
```

5. Renderiza un `app-user-card` por usuario.
6. Antes de cualquier selección, el elemento `data-testid="selected-name"`
   **no existe en el DOM**.
7. Tras seleccionar, ese elemento existe y contiene el nombre del usuario elegido.
8. Seleccionar otro usuario reemplaza el nombre mostrado.

## Restricciones

- `@Input`/`@Output` clásicos, no `input()`/`output()` de signals.
