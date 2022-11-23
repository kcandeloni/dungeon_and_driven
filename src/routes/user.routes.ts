import express from "express";
import { getUser, createUser, singIn, home, healingUser } from "../controllers/users.controllers/user.controller.js";
import validateSignIn from "../middlewares/validateSingIn.middleare.js";
import validateToken from "../middlewares/validateToken.middleware.js";
import valideteUser from '../middlewares/validateUser.middleware.js' 

const userRouter = express.Router();
userRouter
  .get("/user/:id", getUser)
  .post("/signup", valideteUser, createUser)
  .post("/signin", validateSignIn, singIn)
  .get("/", validateToken, home)
  .put("/tavern", validateToken, healingUser);
export default userRouter;
