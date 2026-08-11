# Angular Katas — entrenamiento para pruebas técnicas tipo HackerRank

Seis ejercicios cronometrados en **Angular con NgModules y sintaxis legacy**,
con tests ocultos al estilo de los que califican en HackerRank.

El objetivo no es aprender Angular. Es que resolver estos problemas deje de
requerir pensar.

---

## Por qué está montado así

| Decisión | Razón |
|---|---|
| Angular 18 con **NgModules**, no standalone | Los sandboxes de evaluación van años atrás. Si entrenas con `@for` y signals, te encuentras un `*ngFor` en la prueba real. |
| **Karma + Jasmine**, no Vitest | Es lo que corre en HackerRank. |
| Todo se valida con `data-testid` | Igual que los tests ocultos reales: buscan selectores literales del enunciado. Renombrar uno es cero puntos aunque la app funcione. |
| CSS casi inexistente | Ningún test mira estilos. En una prueba cronometrada, el CSS es tiempo perdido. |

---

## Instalación

```bash
cd angular-katas
npm install
git init && git add -A && git commit -m "starters"
```

Ese commit inicial importa: es como vuelves al punto de partida después de
mirar una solución.

---

## Ciclo de trabajo

```bash
npm run kata 1          # enunciado + cronómetro
# resuelves, a mano, sin ayuda
npm run test:one 1      # ves cuántos tests pasan
```

Cuando termines o se acabe el tiempo:

```bash
npm run solve 1         # sobreescribe con la solución de referencia
git diff                # compara la tuya contra la de referencia
git checkout -- src/    # vuelve al starter para repetirla mañana
```

Otros comandos:

```bash
npm test                # todos los tests
npm start               # levanta la app en localhost:4200
```

---

## Las seis katas

| # | Kata | Min | Entrena |
|---|---|---|---|
| 1 | Add name | 12 | `ngModel`, `*ngFor`, validación básica, estado de botón |
| 2 | Filter list | 12 | Filtrado derivado, `*ngIf`, estado vacío |
| 3 | Edit / delete | 18 | Estado de edición, borrador vs. fuente, `ng-template` |
| 4 | Input / Output | 15 | `@Input`, `@Output`, `EventEmitter`, composición |
| 5 | HttpClient | 15 | Servicio, `map`, tres estados, `HttpTestingController` |
| 6 | Reactive form | 15 | `FormBuilder`, validadores, errores condicionados a `touched` |

Cada carpeta tiene su `ENUNCIADO.md` con los requisitos exactos y los
`data-testid` que los tests esperan.

---

## Las reglas que hacen que esto sirva

1. **Sin ayuda durante el cronómetro.** Sin Claude Code, sin Google, sin mirar
   otra kata. Eso es lo que replica las condiciones reales.
2. **Lee el enunciado completo antes de escribir una línea.** Subraya
   mentalmente los `data-testid`. Es el error que más puntos cuesta.
3. **Corre los tests antes de darte por terminado.** Que se vea bien en el
   navegador no significa nada.
4. **Repite.** La segunda vuelta de una kata vale más que una kata nueva. El
   objetivo es bajar el tiempo, no coleccionar ejercicios.

Meta a cuatro semanas: cualquiera de las seis por debajo de 15 minutos, sin
ayuda, con todos los tests en verde.

---

## Plan de dos semanas

| | Lun | Mar | Mié | Jue | Vie |
|---|---|---|---|---|---|
| **Semana 1** | Kata 1 | Kata 2 | Kata 3 | Kata 4 | Kata 5 |
| **Semana 2** | Kata 6 | Kata 1 | Kata 2 | Kata 3 | Kata 4 |

Semanas 3 y 4: repite en el mismo orden, apuntando a bajar tiempos.

---

## Rutina diaria completa

Estas katas son el **bloque 2** de tres:

1. Inglés conversacional — 50 min
2. Kata cronometrada — 25 min a solas + 25 min de revisión con Claude Code
3. JavaScript de entrevista — 50 min

Sábado: un reto de [angular-challenges](https://angular-challenges.vercel.app), 90 min.
Domingo: libre.

Si algún día solo alcanza para un bloque, que sea el primero.
