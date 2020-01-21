const deleteUsers = {
  query: 'mutation {deleteUsers}'
};

const createUser = {
  query: 'mutation {createUser(username:"test"){username}}'
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
      cy.visit('http://localhost:3000/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('Username');
      cy.get('[data-cy=password]').type('Password');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.contains('*The username or password you entered is incorrect.');
    });

    it('Front page can be opened', function() {
      cy.visit('http://localhost:3000/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('test');
      cy.get('[data-cy=password]').type('secret');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]').click();
      cy.contains('Please let us know how you feel');
    });
    it('Theme-base-token can be found in local storage after login', function() {
      cy.clearLocalStorage('theme-base-token');
      cy.visit('http://localhost:3000/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('test');
      cy.get('[data-cy=password]').type('secret');
      cy.contains('Sign in').click();
      cy.get('[data-cy=signIn]')
        .click()
        .should(() => {
          expect(localStorage.getItem('theme-base-token')).to.include('ey');
        });
    });
    it('Theme-base-token will be deleted after logout', function() {
      cy.clearLocalStorage('theme-base-token');
      cy.visit('http://localhost:3000/login');
      cy.contains('Sign in');
      cy.get('[data-cy=username]').type('test');
      cy.get('[data-cy=password]').type('secret');
      cy.get('[data-cy=signIn]').click();
      cy.contains('Please let us know how you feel');
      cy.get('[data-cy=logout]')
        .click()
        .should(() => {
          console.log(localStorage.getItem('theme-base-token'));
          expect(localStorage.getItem('theme-base-token')).to.be.null;
        });
    });
  });
});
