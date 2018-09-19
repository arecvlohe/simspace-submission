/// <reference types="Cypress" />

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should render the correct title", () => {
    cy.title().should("eq", "Dogs!");
  });

  it("should render the header", () => {
    cy.get("[data-cy=header]").should("contain", "Dogs!");
  });

  it("should render active styles for button", () => {
    cy.get("[data-cy=affenpinscher]").as("aff");
    cy.get("@aff").click();
    cy.get("@aff")
      .should("have.css", "background")
      .and(
        "eq",
        "rgba(0, 0, 0, 0) linear-gradient(90deg, rgb(181, 126, 255) 0%, rgb(97, 88, 255) 50%) repeat scroll 0% 0% / auto padding-box border-box"
      );
  });

  it("should filter out buttons", () => {
    cy.get("a").as("buttons");
    cy.get("[data-cy=search]").as("search");
    cy.get("@search").type("african");
    cy.get("@buttons").should("have.length", 1);
  });

  it("pressing / should focus the search input", () => {
    cy.get("[data-cy=search]").as("search");
    cy.get("body").type("/");
    cy.focused().should("have.attr", "placeholder", "Search");
  });
});
