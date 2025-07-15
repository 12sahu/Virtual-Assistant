import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"

dotenv.config()

const app = express()

// ✅ Correct CORS setup
app.use(cors({
  origin: "http://localhost:5173", // ✅ use http not https
  credentials: true
}))

// ✅ Middleware
app.use(express.json())
app.use(cookieParser())

// ✅ Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

// ✅ Server setup
const port = process.env.PORT || 5000
app.listen(port, () => {
  connectDb()
  console.log(`Server started on port ${port}`)
})
