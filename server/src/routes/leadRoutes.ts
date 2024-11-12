import { Router } from "express";
import { createLead } from "../controllers/leadController";

const router: Router = Router();

// POST endpoint to create a new lead
router.post("/", createLead);

// GET endpoint to check if the server is running
router.get("/", (req, res) => {
    res.send("Server is running, you can post to create a new lead.");
});

export default router;
