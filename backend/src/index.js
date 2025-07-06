import express from "express"
import dotenv from "dotenv"
import authRoutes from"./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
dotenv.config()
const app = express();
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log("Server is runner on port " + PORT)
    connectDB()
})