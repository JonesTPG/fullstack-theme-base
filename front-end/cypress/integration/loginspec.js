describe("Login ", function() {
  it("front page can be opened", function() {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign in");
  });
});
