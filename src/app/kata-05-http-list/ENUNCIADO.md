# Kata 05 — HttpClient, loading y error

**Tiempo objetivo: 15 minutos.**

Trae una lista desde una API y maneja los tres estados: cargando, éxito y error.

## Endpoint

```
GET https://jsonmock.hackerrank.com/api/users
```

Respuesta:

```json
{ "page": 1, "per_page": 10, "total": 3, "total_pages": 1,
  "data": [ { "id": 1, "name": "Ada", "role": "Engineer" } ] }
```

Nota: el dominio `jsonmock.hackerrank.com` aparece una y otra vez en las pruebas
reales de HackerRank. Vale la pena que te resulte familiar.

## Requisitos

1. La petición se dispara en `ngOnInit`.
2. Mientras está pendiente existe un elemento `data-testid="loading"`.
3. Al llegar la respuesta, `loading` desaparece y se renderiza un elemento
   `data-testid="row"` por cada usuario del array `data`, mostrando su `name`.
4. Si la petición falla, `loading` desaparece, no hay filas, y aparece un
   elemento `data-testid="error"` con el texto `Something went wrong`.
5. Extrae la llamada a un servicio `UsersService` con un método
   `getUsers(): Observable<User[]>` que ya devuelva el array `data` desmapeado
   (el componente no debe conocer la forma del sobre de la respuesta).

## Restricciones

- Usa `HttpClient`. No uses `fetch`.
- El desmapeo del sobre va en el servicio, con el operador `map`.
