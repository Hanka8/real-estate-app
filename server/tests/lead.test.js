import request from "supertest";
import mongoose from "mongoose";
import app from "../dist/index.js"; // Adjust the import path based on your app's location
import Lead from "../dist/models/Lead.js"; // Import the Lead model

// Database connection string for testing
const TEST_DB_URI = "mongodb://localhost:27017/testDB";

// Before running tests, connect to the database
beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    // Only connect if no active connection exists
    await mongoose.connect(TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// After all tests, close the database connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Test suite for creating leads
describe("POST /lead", () => {
  it("should create a new lead", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "byt",
      fullName: "Jane Doe",
      phone: "+420987654321",
      email: "jane.doe@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(201); // Expect status 201 for successful creation
    expect(response.body).toHaveProperty("fullName", "Jane Doe");
    expect(response.body).toHaveProperty("estateType", "byt");
    expect(response.body).toHaveProperty("phone", "+420987654321");
  });

  it("should return error for invalid phone number", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "dům",
      fullName: "John Doe",
      phone: "123", // Invalid phone number
      email: "john.doe@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(400); // Expect 400 status for validation error
    expect(response.body.errors).toContainEqual({
      field: "phone",
      message: "Invalid phone number format.",
    });
  });

  it("should return error for invalid email", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "pozemek",
      fullName: "Alice Example",
      phone: "+420987654321",
      email: "alice.example", // Invalid email
      region: "Prague",
      district: "Central",
    });

    expect(response.status).toBe(400); // Expect 400 status for validation error
    expect(response.body.errors).toContainEqual({
      field: "email",
      message: "Invalid email format.",
    });
  });

  it("should return error for invalid estateType", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "apartment", // Invalid estate type
      fullName: "Bob Example",
      phone: "+420987654321",
      email: "bob@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(400); // Expect 400 status for validation error
    expect(response.body.errors).toContainEqual({
      field: "estateType",
      message: "Estate type must be one of 'byt', 'dům', or 'pozemek'.",
    });
  });

  it("should return error for missing required fields", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "byt",
      fullName: "", // Empty name is invalid
      phone: "+420987654321",
      email: "missing.name@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(400); // Expect 400 status for validation error
    expect(response.body.errors).toContainEqual({
      field: "fullName",
      message: "Name must contain at least 1 character",
    });
  });

  it("should handle server error correctly", async () => {
    // Mock the save method to simulate a database error
    jest
      .spyOn(Lead.prototype, "save")
      .mockRejectedValue(new Error("Database error"));

    const response = await request(app).post("/lead").send({
      estateType: "byt",
      fullName: "Server Error",
      phone: "+420987654321",
      email: "server.error@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(500); // Expect 500 for internal server error
    expect(response.body.error).toBe("Something went wrong. Please try again.");
  });

  it("should prevent XSS attacks", async () => {
    // Send an XSS payload in the fullName field
    const response = await request(app).post("/lead").send({
      estateType: "byt",
      fullName: "<script>alert('XSS Attack')</script>", // XSS payload
      phone: "+420987654321",
      email: "xss@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    // Assert the status is 500, indicating a server error
    expect(response.status).toBe(500);
  });
});
