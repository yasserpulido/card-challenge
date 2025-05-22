# Card Challenge - React Frontend

![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![Vite](https://img.shields.io/badge/Vite-6.3.5-blueviolet)
![React](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)

Aplicación desarrollada como parte de un challenge técnico para evaluar conocimientos avanzados en React.  
Permite **agregar frases**, visualizarlas en formato de tarjetas, **filtrarlas en tiempo real** y **eliminarlas**, con una arquitectura pensada para escalar y mantener rendimiento.

---

## Consigna original

> Realizar una aplicación en React que permita agregar frases y que esas frases las vaya poniendo
> en cards en una matriz.
> Tiene que permitir buscar dentro de las frases un contenido y que filtre las cards que contengan ese texto al comenzar a digitar las letras del mismo.
> También poder eliminar frases.

---

## Enfoque técnico

El proyecto fue resuelto aplicando buenas prácticas de diseño, manejo de estado y accesibilidad, priorizando claridad, extensibilidad y testabilidad:

### Arquitectura y lógica

- **Estado global desacoplado** con `Context + useReducer`
- **Persistencia local** mediante `localStorage` con inicialización desde `useReducer`
- **Separación de lógica/presentación** con un HOC `withFilter` reutilizable
- **Uso de hooks de optimización**: `useMemo`, `useCallback`, `React.memo`

### Accesibilidad

- Uso de atributos `aria-label`, `role`, `aria-live`, y estructura semántica (`form`, `list`, `listitem`, `main`)
- Navegación completa por teclado
- Validación accesible y mensajes de error descriptivos (`role="alert"`)

### Validaciones

- Prevención de frases vacías con feedback visual accesible
- Pruebas adicionales para inputs duplicados, frases vacías, y eliminación masiva

### Testing

- Tests unitarios con [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/)
- Tests en componentes clave
- Lógica del HOC `withFilter` testeada de forma aislada
- Tests de accesibilidad básica incluidos

---

## Tecnologías utilizadas

- [React 19](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) para testing
- [Vite](https://vitejs.dev/) para bundling

---

## Instalación y ejecución

```bash
npm install
npm run dev
```

## Ejecutar tests

```bash
npm run test
```

## Ver reporte de cobertura

```bash
npm run coverage
```
