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
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
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
