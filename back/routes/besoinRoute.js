import express from "express";
import {
  GetAllBesoins,
  AddBesoin,
  EditBesoin,
  DeleteBesoin,
  ValidateBesoin,
} from "../controllers/besoinController.js";
import { verifyToken, isPresta, isAdmin, isMember } from "../middlewares/authJwt.js";

const router = express.Router();

//VOICI MON CRUD (CREATE READ UPDATE DELETE)

// AJOUTER UN BESOIN
router.post("/add-besoin", verifyToken, AddBesoin);

// OBTENIR TOUS LES BESOINS
router.get("/besoins", verifyToken, isPresta, GetAllBesoins);

// OBTENIR TOUS LES BESOINS POUR LES MEMBRES
router.get("/besoins-membre", verifyToken, isMember, GetAllBesoins);

// EDITER UN BESOIN
router.put("/edit-besoin/:id", verifyToken, isPresta, EditBesoin);

// VALIDER UN BESOIN
router.post("/valid-besoin/:id", verifyToken, isPresta, ValidateBesoin);

// SUPPRIMER UN BESOIN
router.delete("/delete-besoin/:id", verifyToken, isAdmin, DeleteBesoin);

// SUPPRIMER UN BESOIN PAR LES MEMBRES
router.delete("/delete-besoin-membre/:id", verifyToken, isMember, DeleteBesoin);

export default router;
