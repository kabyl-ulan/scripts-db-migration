# PostgreSQL Database Migration Tool

## Project Overview
Инструмент для управления миграциями PostgreSQL базы данных с поддержкой множественных серверов. Поддерживает параллельное выполнение, автоматическую обработку SQL, сравнение схем и синхронизацию.

📖 **[Полная документация на русском языке →](./docs/MIGRATION_GUIDE.md)**

### Ключевые возможности
- ✅ **Автоматическая обработка SQL** - добавление `IF NOT EXISTS/IF EXISTS` автоматически
- ✅ **Отслеживание версий** - checksum-based tracking для обнаружения изменений
- ✅ **Транзакционная безопасность** - автоматический откат при ошибках
- ✅ **Параллельное выполнение** - на множественных серверах одновременно
- ✅ **Сравнение схем** - Schema diff & sync между базами
- ✅ **Фильтрация** - по тегам, серверам, исключениям

---

## Быстрый старт

### 1. Установка
```bash
npm install
```

### 2. Настройка
Скопируйте и отредактируйте конфигурацию:
```bash
cp config/databases.example.js config/databases.js
# Отредактируйте config/databases.js
```

### 3. Создайте миграцию
```bash
npm run migrate:create "add users table"
```

### 4. Запустите миграции
```bash
npm run migrate
```

---

## Основные команды

### Через npm scripts (рекомендуется)
```bash
# Статус миграций
npm run migrate:status

# Создать новую миграцию
npm run migrate:create "описание"

# Применить все миграции
npm run migrate

# Dry run (предпросмотр)
npm run migrate:dry

# Сравнение схем
npm run schema:diff <database>

# Синхронизация схем
npm run schema:sync <database>
```

### Прямой вызов CLI (для расширенных опций)
```bash
# Фильтр по тегам
npx ts-node src/tools/db-migrate/cli.ts migrate -t production

# Фильтр по серверам
npx ts-node src/tools/db-migrate/cli.ts migrate -s master,slave-1

# Одна база
npx ts-node src/tools/db-migrate/cli.ts single dev foreigners_new

# Dry run с фильтром
npx ts-node src/tools/db-migrate/cli.ts migrate -d -t development
```

📖 [Полное руководство →](./docs/MIGRATION_GUIDE.md) | 📝 [Примеры миграций →](./docs/EXAMPLES.md)

---

## SQL Preprocessor

Система **автоматически обрабатывает SQL** перед выполнением:

| Вы пишете | Выполняется |
|-----------|-------------|
| `CREATE TABLE users (...)` | `CREATE TABLE IF NOT EXISTS users (...)` |
| `ALTER TABLE users ADD COLUMN email` | `ALTER TABLE users ADD COLUMN IF NOT EXISTS email` |
| `DROP TABLE old_table` | `DROP TABLE IF EXISTS old_table` |

**Результат:** Миграции безопасны для повторного запуска!

---

## Backend System

Этот проект также содержит backend систему - платформу управления образованием, построенную на TypeScript и Node.js. Система предоставляет API для управления университетами, заявками студентов и административными функциями.

## Key Features
- User authentication and role-based access control (ministry officials, university admins, applicants)
- University and country management 
- Student application system
- File upload functionality for avatars and documents
- Multi-language support with localization
- Email verification system
- API documentation with Swagger
- Session management and caching with Redis
- PostgreSQL database integration

## Technologies Stack
- **Backend**: Node.js with Express.js v5.1.0
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: express-rate-limit (DoS protection)
- **File Upload**: express-fileupload
- **Validation**: Zod
- **Documentation**: Swagger
- **Build Tools**: Webpack, TypeScript compiler
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions
- **Process Manager**: PM2 (via ecosystem.config.js)
- **Internationalization**: i18next

