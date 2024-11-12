import mongoose, { Schema, Document } from "mongoose";

// Define interface for Lead document 
interface ILead extends Document {
  estateType: "byt" | "dům" | "pozemek";
  fullName: string;
  phone: string;
  email: string;
  region: string;
  district: string;
}

// Define the schema
const leadSchema: Schema = new Schema({
  estateType: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
});

// Create the model
const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;
