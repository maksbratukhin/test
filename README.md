# Product Portal - Monorepo

A production-ready, scalable monorepo product portal application built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Nx. This project demonstrates advanced architectural patterns for building multi-brand applications with shared components and reusable code.

### Tech

- **Next.js 16 Canary** with SSR, SSG, and ISG
- **React 19** with concurrent features
- **TypeScript** for type safety across the entire codebase
- **Nx** for monorepo management and build optimization
- **Tailwind CSS** for utility-first styling
- **React Query** for data fetching and caching
- **Zustand** for state management
- **Jest & React Testing Library** for comprehensive testing

## Architecture

### Monorepo Structure

The project uses Nx to manage a monorepo with the following structure:

```
product-portal/
├── apps/
│   ├── project-a/          # Green-themed brand (Port 3000)
│   └── project-b/          # Red-themed brand (Port 3001)
├── packages/
│   ├── constants/          # Shared constants
│   ├── types/              # TypeScript type definitions
│   └── shared-components/  # Reusable UI components
```

### Architecture Decisions

#### 1. Shared Component Strategy

**Decision**: Create a generic shared component library that accepts configuration props.

**Rationale**:

- Reduces code duplication across brands
- Allows fine-grained customization per brand
- Maintains a single source of truth for core functionality
- Easy to test and maintain

**Implementation**:

- `ProductCard` component accepts `layout`, `showCategoryTags`, `thumbnailCount`, and `primaryColor` props
- Brand-specific wrappers (`BrandProductCard`) inject brand configuration
- Components are agnostic to brand identity

#### 2. Brand Configuration Files

**Decision**: Store brand-specific configurations in separate files per project.

**Rationale**:

- Centralized configuration makes it easy to modify brand appearance
- Type-safe configuration using TypeScript interfaces
- Clear separation of concerns
- Easy to add new brands

**Implementation**:

```typescript
export const brandConfig: BrandConfig = {
  name: 'Project A',
  primaryColor: '#22c55e',
  layout: 'vertical',
  showCategoryTags: false,
  productCardThumbnails: 1,
  alertMessage: 'Hello from Green Project',
};
```

#### 3. Market Support

**Decision**: Use dynamic routes with market parameter (`/[market]/*`).

**Rationale**:

- SEO-friendly URLs
- Static generation at build time
- Easy to add new markets
- Proper internationalization support

**Implementation**:

- Static params generation for all markets
- Market-specific content configuration
- Feature flags per market

#### 4. Incremental Static Generation (ISG)

**Decision**: Use ISG with 5-minute revalidation for product pages.

**Rationale**:

- Combines benefits of SSR and SSG
- Fresh content for crawlers and users
- Reduced server load
- Optimal performance

**Implementation**:

```typescript
export const revalidate = 300; // 5 minutes

// Product shuffle mechanism logs content changes
console.log('[Product Shuffle] Content modified');
```

#### 5. State Management

**Decision**: Use Zustand for client-side state with persistence.

**Used For**:

- User authentication state
- Modal queue management

#### 6. Data Fetching

**Decision**: Use React Query for client-side data fetching, native fetch for SSR.

### Brand Differences

| Feature       | Project A (Green)          | Project B (Red)          |
| ------------- | -------------------------- | ------------------------ |
| Primary Color | #22c55e                    | #ef4444                  |
| Layout        | Vertical                   | Horizontal               |
| Category Tags | Hidden                     | Shown                    |
| Thumbnails    | 1                          | 2                        |
| Alert Message | "Hello from Green Project" | "Hello from Red Project" |
| Port          | 3000                       | 3001                     |

## Project Structure

