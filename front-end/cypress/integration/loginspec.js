describe("Login ", function() {
  it("front page can be opened", function() {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign in");
    cy.get("[data-cy=username]").type("janetta");
    cy.get("[data-cy=password]").type("secret");
    cy.contains("Sign in").click();
    cy.get("[data-cy=signIn]").click();
  });
});
