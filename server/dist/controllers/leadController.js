"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
// Create Lead
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estateType, fullName, phone, email, region, district } = req.body;
    // Basic validation for email and phone (you can enhance this further)
    const phoneRegex = /^\d{9}$/; // Validates Czech phone numbers
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // very basic validation for phone and email - enhance it further
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number format." });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }
    try {
        // Create a new Lead document in the database
        const newLead = new Lead_1.default({
            estateType,
            fullName,
            phone,
            email,
            region,
            district,
        });
        // Save it to the database
        yield newLead.save();
        // Send success response
        res.status(201).json(newLead);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});
exports.createLead = createLead;
