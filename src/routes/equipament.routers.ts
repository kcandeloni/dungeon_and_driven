import express from "express";
import validateToken from "../middlewares/validateToken.middleware.js";
import { validateEquipament, validateUpdateEquipament } from "../middlewares/validadeEquipament.js";
import { createEquipament, listEquipament, deleteEquipament,
  updateEquipament, getEquipamentbyId } from "../controllers/equipament.controllers/equipament.controller.js";

const equipamentRouter = express.Router();

equipamentRouter
  .get("/equipament", listEquipament)
  .get("/equipament/:equipamentId", getEquipamentbyId)
  .post("/forge/equipament",validateToken, validateEquipament, createEquipament)
  .put("/reforge/equipament/:equipamentId",validateToken, validateUpdateEquipament, updateEquipament)
  .delete("/sell/equipament/:equipamentId",validateToken, deleteEquipament);

export default equipamentRouter;