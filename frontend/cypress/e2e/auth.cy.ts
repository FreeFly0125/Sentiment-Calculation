/** @format */

describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow a user to sign up", () => {
    cy.visit("/signup");
    cy.get('input[placeholder="Username"]').type("testuser");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.get('input[placeholder="Confirm Password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Assert successful signup redirect
    cy.url().should("include", "/signin");
  });

  it("should allow a user to login", () => {
    cy.visit("/signin");
    cy.get('input[placeholder="Username"]').type("testuser");
    cy.get('input[placeholder="Password"]').type("password123");
    cy.get('button[type="submit"]').click();

    // Assert successful login redirect for regular user
    cy.url().should("include", "/dashboard");
  });

  it("should show error message with invalid credentials", () => {
    cy.visit("/signin");
    cy.get('input[placeholder="Username"]').type("wronguser");
    cy.get('input[placeholder="Password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();

    // Assert error message appears
    cy.get(".bg-red-100").should("contain", "Invalid credentials");
  });
});
