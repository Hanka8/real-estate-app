import request from "supertest";
import app from "../dist/index.js";

describe("POST /lead", () => {
  it("should create a new lead", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "Apartment",
      fullName: "Jane Doe",
      phone: "987654321",
      email: "jane.doe@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(201); // Check if the status code is 201
    expect(response.body.fullName).toBe("Jane Doe"); // Check if the response has the correct name
  });

  it("should return error for invalid phone", async () => {
    const response = await request(app).post("/lead").send({
      estateType: "Apartment",
      fullName: "Jane Doe",
      phone: "123", // Invalid phone number
      email: "jane.doe@example.com",
      region: "Brno",
      district: "Brno 2",
    });

    expect(response.status).toBe(400); // Expect 400 Bad Request for invalid data
    expect(response.body.error).toBe("Invalid phone number format.");
  });
});
