const deleteUsers = {
  query: 'mutation {deleteUsers}'
};

const createUser = {
  query:
    'mutation {createUser(username:"username", password:"password"){username}}'
};
const createAdminUser = {
  query: 'mutation {createAdminUser(username:"admin"){username}}'
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
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/graphql/',
        body: createAdminUser
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

    it('Admin page will be opened when logging in as a admin', function() {
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('admin');
      cy.get('[data-cy=password]').type('admin');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_URL') + '/admin');
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
      cy.url().should('eq', Cypress.env('BASE_URL') + '/');
      cy.get('[data-cy=logout]')
        .click()
        .should(() => {
          expect(localStorage.getItem('theme-base-token')).to.be.null;
        });
    });
  });
});
