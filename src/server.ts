import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import express from "express";
import router from "./router";
import db from "./config/db";

//CONECTAR A BASE DE DATOS
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.magenta("Conexion exitosa a la base de datos"));
  } catch (error) {
    //console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la DB"));
  }
}

connectDB();

//INSTANCIA DE EXPRESS
const server = express();

//PERMITIR CONEXIONES
const whitelist = [
  "http://localhost:5173",
  "https://rest-apis-typescript-frontend-sable.vercel.app",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions));

//LEER DATOS DE FORMULARIOS
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
