describe('Fullstack-theme-base ', function() {
  describe('Fullstack app login as a admin', function() {
    it('Admin page will be opened when logging in as a admin', function() {
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('admintest');
      cy.get('[data-cy=password]').type('admin');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_URL') + '/admin');
    });
  });
});
