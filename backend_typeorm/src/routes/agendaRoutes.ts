import { Router } from "express";
import { getAllAgenda, addAgenda } from "../controller/agendaController";

const router = Router();

//get all events
router.post("/events", getAllAgenda);

//add a event
router.post("/events/crud", addAgenda);

export default router;
