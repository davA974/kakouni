import mongoose from "mongoose";

let besoinSchema = mongoose.Schema(
  {
    category: String,

    steps: [
      {
        key: Number,
        description: String,
        frequence: String,
        niveau: String,
        lieu: String,
      },
    ],

    startDate: Date,
    endDate: Date,
    isValid: {
      type: Boolean,
      default: false,
    },
    membre_id: String,
    presta_id: String,
  },
  {
    timestamps: true,
  }
);
let Besoin = mongoose.model("Besoin", besoinSchema);

export default Besoin;
