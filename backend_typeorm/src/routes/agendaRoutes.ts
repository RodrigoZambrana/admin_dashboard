import { Router } from "express";
import {
  getAllAgenda,
  addAgenda,
  updateAgenda,
  deleteAgenda,
} from "../controller/agendaController";

const router = Router();

//get all events
router.post("/events", getAllAgenda);

//add a event
router.post("/events/crud", addAgenda);

//update a event
router.post("/events/update", updateAgenda);

//delete a event
router.post("/events/delete", deleteAgenda);

export default router;
