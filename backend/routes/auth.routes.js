import express from "express";
import { Login, logOut, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

// ✅ Correct route for sign up
authRouter.post("/signup", signUp);

// ✅ Correct route for sign in (was missing before)
authRouter.post("/signin", Login);

// ✅ Logout route
authRouter.get("/logout", logOut);

export default authRouter;
