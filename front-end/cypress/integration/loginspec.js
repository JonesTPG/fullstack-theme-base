const deleteUsers = {
  query: 'mutation {deleteUsers}'
};

const createUser = {
  query:
    'mutation {createUser(username:"username", password:"password"){username}}'
};

describe('Fullstack-theme-base ', function() {
  describe('Fullstack app login', function() {
    beforeEach(function() {
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/graphql/',
        body: deleteUsers
      });
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/graphql/',
        body: createUser
      });
    });

    it("User can't login with invalid credentials", function() {
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('InvalidUsername');
      cy.get('[data-cy=password]').type('InvalidPassword');
      cy.contains('Sign in');
      cy.get('[data-cy=signIn]').click();
      cy.contains('*The username or password you entered is incorrect.');
    });

    it('Front page can be opened', function() {
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('username');
      cy.get('[data-cy=password]').type('password');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_URL') + '/');
    });
    it('Theme-base-token can be found in local storage after login', function() {
      cy.clearLocalStorage('theme-base-token');
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('username');
      cy.get('[data-cy=password]').type('password');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]')
        .click()
        .should(() => {
          expect(localStorage.getItem('theme-base-token')).to.include('ey');
        });
    });
    it('Theme-base-token will be deleted after logout', function() {
      cy.clearLocalStorage('theme-base-token');
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('username');
      cy.get('[data-cy=password]').type('password');
      cy.get('[data-cy=signIn]').click();
      cy.contains('Please let us know how you feel');
      cy.get('[data-cy=logout]')
        .click()
        .should(() => {
          expect(localStorage.getItem('theme-base-token')).to.be.null;
        });
    });
  });
});
