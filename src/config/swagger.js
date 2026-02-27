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
            },
            schemas: {
                Lead: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        lead_number: { type: 'string' },
                        first_name: { type: 'string' },
                        last_name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        mobile_number: { type: 'string' },
                        lead_source: { type: 'string' },
                        product_type: { type: 'string' },
                        priority: { type: 'string' },
                        pincode: { type: 'string' },
                        city: { type: 'string' },
                        state: { type: 'string' },
                        gender: { type: 'string' },
                        date_of_birth: { type: 'string', format: 'date' },
                        status: { type: 'string' },
                        created_by: { type: 'string' },
                        updated_by: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ['./src/routes/*.js']
};

export const swaggerJsdoc = swaggerJSDoc(options);