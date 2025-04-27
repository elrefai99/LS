import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API Docs",
      version: "1.0.0",
      description: "API documentation for my project",
    },
    servers: [
      {
        url: "https://admin.lesoll-demo.site/",
        description: "Live URL",
      },
      {
        url: "http://ec2-3-227-150-208.compute-1.amazonaws.com:7000/",
        description: "PBE URL",
      },
      {
        url: "http://localhost:7000/",
        description: "Local URL",
      },
    ],
  },
  apis: ["./src/swagger/*.ts", "./dist/swagger/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger docs available at https://admin.lesoll-demo.site/api-docs");
}
