# Store Manager

A web-based store inventory management application built with React, TypeScript, and Clean Architecture.

## Tech Stack

| Technology | Description |
|---|---|
| **React 19** | UI library |
| **TypeScript 6** | Language |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **react-router 8** | Client-side routing |
| **react-hook-form + Zod** | Form handling & validation |
| **Vitest + Testing Library** | Unit & component testing |

## Features

- **Product listing** with search (debounced), category filter, and pagination
- **Product detail** view with full info and action buttons
- **Create product** with form validation (name, description, price, stock, image, categories)
- **Update product** with pre-populated form
- **Delete product** with confirmation dialog
- **Navigation bar** with placeholders for future Sales and Purchases modules

## Architecture

The project follows **Clean Architecture** with four layers:

```
src/
  app/
    domain/           Enterprise business rules
      model/          Core entities (Product, Page)
      exceptions/     Domain-specific exceptions
      ProductRepositoryPort.ts   Repository interface (port)
      schmeas/        Zod validation schemas
    application/      Use cases (business logic)
      products/       Product use cases
    infraestructure/  Adapters for external systems
      RemoteProductRepository.ts   API implementation
      dto/            Data transfer objects
      mapper/         DTO-to-domain mappers
    presentation/     React UI layer
      App.tsx         Routes
      main.tsx        Entry point
      products/       Product feature modules
      shared/         Reusable components & hooks
```

The backend REST API is expected at `http://localhost:8080` (configurable via `VITE_SERVICE_URL`).

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products?text=&category=&page=` | List products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `GET` | `/api/products/categories` | List all categories |
| `POST` | `/api/products` | Create product |
| `PUT` | `/api/products/{id}` | Update product |
| `DELETE` | `/api/products/{id}` | Delete product |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check & build for production
npm run build

# Preview production build
npm run preview
```

## Testing

```bash
# Run tests in watch mode
npm test

# Run tests once with coverage
npm run test:coverage
```

## Linting

```bash
npm run lint
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_SERVICE_URL` | `http://localhost:8080` | Backend API base URL |
