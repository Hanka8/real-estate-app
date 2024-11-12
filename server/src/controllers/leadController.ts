import { Request, Response } from "express";
import Lead from "../models/Lead";
import { z } from "zod"; // validation
import xss from "xss"; // sanitization

// Define a Zod schema for lead input validation
const leadSchema = z.object({
  estateType: z.enum(["byt", "dům", "pozemek"], {
    errorMap: () => ({
      message: "Estate type must be one of 'byt', 'dům', or 'pozemek'.",
    }),
  }),
  fullName: z
    .string()
    .min(1, "Name must contain at least 1 character")
    .max(100, "Name is too long."),
 
  phone: z.string().regex(/^\+420\d{9}$/, "Invalid phone number format."),
  email: z
    .string()
    .email("Invalid email format.")
    .max(100, "Email is too long."),
  region: z
    .string()
    .min(1, "Region must contain at least 1 character")
    .max(100, "Region is too long."),

  district: z
    .string()
    .min(1, "Region must contain at least 1 character")
    .max(100, "District is too long.")
   
});

// Create Lead
export const createLead = async (req: Request, res: Response) => {
  // Sanitize inputs before validation to prevent XSS
  const sanitizedData = {
    estateType: xss(req.body.estateType),
    fullName: xss(req.body.fullName),
    phone: xss(req.body.phone),
    email: xss(req.body.email),
    region: xss(req.body.region),
    district: xss(req.body.district),
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

  let { estateType, fullName, phone, email, region, district } =
    validationResult.data;

  try {
    // Create a new Lead document in the database
    const newLead = new Lead({
      estateType,
      fullName,
      phone,
      email,
      region,
      district,
    });

    // Save it to the database
    await newLead.save();

    // Send success response
    res.status(201).json(newLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
