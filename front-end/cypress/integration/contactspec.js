const resetDatabase = {
  query: 'mutation {resetDatabase}'
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
        body: resetDatabase
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

    it('Front page can be opened', function() {
      cy.visit(Cypress.env('BASE_URL') + '/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('username');
      cy.get('[data-cy=password]').type('password');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.url().should('eq', Cypress.env('BASE_URL') + '/');
    });

    it('After success login user can navigate to Contact Us -page and leave a contact request', function() {
      cy.get('[data-cy=menu]').click();
      cy.get('[data-cy=contactUs]').click();
      cy.contains('Please leave a message');
      cy.get('[data-cy=firstName]').type('Magic');
      cy.get('[data-cy=lastName]').type('Mike');
      cy.get('[data-cy=email]').type('magic.mike@gmail.com');
      cy.get('[data-cy=phone]').type('0508054331');
      cy.get('[data-cy=company]').type('XLL');
      cy.get('[data-cy=message]').type(
        'What’s the best Wi-Fi name you’ve seen?'
      );
      cy.get('[data-cy=send]').click();
      cy.url().should('eq', Cypress.env('BASE_URL') + '/');
    });
    /*     it('Theme-base-token can be found in local storage after login', function() {
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
    }); */
    /*     it('Theme-base-token will be deleted after logout', function() {
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
    }); */
  });
});
