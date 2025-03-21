# PDF Converter

A web application for converting text to PDF format with document storage and management capabilities.

## Tech Stack

- **Frontend Framework:** Next.js
- **JavaScript Library:** React
- **Styling:** TailwindCSS
- **Type System:** TypeScript
- **Database:** IndexedDB (Dexie.js)
- **PDF Processing:** react-pdf
- **Testing:** Jest + React Testing Library

## Project Structure

```
pdf-converter/
├── src/                    # Source code
│   ├── actions/            # Server actions
│   ├── app/                # Next.js app directory
│   ├── assets/             # Static assets and resources
│   ├── components/         # React components
│   ├── db/                 # Database models
│   ├── types/              # TypeScript type definitions
│   └── __tests__/          # Test files
├── public/                 # Static files
├── jest.config.ts          # Jest configuration
├── postcss.config.mjs      # PostCSS configuration
├── next.config.ts          # Next.js configuration
├── eslint.config.mjs       # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── .env.example            # Environment variables example
└── package.json            # Dependencies and scripts
```

## Core Modules

- **PDF Converter Core** - Primary module for text to PDF conversion:
  - Text input handling and validation
  - Integration with external PDF conversion API
  - Basic PDF generation from text input
- **Document Storage** - Document management system based on IndexedDB:
  - PDF document saving and retrieval
  - Basic metadata storage
  - Document history management
- **UI Components** - Library of reusable React components:
  - Text input form with validation
  - PDF viewer and preview
  - Document history interface
  - Navigation and layout components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Dintik/pdf-converter
```

2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env.local` and configure environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Check code with ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Configuration Files

The project includes several configuration files:

- `jest.config.ts` - Jest testing configuration
- `postcss.config.mjs` - PostCSS and TailwindCSS configuration
- `next.config.ts` - Next.js framework configuration
- `eslint.config.mjs` - ESLint code linting rules
- `.prettierrc` - Prettier code formatting rules
- `tsconfig.json` - TypeScript compiler options

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `src/__tests__/` directory.

To run tests:

```bash
npm run test        # Single run
npm run test:watch  # Watch mode
```

## Deployment

The application can be deployed on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
