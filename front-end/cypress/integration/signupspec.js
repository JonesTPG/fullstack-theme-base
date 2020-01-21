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
        cy.visit('http://localhost:3000/login');
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
        cy.visit('http://localhost:3000/login');
        cy.contains('Sign in');
        cy.get('[data-cy=username]').type('username');
        cy.get('[data-cy=password]').type('password');
        cy.contains('Sign in').click();
        cy.get('[data-cy=signIn]').click();
        cy.contains('know how you feel');
      });
    });
  });
});
