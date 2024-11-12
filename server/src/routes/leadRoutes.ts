import { Router } from "express";
import { createLead } from "../controllers/leadController";

const router: Router = Router();

// POST endpoint to create a new lead
router.post("/", createLead);

export default router;
