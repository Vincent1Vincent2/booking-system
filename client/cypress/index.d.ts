declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username, password): Chainable<any>;
  }
}
