import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
           content: url('data:image/png;base64,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')
           height: 100px;
           width: auto;}
        .swagger-ui .topbar {
        backround-color: black;
        }
        
        `,
  customSiteTitle: "Documentacion REST API Express / TypeScript",
};
export default swaggerSpec;
export { swaggerUiOptions };
