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
const zod_1 = require("zod"); // validation
const xss_1 = __importDefault(require("xss")); // sanitization
// Define a Zod schema for lead input validation
const leadSchema = zod_1.z.object({
    estateType: zod_1.z.enum(["byt", "dům", "pozemek"], {
        errorMap: () => ({
            message: "Estate type must be one of 'byt', 'dům', or 'pozemek'.",
        }),
    }),
    fullName: zod_1.z
        .string()
        .min(1, "Name must contain at least 1 character")
        .max(100, "Name is too long."),
    phone: zod_1.z.string().regex(/^\+420\d{9}$/, "Invalid phone number format."),
    email: zod_1.z
        .string()
        .email("Invalid email format.")
        .max(100, "Email is too long."),
    region: zod_1.z
        .string()
        .min(1, "Region must contain at least 1 character")
        .max(100, "Region is too long."),
    district: zod_1.z
        .string()
        .min(1, "Region must contain at least 1 character")
        .max(100, "District is too long.")
});
// Create Lead
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Sanitize inputs before validation to prevent XSS
    const sanitizedData = {
        estateType: (0, xss_1.default)(req.body.estateType),
        fullName: (0, xss_1.default)(req.body.fullName),
        phone: (0, xss_1.default)(req.body.phone),
        email: (0, xss_1.default)(req.body.email),
        region: (0, xss_1.default)(req.body.region),
        district: (0, xss_1.default)(req.body.district),
    };
    // Validate request body using the leadSchema (safeParse doesn't throw an error)
    // containing either the successfully parsed data or a ZodError instance containing detailed information about the validation problems
    const validationResult = leadSchema.safeParse(sanitizedData);
    if (!validationResult.success) {
        // Extract and send validation errors
        const errors = validationResult.error.issues.map((issue) => {
            return {
                field: issue.path.join("."),
                message: issue.message,
            };
        });
        console.log(errors);
        return res.status(400).json({ errors });
    }
    let { estateType, fullName, phone, email, region, district } = validationResult.data;
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
        console.error(error);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});
exports.createLead = createLead;
