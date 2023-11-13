import multer from "multer";
import path from "path";

const maxSize = 5242880; // Environ 5 MO

// On configure le storage engine
const storageEngine = multer.diskStorage({
  destination: "./public/",
  filename: (req, file, cb) => {
    cb(null, `img/${Date.now()}-${file.originalname.split(" ").join("_")}`);
  },
});

const checkFileType = (file, cb) => {
  // Autorisation des extensions de fichiers
  const fileTypes = /jpeg|jpg|png|webp/;

  // Vérifie les  nom des extensions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Format de fichier non supporté");
  }
};
// Initialiser multer
const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

export default upload;
