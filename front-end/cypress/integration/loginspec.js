const deleteUsers = {
  query: "mutation {deleteUsers}"
};

const createUser = {
  query: 'mutation {createUser(username:"test"){username}}'
};

describe("Fullstack-theme-base ", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  describe("Fullstack app", function() {
    beforeEach(function() {
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql/",
        body: deleteUsers
      });
      cy.request({
        method: "POST",
        url: "http://localhost:4000/graphql/",
        body: createUser
      });
      cy.visit("http://localhost:3000/login");
      cy.contains("Sign in");
      cy.get("[data-cy=username]").type("test");
      cy.get("[data-cy=password]").type("secret");
      cy.contains("Sign in").click();
      cy.get("[data-cy=signIn]").click();
    });

    it("User can't login with invalid credentials", function() {
      cy.visit("http://localhost:3000/login");
      cy.contains("Sign in");
      cy.get("[data-cy=username]").type("Username");
      cy.get("[data-cy=password]").type("Password");
      cy.contains("Sign in").click();
      cy.get("[data-cy=signIn]").click();
      cy.contains("*The username or password you entered is incorrect.");
    });

    it("Front page can be opened", function() {
      cy.contains("Please let us know how you feel");
    });
  });
});

/* describe("Fullstack-theme-base ", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
describe("Fullstack App ", function() {
   beforeEach(function() {
  cy.request({
    url: "http://localhost/graphql/", 
    body: { deleteUsers }, 
    failOnStatusCode: false 
  )
    cy.request({
    url: "http://localhost/graphql/", 
    body: { createUser }, 
    failOnStatusCode: false 
  )

  it("front page can be opened", function() {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign in");
    cy.get("[data-cy=username]").type("janetta");
    cy.get("[data-cy=password]").type("secret");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]").click();
  });
}});
 */
