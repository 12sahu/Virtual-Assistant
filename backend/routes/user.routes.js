import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, updateAssistant } from "../controllers/user.controllers.js"; // ✅ Controller
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// Protected route
userRouter.get("/current",isAuth, getCurrentUser);
userRouter.post("/update",isAuth,upload.single("assistantImage"), updateAssistant);
export default userRouter;
