import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

// verification de token dans un middlewares On verifie que l'utilisateur est bien connecté
export const verifyToken = (req, res, next) => {
  // On extrait le token du headers
  let authToken = req.headers.authorization;
  let token = authToken && authToken.split(" ")[1];

  // Si il n'y a pas de token (si la personne n'est pas pas entré son mots de passe)
  if (!token) {
    return res.json({ message: "vous n'êtes pas authentifié" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res.json({
        message: "Vous n'êtes pas autorisé à accéder à cette page.",
      });
    }

    // result est le décodage du token, ne pas oublier le next() parceque nous sommes dans un middleware
    req.userId = result.id;

    next();
  });
};

export const isPresta = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.json({ message: "Aucun utilisateur trouvé avec cet ID" });
  }

  // pour contrôler que ce sont  mes prestataires et mon admin 
  if (user.role !== "prestataire" && user.role !== "admin") {
    return res.json({
      message: "Vous devez être prestataire pour accéder à cette page",
    });
  }

  next();

  return;
};

export const isMember = async (req, res, next) => {
  const user = await User.findById(req.userId);
console.log(user);
  if (!user) {
    return res.json({ message: "Aucun utilisateur trouvé avec cet ID" });
  }

  // pour controler que le membre est bien connecté
  if (user.role !== "membre") {
    return res.json({
      message: "Vous devez être membre pour accéder à cette page",
    });
  }

  next();

  return;
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.json({ message: "Aucun utilisateur trouvé avec cet ID" });
  }
  if (user.role !== "admin") {
    return res.json({
      message:
        "Vous devez être administrateur pour accéder à cette page ou effectuer cette tâche",
    });
  }

  next();

  return;
};
