const deleteUsers = {
  query: 'mutation {deleteUsers}'
};

describe('Fullstack-theme-base sign up page ', function() {
  describe('Fullstack app sign up', function() {
    describe('Creating a new account', function() {
      it('User can create a new account in sign up page', function() {
        cy.request({
          method: 'POST',
          url: 'http://localhost:4000/graphql/',
          body: deleteUsers
        });
        cy.visit(Cypress.env('BASE_URL') + '/login');
        cy.contains("Don't have an account? Sign Up");
        cy.get('[data-cy=signUp]').click();
        cy.contains('Sign up');
        cy.get('[data-cy=firstName]').type('First name');
        cy.get('[data-cy=lastName]').type('Last name');
        cy.get('[data-cy=email]').type('username');
        cy.get('[data-cy=password]').type('password');
        cy.get('[data-cy=signUp]').click();
        cy.url().should('include', '/login');
      });
    });
    describe('User can log in with created creadentials', function() {
      it('User can create a new account in sign up page', function() {
        cy.visit(Cypress.env('BASE_URL') + '/login');
        cy.contains('Sign in');
        cy.get('[data-cy=username]').type('username');
        cy.get('[data-cy=password]').type('password');
        cy.contains('Sign in').click();
        cy.get('[data-cy=signIn]').click();
        cy.url().should('eq', Cypress.env('BASE_URL') + '/');
      });
    });
    describe('Trying to log in with invalid creadentials', function() {
      it("User can't log in with non-existing credentials", function() {
        cy.visit(Cypress.env('BASE_URL') + '/login');
        cy.contains('Sign in');
        cy.get('[data-cy=username]').type('non-existingUsername');
        cy.get('[data-cy=password]').type('non-existingPassword');
        cy.contains('Sign in').click();
        cy.get('[data-cy=signIn]').click();
        cy.url().should('eq', Cypress.env('BASE_URL') + '/login');
      });
    });
  });
});
