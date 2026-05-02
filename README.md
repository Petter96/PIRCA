# PIRCA (Plataforma Integral de Registro y Consulta de Alumnado)

This project is currently built with **React + Vite**.

PIRCA is a web application focused on the registration, management, and consultation of student information.  This project is currently organized into two parts: **Frontend** and **Backend**.

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
- A PostgreSQL database configured for the backend API.

## Project Structure

This project is separated into two main fiolders:

- `Backend/` — contains the API and server-side logic.
- `Frontend/` — contains the web application built with React + Vite.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. Install dependencies in both folders:

   ```bash
   cd Backend
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

   ```bash
   cd Frontend
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

> **Note:** All dependencies are already listed in `package.json`. Running any of the install commands above will install them automatically.

## Backend Configuration

Before starting the backend, create a `.env` file inside the `Backend` folder.

Example:

```env
DB_USER=your_database_user
DB_HOST=localhost
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
```

These variables are used to configure the database connection and JWT authentication in the backend. Using a `.env` file is a common way to keep configuration values separate from the source code [web:1][web:4].

> **Important:** Do not upload the `.env` file to GitHub. Add it to `.gitignore` to avoid exposing sensitive credentials, which is standard practice for environment-variable-based configuration [web:3][web:9].

## Running the Project

To run the project correctly, you must start the backend and frontend separately.

### 1. Start the backend API

Open a terminal and run:

```bash
cd Backend
npm run dev
```

Or, if your backend uses a different start script:

```bash
npm start
```

### 2. Start the frontend

Open another terminal and run:

```bash
cd Frontend
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Vite uses `npm run dev` to start the local development server for the frontend [web:10].

Then open the local URL shown in the terminal, usually something like:

[http://localhost:5173](http://localhost:5173)

## Notes

- The `Backend` folder must be running for the API to respond correctly.
- The `Frontend` folder must be running for the web interface to be available.
- Make sure the backend database credentials in `.env` are correct before starting the API.

## Project Structure Frontend

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

## Notes

This project represents the practical implementation of an academic system analysis and design exercise using modern frontend technologies. The migration from Next.js to React + Vite was made to improve comfort, simplicity, and development flow during the construction of the application.
