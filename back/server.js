import express from "express"
import cors from "cors"
import { connectDB } from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import besoinRouter from "./routes/besoinRoute.js";
import avisRouter from "./routes/avisRoute.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

connectDB

app.use("/", userRouter)
app.use("/", besoinRouter)
app.use("/", avisRouter)

app.listen( process.env.PORT || 5800, () => {
    console.log(`Le serveur est exécuté sur ${process.env.HOST}${process.env.PORT}`);
} )