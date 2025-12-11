import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Edugate App API",
      version: "1.0.0",
      description: `
        API documentation for Edugate Application
        
        ## Аутентификация
        API поддерживает метод аутентификации:
        **Bearer Token** - JWT токен в заголовке Authorization
      `,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        langParam: {
          name: "lang",
          in: "query",
          required: false,
          schema: {
            type: "string",
            enum: ["ru", "en", "ky"],
            default: "en",
          },
        },
      },
    },
  },
  apis: ["./src/**/*.ts", "./src/*/*.ts", "*./*/*.js", "./*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
