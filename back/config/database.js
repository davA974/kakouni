import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// ON PARAMETRE LA CONNEXION A LA BASE DE DONNEES

export const connectDB = mongoose.connect(process.env.DB_CONNECT);

mongoose.connection.on("open", () => {
  console.log("Connection avec la Base de Donnée réussie");
});

mongoose.connection.on("error", () => {
  console.log("Erreur de connecxion avec la Base de Donnée ");
});
