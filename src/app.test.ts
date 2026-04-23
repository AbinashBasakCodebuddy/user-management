import request from "supertest";
import app from "./app";

describe("App", () => {
  describe("GET /api/user", () => {
    it("should return a list of users", async () => {
      const response = await request(app).get("/api/user").expect(200);

      expect(response.body.message).toBe("Users retrieved successfully");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("POST /api/user", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
      };

      const response = await request(app)
        .post("/api/user")
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe("User created successfully");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
    });

    it("should return 409 for duplicate email", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
      };

      // Try to create duplicate
      const response = await request(app)
        .post("/api/user")
        .send(userData)
        .expect(409);

      expect(response.body.message).toBe("User with this email already exists");
    });

    it("should return 400 for invalid data", async () => {
      const invalidData = {
        name: "J",
        email: "invalid-email",
      };

      await request(app).post("/api/user").send(invalidData).expect(400);
    });
  });

  describe("GET /api/user/:id", () => {
    it("should return a user by id", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane2@example.com",
      };

      const createResponse = await request(app)
        .post("/api/user")
        .send(userData)
        .expect(201);

      const userId = createResponse.body.data.id;

      const response = await request(app)
        .get(`/api/user/${userId}`)
        .expect(200);

      expect(response.body.message).toBe("User retrieved successfully");
      expect(response.body.data.id).toBe(userId);
      expect(response.body.data.name).toBe(userData.name);
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app).get("/api/user/999").expect(404);

      expect(response.body.message).toBe("User not found");
    });
  });

  describe("PUT /api/user/:id", () => {
    it("should update an existing user", async () => {
      const userData = {
        name: "Jane Doe",
        email: "jane3@example.com",
      };

      const createResponse = await request(app)
        .post("/api/user")
        .send(userData)
        .expect(201);

      const userId = createResponse.body.data.id;
      const updateData = {
        name: "Jane Smith",
      };

      const response = await request(app)
        .put(`/api/user/${userId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe("User updated successfully");
      expect(response.body.data.name).toBe(updateData.name);
    });

    it("should return 404 for updating non-existent user", async () => {
      const updateData = {
        name: "Updated Name",
      };

      const response = await request(app)
        .put("/api/user/999")
        .send(updateData)
        .expect(404);

      expect(response.body.message).toBe("User not found");
    });
  });

  describe("DELETE /api/user/:id", () => {
    it("should delete an existing user", async () => {
      const userData = {
        name: "Delete Me",
        email: "delete@example.com",
      };

      const createResponse = await request(app)
        .post("/api/user")
        .send(userData)
        .expect(201);

      const userId = createResponse.body.data.id;

      const response = await request(app)
        .delete(`/api/user/${userId}`)
        .expect(200);

      expect(response.body.message).toBe("User deleted successfully");

      // Verify user is deleted
      await request(app).get(`/api/user/${userId}`).expect(404);
    });

    it("should return 404 for deleting non-existent user", async () => {
      const response = await request(app).delete("/api/user/999").expect(404);

      expect(response.body.message).toBe("User not found");
    });
  });
});
