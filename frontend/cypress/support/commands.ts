/** @format */

/// <reference types="cypress" />

export type CustomCommands = {
  login(username: string, password: string): Cypress.Chainable<void>;
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/login");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
