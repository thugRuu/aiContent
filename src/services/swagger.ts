import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerJsdoc = require( "swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Portfolio API",
      version: "1.0.0",
      description: "API documentation for my portfolio backend",
    },
    servers: [
      {
        url: "http://localhost:3000", // change to your API URL
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // paths to files with API annotations
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
