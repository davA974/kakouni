import mongoose from "mongoose";

let avisSchema = mongoose.Schema(
{
  avisId: String,
  avis: String,
  senderId: String,
  senderName: String
},
{
    timestamps: true,
}

)

let Avis = mongoose.model("Avis", avisSchema);

export default Avis;