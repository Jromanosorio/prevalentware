import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
  "openapi": "3.0.3",
  "info": {
    "title": "API Gestion de datos",
    "version": "1.0.0",
    "description": "API para registrar y consultar ingresos y egresos, usuarios y reportes. Protegida con autenticación."
  },
  "paths": {
    "/transactions": {
      "get": {
        "summary": "Obtener todas las transacciones",
        "description": "Devuelve la lista de transacciones financieras en orden descendente por fecha.",
        "tags": ["Transacciones"],
        "responses": {
          "200": {
            "description": "Lista de transacciones obtenida con éxito",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Transaction" }
                }
              }
            }
          },
          "401": {
            "description": "Acceso no autorizado"
          }
        }
      },
      "post": {
        "summary": "Crear una nueva transacción",
        "description": "Registra un nuevo movimiento financiero en la base de datos.",
        "tags": ["Transacciones"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NewTransaction"
              },
              "example": {
                "amount": 1500.50,
                "date": "2025-09-08T12:00:00.000Z",
                "concept": "Ingreso",
                "description": "Pago de cliente"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Transacción creada con éxito",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Transaction" }
              }
            }
          },
          "401": {
            "description": "Acceso no autorizado"
          }
        }
      }
    },
    "/users": {
      "get": {
        "summary": "Obtener lista de usuarios",
        "tags": ["Usuarios"],
        "responses": {
          "200": {
            "description": "Lista de usuarios",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/User" }
                }
              }
            }
          },
          "401": { "description": "Acceso no autorizado" }
        }
      },
      "patch": {
        "summary": "Actualizar usuario",
        "tags": ["Usuarios"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUser"
              },
              "example": {
                "id": "usr_12345",
                "name": "Nuevo Nombre",
                "role": "admin"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuario actualizado",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/User" }
              }
            }
          },
          "401": { "description": "Acceso no autorizado" },
          "403": { "description": "No tienes permisos" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Transaction": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "example": "txn_12345" },
          "amount": { "type": "number", "example": 1500.50 },
          "description": { "type": "string", "example": "Pago de cliente" },
          "date": { "type": "string", "format": "date-time", "example": "2025-09-08T12:00:00.000Z" },
          "concept": { "type": "string", "example": "Ingreso" },
          "user": { "type": "string", "example": "Pedro Perez" }
        }
      },
      "NewTransaction": {
        "type": "object",
        "required": ["amount", "concept"],
        "properties": {
          "amount": { "type": "number", "example": 1500.50 },
          "date": { "type": "string", "format": "date-time", "example": "2025-09-08T12:00:00.000Z" },
          "concept": { "type": "string", "example": "Ingreso" },
          "description": { "type": "string", "example": "Pago de cliente" }
        }
      },
      "User": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "example": "usr_12345" },
          "email": { "type": "string", "example": "pedro@example.com" },
          "name": { "type": "string", "example": "Pedro Perez" },
          "role": { "type": "string", "example": "admin" }
        }
      },
      "UpdateUser": {
        "type": "object",
        "required": ["id"],
        "properties": {
          "id": { "type": "string", "example": "usr_12345" },
          "name": { "type": "string", "example": "Nuevo Nombre" },
          "role": { "type": "string", "example": "user" }
        }
      }
    }
  }
}

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./app/api/**/*.ts"], // rutas donde están tus endpoints
})
