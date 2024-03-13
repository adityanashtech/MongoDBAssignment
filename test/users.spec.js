const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/users");
const jwt = require('jsonwebtoken');

afterAll(async () => {
  // Clear the User collection before each test
  await User.deleteOne({ email: "testing@gmail.com" });
  // Disconnect from the test database after all tests are done
});

describe("User Routes", () => {
  // Mock user data for testing
  const userData = {
    username: "testuser",
    email: "testing@gmail.com",
    phone: "7878554458",
    password: "Testpassword12",
  };

  const logInData = {
    email: "testing@gmail.com",
    password: "Testpassword12",
  };

  let authToken; // To store the authentication token for future requests

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/signup")
      .send(userData)
      .expect(200);
    authToken = response.body.token;
    expect(response.body).toHaveProperty("message");
  });

  // Test user login
  it("should login with the registered user", async () => {
    const response = await request(app)
      .post("/login")
      .send(logInData)
      .expect(200);
    authToken = response.body.token; // Save the new token for future requests
    expect(response.body).toHaveProperty("message");
  });

  // Test user profile retrieval
  it("should get the user profile with the valid token", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
    response.body.map((user) => {
      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("phone");
    });
  });

  it("should delete a user", async () => {
    // Extract user ID from token
    const userId = jwt.decode(authToken).id;
    // Send DELETE request to delete the user
    const response = await request(app)
      .delete(`/deleteuser/${userId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    // Ensure the response indicates a successful deletion
    expect(response.body).toHaveProperty("email");
  });
});
