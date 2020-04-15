const resetDatabase = {
  query: "mutation {resetDatabase}",
};

const createUser = {
  query:
    'mutation {createUser(username:"username@gmail.com", password:"password"){username}}',
};
const createAdminUser = {
  query: 'mutation {createAdminUser(username:"admin@gmail.com"){username}}',
};

describe("Full-stack-theme-base login:", function () {
  beforeEach(function () {
    cy.request({
      method: "POST",
      url: Cypress.env("BASE_SERVER_URL") + "/graphql/",
      body: resetDatabase,
    });
    cy.request({
      method: "POST",
      url: Cypress.env("BASE_SERVER_URL") + "/graphql/",
      body: createUser,
    });
    cy.request({
      method: "POST",
      url: Cypress.env("BASE_SERVER_URL") + "/graphql/",
      body: createAdminUser,
    });
  });

  it("User can't login with invalid credentials:", function () {
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("innvalidEmail@gmail.com");
    cy.get("[data-cy=password]").type("InvalidPassword");
    cy.contains("Sign in");
    cy.get("[data-cy=signIn]").click();
    cy.contains("*The username or password you entered is incorrect.");
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/login");
  });

  it("Front page can be opened", function () {
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("username@gmail.com");
    cy.get("[data-cy=password]").type("password");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]").click();
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/");
  });

  it("Theme-base-token can be found in local storage after login", function () {
    cy.clearLocalStorage("theme-base-token");
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("username@gmail.com");
    cy.get("[data-cy=password]").type("password");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]")
      .click()
      .should(() => {
        expect(localStorage.getItem("theme-base-token")).to.include("ey");
      });
  });
  it("Theme-base-token will be deleted after logout", function () {
    cy.clearLocalStorage("theme-base-token");
    cy.visit(Cypress.env("BASE_REACT_URL") + "/login");
    cy.contains("Sign in");
    cy.get("[data-cy=email]").type("username@gmail.com");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=signIn]").click();
    cy.url().should("eq", Cypress.env("BASE_REACT_URL") + "/");
    cy.get("[data-cy=logout]")
      .click()
      .should(() => {
        expect(localStorage.getItem("theme-base-token")).to.be.null;
      });
  });
});
