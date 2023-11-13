import Avis from "../models/AvisSchema.js";

export const postAvis = async (req, res) => {
  const { avisId, avisInput, senderId, senderName } = req.body;
  
  try {
    const newAvis = new Avis({
      avisId: avisId,
      avis: avisInput,
      senderId: senderId,
      senderName: senderName
    });
    
    const lastAvis = await newAvis.save();
    res.json({
      lastAvis,
      message: "Le commentaire a bien été prise en compte",
    });
  } catch (err) {
    res.json({
      message:
        "Le commentaire n'a pas été prise en compte, recommencez votre saisie",
      err: err,
    });
  }
};

export const getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.find({});

    if (!avis) {
      return res.json({ message: "Aucun avis à afficher" });
    } else {
      res.json(avis);
    }
  } catch (err) {
    res.json({ message: "Impossible d'afficher votre avis", err: err });
  }
};


// supprimer un besoin
export const deleteAvis = async (req, res) => {
  const id = req.params.id;

  try {
    const checkAvis = await Avis.findById(id);
    
// lorsqu'il n'y pas de ckeckAvis message cet "avis n'existe pas"
    if (!checkAvis) {
      return res.json({ message: "Cet avis n'existe pas" });
    }
    await Avis.deleteOne({ _id: id });
    res.json({ message: "L'avis est bien été supprimé" });
  } catch (err) {
    res.json({
      message: "L'avis n'a pas pu être supprimé",
      err: err,
    });
  }
};