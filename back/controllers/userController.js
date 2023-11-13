import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterSubmit = async (req, res) => {
  try {
    let verifMail = await User.findOne({ email: req.body.email });

    // REGEX pour valider un mot de passe
    const checkPwd =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
    let user;

    // verification que le mail de l'utilisateur n'existe pas dans la Base de Donnée
    if (verifMail) {
      return res.json({ message: "cet email est déjà enregistré" });
    }

    if (!checkPwd.test(req.body.password)) {
      return res.json({
        message:
          "Le mot de passe ne respecte pas les conditions: 8 caractères incluant majuscule, minuscule et caractères spéciaux",
      });
    }

    if (!user) {
      user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        city: req.body.city,
        zip: req.body.zip,
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
      };
    } else {
      user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        city: req.body.city,
        zip: req.body.zip,

        image: [
          {
            src: req.file.filename,
            alt: req.file.originalname,
          },
        ],

        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
      };
    }

    let newUser = new User(user);

    //Notre hook pre, va s'exécuter pour les mots de passe hashe
    await newUser.save();

    res.json({ message: "L'utilisateur est bien enregistré" });
  } catch (err) {
    res.json({
      message: "L'utilisateur n'a pas pu être enregistré",
      err: err,
    });
  }
};

export const LoginSubmit = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        // Création de mon token à la connexion
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          // durée du token
          expiresIn: "24h",
        });

        // /!\ ON NE RENVOIE JAMAIS LE PASSWORD C'EST POUR CELA QUE L ON  DOIT FAIRE LE DETAIL
        res.json({
          id: user._id,
          login: user.login,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          createdAt: user.createdAt,
          token: token,
        });
      } else {
        res.json({
          message: "Mot de passe incorrecte, veuillez revoir votre saisie",
        });
      }
    });
  } else {
    res.json({ message: "L'email renseignée est introuvable" });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    res.json({ message: "Vous êtes bien déconnecté(e)" });
  });
};

export const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.json({ message: "Aucun utilisateur à afficher" });
    } else {
      res.json(users);
    }
  } catch (err) {
    res.json({
      message: "Impossible d'afficher les utilisateurs",
      err: err,
    });
  }
};

export const ValidateUtilisateur = async (req, res) => {
  try {
    let data;

    if (req.body.isValid === true) {
      data = {
        isValid: true,
      };
    } else {
      data = {
        isValid: false,
      };
    }

    await User.updateOne({ _id: req.body.id }, data);
    res.json({ message: "Demande validée" });
  } catch (err) {
    res.json({ message: "Demande non validée", err: err });
  }
};

export const DeleteUtilisateur = async (req, res) => {
  const id = req.params.id;

  try {
    const checkUtilisateur = await User.findById(id);
    if (!checkUtilisateur) {
      return res.json({ message: "Cet utilisateur n'existe pas" });
    }
    await User.deleteOne({ _id: id });
    res.json({ message: "L'utilisateur est bien supprimé" });
  } catch (err) {
    res.json({
      message: "L'utilisateur n'a pas pu être supprimé",
      err: err,
    });
  }
};
