# API Routes Documentation

## Overview

API follows industry-standard practices for API design including health checks and clear resource organization.

## Structure

```
routes/
├── index.ts          # Main router
└── README.md         # This file
```

## Endpoints

### System Endpoints

#### Health Check

```
GET /api/health
```

Returns system health status for monitoring and load balancers.

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2025-10-30T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0"
}
```

#### API Information

```
GET /api/info
```

Returns API metadata.

**Response:**

```json
{
  "name": "API",
  "version": "1.0.0",
  "documentation": "/swagger/api-docs"
}
```

### API Routes

All API endpoints use the following pattern:

```
/api/{resource}
```

**Examples:**

```
POST /api/auth/login
GET  /api/university/my
PUT  /api/users/1
```

## Resource Groups

### Authentication & User Management

- `/auth` - Authentication (login, logout, registration)
- `/users` - User management

### Core Resources (Alphabetically Sorted)

- `/abiturient` - Applicant management
- `/country` - Country data
- `/email` - Email operations
- `/plan` - Admission plans
- `/settings` - System settings
- `/shared` - Shared resources
- `/tour` - Tour management
- `/university` - University management

## API Design Philosophy

The API follows RESTful principles with:

- Clear resource naming
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Consistent response formats
- Localized error messages

## Best Practices

### For Developers

1. **Sort routes alphabetically** within groups for maintainability
2. **Add JSDoc comments** for all routes with Swagger documentation
3. **Use middleware** for common operations (auth, validation)
4. **Follow RESTful conventions** for resource naming
5. **Validate all inputs** using Zod schemas

### For API Consumers

1. **Include authentication tokens** in headers for protected endpoints
2. **Handle errors gracefully** with proper error codes
3. **Use language parameter** (`?lang=en|ru|ky`) for localized responses
4. **Respect rate limits** to avoid being blocked

## Adding New Routes

When adding new routes:

1. Create your module following the standard structure (route, controller, service, repository, schema)
2. Import the router in `routes/index.ts`
3. Place in correct alphabetical position within the appropriate group
4. Add JSDoc documentation with Swagger annotations
5. Test the endpoint and update documentation

**Example:**

```typescript
// routes/index.ts
import newResourceRouter from "../new-resource";

// ... other imports ...

router.use("/new-resource", newResourceRouter); // Alphabetical order
```

## Error Handling

All routes use standardized error responses:

```json
{
  "success": false,
  "message": "Запрашиваемый ресурс не найден",
  "data": null
}
```

404 errors are handled by catch-all middleware at the end of each router.

## Monitoring & Metrics

Use the health check endpoint for:

- Load balancer health checks
- Uptime monitoring
- Performance tracking
- Deployment verification

## Security

All routes (except `/health` and `/info`) should:

- Require authentication via JWT tokens
- Use rate limiting (configured in `src/index.ts`)
- Validate input data with Zod schemas
- Return localized error messages

## Related Documentation

- [CLAUDE.md](/CLAUDE.md) - Project overview and conventions
- [Swagger Docs](http://localhost:3000/swagger/api-docs) - Interactive API documentation
- [Authentication Guide](../auth/README.md) - Authentication details
