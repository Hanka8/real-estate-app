"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController_1 = require("../controllers/leadController");
const router = (0, express_1.Router)();
// POST endpoint to create a new lead
router.post("/", leadController_1.createLead);
exports.default = router;
