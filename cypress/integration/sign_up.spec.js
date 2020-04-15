const resetDatabase = {
  query: "mutation {resetDatabase}",
};
describe("Creating a new account:", function () {
  it("User can create a new account in sign up page", function () {
    cy.request({
      method: "POST",
      url: Cypress.env("BASE_SERVER_URL") + "/graphql/",
      body: resetDatabase,
    });
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.get("[data-cy=create]").click();
    cy.contains("Sign up");
    cy.get("[data-cy=firstName]").type("First name");
    cy.get("[data-cy=lastName]").type("Last name");
    cy.get("[data-cy=email]").type("username@gmail.com");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=signUp]").click();
    //cy.url().should("include", "/login");
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/login");
  });
});
describe("Logging in to the application", function () {
  it("User can log in with created creadentials", function () {
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("username@gmail.com");
    cy.get("[data-cy=password]").type("password");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]").click();
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/");
  });
});
describe("Trying to log in with invalid credentials", function () {
  it("User can't log in with non-existing credentials", function () {
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("non-existingUsername@gmail.com");
    cy.get("[data-cy=password]").type("non-existingPassword");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]").click();
    cy.contains("*The username or password you entered is incorrect.");
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/login");
  });
});
