import Besoin from "../models/BesoinSchema.js";

export const AddBesoin = async (req, res) => {

  
  try {
    
    let besoin;
    if (req.body.frequence) {
      besoin = {
        category: req.body.category,

        steps: {
          key: req.body.key,
          description: req.body.description,
          frequence: req.body.frequence,
          niveau: req.body.niveau,
          lieu: req.body.lieu,
        },

        startDate: req.body.startDate,
        endDate: req.body.endDate,
        membre_id: req.body.membre_id,
        presta_id: "",
      };
    } else {
      besoin = {
        category: req.body.category,

        steps: {
          key: req.body.key,
          description: req.body.description,
        },

        startDate: req.body.startDate,
        endDate: req.body.endDate,
        membre_id: req.body.membre_id,
        presta_id: "",
      };
    }
    let newBesoin = new Besoin(besoin);

    await newBesoin.save();
    res.json({
      message:
        "La demande a bien été prise en compte, nous vous recontacterons dans 24 h",
    });
  } catch (err) {
    res.json({
      message:
        "La demande n'a pas été prise en compte, recommencez votre saisie",
      err: err,
    });
  }
};

export const GetAllBesoins = async (req, res) => {
  
  try {

    const besoins = await Besoin.find({});
    
    if (!besoins) {
      return res.json({ message: "Aucun besoin à afficher" });
    } else {
      res.json(besoins);
    }
  } catch (err) {
    res.json({ message: "Impossible d'afficher les besoins", err: err });
  }
};

//Demande des utilisateurs
export const EditBesoin = async (req, res) => {
  const id = req.params.id;
  try {
    let data = {
      category: req.body.category,

      steps: {
        key: req.body.key,
        description: req.body.description,
      },

      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };

    await Besoin.updateOne({ _id: id }, data);
    res.json({ message: "La demande est mise à jour" });
  } catch (err) {
    res.json({
      message: "La demande n'a pas pu être mise à jour",
      err: err,
    });
  }
};

export const ValidateBesoin = async (req, res) => {
  try {
    let data = {
      isValid: req.body.isValid,
      presta_id: req.body.presta_id,
    };
    await Besoin.updateOne({ _id: req.body.id }, data);
    res.json({ message: "La demande est validée" });
  } catch (err) {
    res.json({ message: "La demande n'a pas pu être validée" });
  }
};

// supprimer un besoin
export const DeleteBesoin = async (req, res) => {
  const id = req.params.id;

  try {
    const checkBesoin = await Besoin.findById(id);
    
// lorsqu'il n'y pas de ckeckBesoin message ce "besoin n'existe pas"
    if (!checkBesoin) {
      return res.json({ message: "Ce besoin n'existe pas" });
    }
    await Besoin.deleteOne({ _id: id });
    res.json({ message: "Le besoin est bien supprimé" });
  } catch (err) {
    res.json({
      message: "Le besoin n'a pas pu être supprimé",
      err: err,
    });
  }
};
