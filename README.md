# Next.js + NestJS JWT Auth CRUD

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A fullstack demo application featuring:

- JWT authentication
- CRUD operations for posts
- Modern frontend (Next.js) + robust backend (NestJS)
- TypeScript end-to-end

## ✨ Features

### Frontend (Next.js)

- Static export compatible (no SSR/api routes)
- Authentication flows (login/register)
- React Query for data fetching/caching
- Zustand for global state
- Form validation with `react-hook-form` + Zod
- Tailwind CSS + Shadcn UI components
- JWT storage in localStorage

### Backend (NestJS)

- REST API with JWT authentication
- Protected routes using Guards
- Zod validation pipelines
- Prisma ORM with PostgreSQL
- Automated database migrations
- Dockerized PostgreSQL setup

## 🚀 Quick Start

### Backend Setup

1. Install dependencies:

```bash
cd backend && pnpm install
```

2. Copy environment variables:

```bash
cp example.env .env
```

3. Start PostgreSQL (requires Docker):

```bash
./start-database.sh
```

4. Run database migrations:

```bash
pnpm db push
```

5. Start dev server:

```bash
pnpm start:dev
```

### Frontend Setup

<!-- 1. Install dependencies:

   ```bash
   cd frontend && pnpm install
   ```

2. Start dev server:
   ```bash
   pnpm dev
   ``` -->

1. Install dependencies:

```bash
cd frontend && pnpm install
```

2. Adjust api environment variables on ./src/config.ts

3. Start dev server:

```bash
pnpm dev
```

## 🌐 API Endpoints

| Method | Endpoint             | Description       | Protected |
| ------ | -------------------- | ----------------- | --------- |
| POST   | `/api/auth/login`    | User login        | No        |
| POST   | `/api/auth/register` | User registration | No        |
| GET    | `/api/posts`         | Get all posts     | Yes       |
| POST   | `/api/posts`         | Create new post   | Yes       |
| ...    | ...                  | ...               | ...       |

## 📝 License

MIT
