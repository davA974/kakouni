import express from "express";
import {
    postAvis,
    getAllAvis,
    deleteAvis,
  } from "../controllers/avisController.js";

import { verifyToken, isAdmin } from "../middlewares/authJwt.js";


const router = express.Router();

// AJOUTER UN AVIS
router.post("/api/ajouter-avis", verifyToken, postAvis);

// récupere les avis donc pas besoin du token pour le voir
router.get("/api/recuperer-avis", getAllAvis);

// SUPPRIMER UN AVIS
router.delete("/api/delete-avis/:id", verifyToken, isAdmin, deleteAvis);



export default router;