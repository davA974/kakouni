import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    category: String,
    role: String,

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

// Hook pré sera exécuté avant le save() d'un document, on va hacher le mots de passe avec bcrypt
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

let User = mongoose.model("User", userSchema);

export default User;
