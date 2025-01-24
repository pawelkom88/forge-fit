/// <reference types="cypress" />
import { RoutesConfig } from "../../../src/routing/routes";

describe("Calendar", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
    cy.viewport("macbook-16");
  });

  //add context
  context("header", () => {
    it("should have a icon/link that leads to user profile page", () => {
      const userProfileIconLink = cy.testById("user-profile-link");
      userProfileIconLink.click();
      cy.location("pathname").should("eq", RoutesConfig.userProfile.path);
    });

    it("should have a toggle them icon that changes the theme", () => {
      const modeToggle = cy.testById("mode-toggle");
      modeToggle.click();
      // cy.getByText("Dark").click();
      // cy.get("html").should("have.class", "dark");
    });
  });
});
