/// <reference types="cypress" />

describe("Calendar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/app");
    cy.viewport("macbook-16");
  });

  //add context
  context("header", () => {
    it("should have a icon/link that leads to user profile page", () => {
      const userProfileIconLink = cy.testById("user-profile-link");
      userProfileIconLink.click();
      cy.location("pathname").should("eq", "/user-profile");
    });

    it("should have a toggle them icon that changes the theme", () => {
      cy.testById("mode-toggle").click();
      cy.testById("mode-toggle-light").click();
      cy.get("html").should("have.class", "light");

      // Break up the chain for the dark mode toggle
      cy.testById("mode-toggle-dark").as("darkModeToggle");
      cy.get("@darkModeToggle").click();

      cy.get("html").should("have.class", "dark");
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

    it("should show today's date with the right background color", () => {
      const today = new Date().toISOString().split("T")[0];
      cy.get(`[data-date="${today}"]`).should("have.class", "bg-teriary");
    });

    // TODO: wait for supabase to be set up
    // it.only("should show workout dates with right background colors", () => {
    //   // mock api call
    //   cy.intercept("GET", "/workouts").as("getWorkouts");
    //   cy.wait("@getWorkouts");
    // });
  });
});
