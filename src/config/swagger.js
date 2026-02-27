import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Lead Management API",
            version: "1.0.0",
            description: `
## Insurance CRM — Lead Management Backend
Developed for Scholigence Machine Test.

### Features:
- JWT Authentication
- Lead CRUD with soft delete
- Lead Number auto-generation (LEAD-YYYY-XXXX)
- Lead to Quote conversion
- Filtering, search, and pagination`,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token. Get it from POST /api/auth/login'

                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.js']
};

export const swaggerJsdoc = swaggerJSDoc(options);