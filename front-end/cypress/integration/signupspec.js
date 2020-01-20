describe('Fullstack user page', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000/login');
    cy.contains('Sign in');
    cy.get('[data-cy=username]').type('test');
    cy.get('[data-cy=password]').type('secret');
    cy.contains('Sign in').click();
    cy.get('[data-cy=signIn]').click();
    cy.contains('Please let us know how you feel');
  });
});