## Project Structure
```
├── .env                           # Environment variables 
├── ecosystem.config.js            # PM2 process manager 
├── nodemon.json                   # Development server configuration
├── package.json                   # Project dependencies and scripts
├── README.md                      # Project documentation
├── tsconfig.json                  # TypeScript compiler 
├── webpack.config.ts              # Webpack bundler configuration
├── dist/                          # Compiled TypeScript output
├── sql/                           # Database stored procedures
└── src/                           # Source code
    ├── auth/                      # Authentication and authorization
    ├── config/                    # Configuration files
    ├── country/                   # Country management
    ├── email/                     # Email functionality
    ├── locales/                   # Translation files
    ├── middleware/                # Express middleware
    ├── routes/                    # API route definitions
    ├── services/                  # Business logic services
    ├── types/                     # TypeScript type definitions
    ├── utils/                     # Utility functions
    └── index.ts                   # Main application entry point
```

## Building and Running

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Redis server
- Environment variables configured in `.env` file

### Environment Setup
Create a `.env` file based on the project requirements with variables for database connection, Redis, JWT secrets, and other configurations.

### Installation
```bash
npm install
```

### Development Mode
```bash
# Run in development mode with auto-restart
npm run dev
```

### Production Build and Run
```bash
# Build the project
npm run build

# Start the production server
npm start
```

### Code Quality and Linting
```bash
# Run ESLint to check for code issues
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Check code formatting with Prettier
npm run format:check

# Auto-format code with Prettier
npm run format
```

### Using PM2 for Production
```bash
# Start with PM2 using ecosystem config
pm2 start ecosystem.config.js --env prod
```

## Development Conventions

### Coding Standards
- Uses TypeScript with strict mode enabled (noImplicitAny, strictNullChecks, etc.)
- ESLint configured with TypeScript support and strict rules
- Prettier for consistent code formatting
- Zod for schema validation
- Express.js for routing and middleware
- Strong typing throughout the application

### Security
- Input validation using Zod schemas
- JWT-based authentication
- Password hashing (using MD5 - though this should be upgraded to a stronger algorithm like bcrypt or Argon2)
- Role-based access control
- CORS middleware implementation
- Rate limiting to prevent DoS attacks:
  - General API: 300 requests per 15 minutes per IP (~20 per minute)
  - Authentication endpoints: 5 attempts per 15 minutes per IP
  - File uploads: 10 uploads per 15 minutes per IP
  - Automatically uses Redis Store in production for distributed rate limiting

### Database
- PostgreSQL stored procedures for complex operations (found in sql/ directory)
- Role-specific database operations
- Connection pooling handled via pg library
- Multiple user tables based on roles (users, users_university, abiturient)

### Testing
- Unit tests and integration tests locations to be confirmed
- API endpoint testing with Swagger validation

Each role has specific permissions for different API endpoints as defined in the authorization middleware.

## Key API Endpoints
- `/api/auth/` - Authentication (login, token validation, etc.)

The SQL directory contains stored procedures for different operations like university grid display, authentication functions, and data updates.

## Build Process
The application uses:
1. TypeScript compiler (tsc) to transpile TypeScript to JavaScript
2. Webpack to bundle the compiled output into a single file
3. Terser plugin for minification during the webpack build process

## Configuration Files
- `tsconfig.json` - Strict TypeScript configuration with ES2020 target
- `webpack.config.ts` - Production webpack configuration with optimization
- `nodemon.json` - Development server configuration for automatic restarts
- `ecosystem.config.js` - PM2 configuration with different environments (local, dev, prod)

## Main Application Flow
The main application entry point (`src/index.ts`) sets up:
- Express server with various middleware
- CORS, compression, file upload, logging
- Rate limiting for API protection
- Authentication and i18n middleware
- API routes grouping
- Error handling
- Database and Redis connections
- Swagger documentation
- Graceful shutdown handling for PM2

## CI/CD Pipeline
The project uses GitHub Actions for continuous integration and deployment:

### Automated Workflows
- **Lint and Test**: Runs on Node.js 18.x and 20.x
  - ESLint code quality checks
  - Prettier formatting verification
  - TypeScript compilation checks
- **Build**: Compiles and bundles the application
  - Artifacts retained for 7 days
- **Security Audit**: npm audit and dependency checks

Code quality is enforced through CI/CD pipeline on every push and pull request.# scripts-db-migration
