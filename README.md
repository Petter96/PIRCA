# PIRCA (Plataforma Integral de Registro y Consulta de Alumnado)

PIRCA is a web application focused on the registration, management, and consultation of student information. This project is currently built with **React + Vite**.

## Academic Context

This project was developed based on the work presented in the course **Analysis and System Design** (*Análisis y Diseño de Sistemas*). The architecture and data model of the application were derived from a class diagram that served as the foundation for defining the system’s entities, relationships, and responsibilities.

<p align="center">
  <img width="731" height="788" alt="PIRCA class diagram" src="https://github.com/user-attachments/assets/a6934f76-8bcb-4a4e-8025-ef47d6a40b5d" />
</p>

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)
- [React](https://react.dev/) — UI library used in this project
- [Vite](https://vite.dev/) — frontend build tool and development server [web:1][web:2]

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

> **Note:** All dependencies are already listed in `package.json`. Running any of the install commands above will install them automatically.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open the local URL shown in the terminal, usually:

[http://localhost:5173](http://localhost:5173)

Vite provides a fast local development server with Hot Module Replacement (HMR), so changes are reflected automatically while you edit the code. [web:1]

## Project Structure

A typical structure for this React + Vite project includes:

- `src/` — application source code
- `src/App.jsx` or `src/App.tsx` — main application component
- `src/main.jsx` or `src/main.tsx` — entry point
- `public/` — static assets
- `index.html` — main HTML file
- `vite.config.js` or `vite.config.ts` — Vite configuration file [web:1]

## React Plugins

Vite currently provides official plugins for React integration, including:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) [web:21]

## React Compiler

The React template referenced for Vite includes support information for the React Compiler. According to React’s documentation, the compiler can be used in modern React workflows, although enabling it may affect development and build performance depending on the project configuration. [web:2]

## Learn More

To learn more about the tools used in this project, check the following resources:

- [Vite Documentation](https://vite.dev/guide/) [web:1]
- [React Documentation](https://react.dev/) [web:2]
- [React Compiler Documentation](https://react.dev/learn/react-compiler) [web:2]

## Build for Production

To generate an optimized production build, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun run preview
```

## Notes

This project represents the practical implementation of an academic system analysis and design exercise using modern frontend technologies. The migration from Next.js to React + Vite was made to improve comfort, simplicity, and development flow during the construction of the application.
