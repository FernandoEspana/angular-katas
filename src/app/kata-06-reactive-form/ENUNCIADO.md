# Kata 06 — Formulario reactivo con validación

**Tiempo objetivo: 15 minutos.**

Formulario de registro con validación y mensajes de error.

## Requisitos

1. Un `FormGroup` con dos controles: `email` y `password`.
2. `email`: requerido y con formato de email (`Validators.email`).
3. `password`: requerido y mínimo 8 caracteres.
4. Inputs con `data-testid="email"` y `data-testid="password"`.
5. Botón de envío con `data-testid="submit-btn"`, `disabled` mientras el
   formulario sea inválido.
6. Mensajes de error, **solo cuando el control ha sido tocado (`touched`)**:
   - `data-testid="email-error"` con el texto `Invalid email`
   - `data-testid="password-error"` con el texto `Password too short`
   - Si el control es válido o aún no ha sido tocado, el mensaje **no existe en el DOM**.
7. Al enviar con el formulario válido, aparece `data-testid="success"` con el
   texto `Welcome` y el formulario deja de mostrarse como pendiente.

## Restricciones

- `ReactiveFormsModule`, no `ngModel`.
- Usa `formControlName`, no `[formControl]` sueltos.

## Trampa clásica

Si enlazas el `<form>` con `(ngSubmit)` pero olvidas `[formGroup]`, Angular lanza
un error de runtime que en HackerRank se traduce en cero puntos sin explicación.
