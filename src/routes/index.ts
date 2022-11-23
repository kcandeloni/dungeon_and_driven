import express from "express";
import userRouter from "./user.routes.js";
import equipamentRouter from "./equipament.routers.js";

const router = express.Router();
router
  .use(userRouter)
  .use(equipamentRouter);

export default router;
