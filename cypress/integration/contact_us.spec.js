const resetDatabase = {
  query: 'mutation {resetDatabase}'
};

const createUser = {
  query:
    'mutation {createUser(username:"username@gmail.com", password:"password"){username}}'
};
const createAdminUser = {
  query: 'mutation {createAdminUser(username:"admin"){username}}'
};

describe('Fullstack-theme-base:', function() {
  describe('Fullstack app login', function() {
    beforeEach(function() {
      cy.request({
        method: 'POST',
        url: Cypress.env('BASE_SERVER_URL') + '/graphql/',
        body: resetDatabase
      });
      cy.request({
        method: 'POST',
        url: Cypress.env('BASE_SERVER_URL') + '/graphql/',
        body: createUser
      });
      cy.request({
        method: 'POST',
        url: Cypress.env('BASE_SERVER_URL') + '/graphql/',
        body: createAdminUser
      });
    });

    it('Front page can be opened', function() {
      cy.visit(Cypress.env('BASE_REACT_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=email]').type('username@gmail.com');
      cy.get('[data-cy=password]').type('password');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_REACT_URL') + '/');
    });

    it('After success login user can navigate to Contact Us -page and leave a contact request', function() {
      cy.get('[data-cy=menu]').click();
      cy.get('[data-cy=contactUs]').click();
      cy.contains('Please leave a message');
      cy.get('[data-cy=firstName]').type('First name');
      cy.get('[data-cy=lastName]').type('Last name');
      cy.get('[data-cy=email]').type('test.user@gmail.com');
      cy.get('[data-cy=phone]').type('0508054331');
      cy.get('[data-cy=company]').type('test');
      cy.get('[data-cy=message]').type(
        'What’s the best Wi-Fi name you’ve seen?'
      );
      cy.get('[data-cy=send]').click();
      cy.url().should('eq', Cypress.env('BASE_REACT_URL') + '/');
    });
    it('Theme-base-token can be found in local storage after login', function() {
      cy.clearLocalStorage('theme-base-token');
      cy.visit(Cypress.env('BASE_REACT_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=email]').type('username@gmail.com');
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
      cy.visit(Cypress.env('BASE_REACT_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=email]').type('username@gmail.com');
      cy.get('[data-cy=password]').type('password');
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_REACT_URL') + '/');
      cy.get('[data-cy=logout]')
        .click()
        .should(() => {
          expect(localStorage.getItem('theme-base-token')).to.be.null;
        });
    });
  });
});
