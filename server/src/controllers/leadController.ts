import { Request, Response } from "express";
import Lead from "../models/Lead";

// Create Lead
export const createLead = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
