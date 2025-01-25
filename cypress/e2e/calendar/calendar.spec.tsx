/// <reference types="cypress" />
// @ts-expect-error mismatch
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

    it.only("should have a toggle them icon that changes the theme", () => {
      const modeToggle = cy.testById("mode-toggle");
      modeToggle.click();
      // cy.get("menuitem").click();
      // cy.get("html").should("have.class", "dark");
    });
  });

  context("body", () => {
    it("navigate buttons should correctly navigate to other months", () => {
      const getMonthName = (date: Date): string =>
        date.toLocaleString("default", { month: "long" });

      const currentMonth = getMonthName(new Date());
      const oneMonthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
      const nextMonth = getMonthName(
        new Date(Date.now() + oneMonthInMilliseconds),
      );
      const prevMonth = getMonthName(
        new Date(Date.now() - oneMonthInMilliseconds),
      );

      const previousMonthBtn = cy.testById("previous-month");
      const nextMonthBtn = cy.testById("next-month");

      cy.testById("calendar-heading").should("contain", currentMonth);

      nextMonthBtn.click();
      cy.testById("calendar-heading").should("contain", nextMonth);

      previousMonthBtn.click();
      cy.testById("calendar-heading").should("contain", currentMonth);

      previousMonthBtn.click();
      cy.testById("calendar-heading").should("contain", prevMonth);
    });
  });
});
