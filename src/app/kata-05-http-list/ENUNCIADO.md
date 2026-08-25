# Kata 05 — HttpClient, mapper, loading y error

**Tiempo objetivo: 15 minutos.**

Trae una lista desde una API real, traduce su forma a tu propio modelo de dominio y maneja
los tres estados: cargando, éxito y error.

## Endpoint

```
GET https://jsonmock.hackerrank.com/api/article_users
```

Respuesta:

```json
{
  "page": 1,
  "per_page": 10,
  "total": 60,
  "total_pages": 6,
  "data": [
    {
      "id": 1,
      "username": "epaga",
      "about": "Software developer",
      "submitted": 5,
      "updated_at": 1519318063,
      "submission_count": 10,
      "comment_count": 22,
      "created_at": 1483240104
    }
  ]
}
```

Nota: el dominio `jsonmock.hackerrank.com` aparece una y otra vez en las pruebas
reales de HackerRank. Vale la pena que te resulte familiar.

## Contrato de testids

Los specs solo consultan estos tres. Renombrarlos es cero puntos.

| testid    | cuándo                                              |
| --------- | --------------------------------------------------- |
| `loading` | mientras la petición está pendiente                 |
| `row`     | uno por usuario, con su `username` como texto       |
| `error`   | si la petición falla, con el texto exacto del punto 4 |

## Requisitos

1. La petición se dispara en `ngOnInit`.
2. Mientras está pendiente existe un elemento `data-testid="loading"`.
3. Al llegar la respuesta, `loading` desaparece y se renderiza un elemento
   `data-testid="row"` por cada usuario, mostrando su `username`.
4. Si la petición falla, `loading` desaparece, no hay filas, y aparece un
   elemento `data-testid="error"` con el texto `Something went wrong`.
5. **El mapper.** La API no habla tu idioma: devuelve ocho campos con nombres suyos.
   Escribe en `user.mapper.ts` una clase `UserMapper` que traduzca `HackerRankUser`
   (la forma de la API) a `User` (tu modelo de dominio, solo `{ id, username, about }`).
   Dos métodos estáticos: uno que mapea un objeto y otro que mapea el array.
6. `UsersService.getUsers(): Observable<User[]>` hace el GET, desenvuelve el array `data`
   y aplica el mapper. El componente no debe conocer ni el sobre de la respuesta ni
   `HackerRankUser`: solo recibe `User[]`.

## Restricciones

- Usa `HttpClient`. No uses `fetch`.
- Desenvolver el sobre y mapear va en el servicio, con el operador `map` de RxJS.
- `hackerrank.interfaces.ts` viene dado. No lo reescribas: es la transcripción de la API.
