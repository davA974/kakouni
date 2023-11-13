import express from "express";
import {
  GetAllUsers,
  LoginSubmit,
  Logout,
  RegisterSubmit,
  ValidateUtilisateur,
  DeleteUtilisateur,
} from "../controllers/userController.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();

//VOICI MON CRUD (CREATE READ UPDATE DELETE)

// definir toutes les routes liées à un utilisateur et détermine si ils faut les mots de passes et si il sont être admin

// S'INSCRIRE
router.post("/register", RegisterSubmit);

// SE CONNECTER
router.post("/login", LoginSubmit);

// SE DÉCONNECTER
router.get("/logout", Logout);

// OBTENIR TOUS LES UTILISATEURS
router.get("/users", verifyToken, isAdmin, GetAllUsers);

// VALIDER UN UTILISATEUR
router.post(
  "/valid-utilisateur/:id",
  verifyToken,
  isAdmin,
  ValidateUtilisateur
);

// SUPPRIMER UN UTILISATEUR
router.delete(
  "/delete-utilisateur/:id",
  verifyToken,
  isAdmin,
  DeleteUtilisateur
);

export default router;