```
product-portal/
├── apps/
│   ├── project-a/
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── [market]/          # Market-specific routes
│   │   │   │   ├── page.tsx       # Welcome page
│   │   │   │   ├── login/         # Login page
│   │   │   │   ├── products/      # Product list (ISG)
│   │   │   │   └── product/[slug]/# Product detail
│   │   │   ├── layout.tsx         # Root layout
│   │   │   └── globals.css        # Global styles
│   │   ├── components/            # Brand-specific components
│   │   ├── lib/                   # Utilities and configurations
│   │   │   ├── brand-config.ts    # Brand configuration
│   │   │   ├── market-content.ts  # Market content
│   │   │   ├── feature-flags.ts   # Feature flags
│   │   │   ├── credentials.ts     # Login credentials
│   │   │   ├── api/              # API utilities
│   │   │   ├── stores/           # Zustand stores
│   │   │   ├── indexeddb.ts      # IndexedDB manager
│   │   │   └── websocket.ts      # WebSocket manager
│   │   ├── __tests__/            # Integration tests
│   │   └── package.json
│   └── project-b/                 # Same structure as project-a
├── packages/
│   ├── constants/
│   │   └── src/
│   │       └── index.ts          # Shared constants
│   ├── types/
│   │   └── src/
│   │       └── index.ts          # Type definitions
│   └── shared-components/
│       └── src/
│           ├── ProductCard.tsx   # Generic product card
│           ├── Button.tsx        # Generic button
│           ├── Modal.tsx         # Modal component
│           └── *.test.tsx        # Unit tests
├── docker-compose.yml            # Docker orchestration
├── Dockerfile.project-a          # Project A Dockerfile
├── Dockerfile.project-b          # Project B Dockerfile
├── nx.json                       # Nx configuration
├── tsconfig.base.json            # Base TypeScript config
└── package.json                  # Root package.json
```

## Setup Instructions

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd product-portal
```

2. Install dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

Run both projects in parallel:

```bash
npm run dev
```

Run a specific project:

```bash
npm run dev:project-a  # Runs on http://localhost:3000
npm run dev:project-b  # Runs on http://localhost:3001
```

### Production Build

Build all projects:

```bash
npm run build
```

Build a specific project:

```bash
npm run build:project-a
npm run build:project-b
```

### Start Production Server

After building, start the production server:

```bash
cd apps/project-a && npm start  # Port 3000
cd apps/project-b && npm start  # Port 3001
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests for Specific Package

```bash
npx nx test shared-components  # Unit tests
npx nx test project-a          # Integration tests
npx nx test project-b          # Integration tests
```

## Docker Deployment

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:

- Build both Project A and Project B
- Start Project A on port 3000
- Start Project B on port 3001

### Build Individual Containers

```bash
docker build -f Dockerfile.project-a -t product-portal-a .
docker build -f Dockerfile.project-b -t product-portal-b .
```

### Run Individual Containers

```bash
docker run -p 3000:3000 product-portal-a
docker run -p 3001:3001 product-portal-b
```

## Brand Customization

### Adding a New Brand

1. Create a new app directory:

```bash
mkdir apps/project-c
```

2. Copy the structure from an existing project

3. Create brand configuration (`lib/brand-config.ts`):

```typescript
export const brandConfig: BrandConfig = {
  name: 'Project C',
  primaryColor: '#3b82f6', // Blue
  layout: 'vertical',
  showCategoryTags: true,
  productCardThumbnails: 1,
  alertMessage: 'Hello from Blue Project',
  // ...
};
```

4. Update Tailwind colors in `tailwind.config.js`

5. Add to package.json scripts

### Customizing Shared Components

The `ProductCard` component demonstrates the customization pattern:

```typescript
<ProductCard
  product={product}
  layout="horizontal"           // Brand-specific
  showCategoryTags={true}       // Brand-specific
  thumbnailCount={2}            // Brand-specific
  primaryColor="#ef4444"        // Brand-specific
  onCardClick={handleClick}     // Brand-specific logic
/>
```

## Available Routes

### Project A (http://localhost:3000)

- `/en` - English welcome page
- `/ca` - Canadian welcome page
- `/en/login` - Login page
- `/en/products` - Product list (ISG)
- `/en/product/[slug]` - Product detail
- (Same for `/ca/*`)

### Project B (http://localhost:3001)

- Same route structure as Project A

### Watch Mode

The monorepo automatically rebuilds packages when changes are detected in development mode.

### Code Quality

```bash
npm run lint      # Run ESLint
npm run format    # Format with Prettier
```

### Adding Dependencies

Add to root:

```bash
npm install <package>
```

Add to specific app:

```bash
cd apps/project-a && npm install <package>
```

Add to package:

```bash
cd packages/shared-components && npm install <package>
```

### ✅ Husky Git Hooks

- **Pre-commit**: Runs lint and format check
- **Pre-push**: Runs all tests

## Storybook

http://localhost:6006
