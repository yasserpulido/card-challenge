# Card Challenge - React Frontend

Esta es una aplicación en React que permite agregar frases, visualizarlas en formato de tarjetas (cards), filtrarlas por texto en tiempo real y eliminarlas. Fue desarrollada como parte de un challenge técnico para evaluar conocimientos de React avanzado.

Consigna:

Realizar una aplicación en React que permita agregar frases y que esas frases las vaya poniendo
en cards en una matriz. Tiene que permitir buscar dentro de las frases un contenido y que filtre las
cards que contengan ese texto al comenzar a digitar las letras del mismo. También poder eliminar
frases.

Recuerda que el objetivo objetivo del challenge es entender tu nivel de conocimiento actual, por lo
tanto, todo lo que agregues lo tendremos en cuenta y estaremos evaluando:

Conocimientos de REACT avanzado, incluyendo Hooks, HOC, render props, manejo de Context.
Manejo de estados: redux o context o cualquier otra biblioteca para la gestion de estado.

JS
Conocimientos de ES6+, clousures, hoisting, manejo de promesas aync await, gestion de errores,
typescript, test, (Jest React Testing Library)

Optimizaciones del rendimiento de la aplicación.

Ejecuta el siguiente comando para iniciar la aplicación:

```bash
npm install
npm run dev
```

---

## Funcionalidades

- ✅ Agregar frases mediante un formulario controlado
- ✅ Renderizado de frases en una grilla tipo "card"
- ✅ Búsqueda en vivo (filtrado en tiempo real)
- ✅ Eliminación de frases individuales
- ✅ Interfaz responsiva y estilizada con `styled-components`

---

## Tecnologías utilizadas

- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) para testing
- [Vite](https://vitejs.dev/) para bundling

---

## Tests incluidos

Se incluyen pruebas unitarias con cobertura completa de:

- `PhraseForm` (formulario de ingreso)
- `PhraseList` (lista con filtrado y eliminación)
- `SearchInput` (input controlado)

Ejecutá los tests con:

```bash
npx vitest run
```
