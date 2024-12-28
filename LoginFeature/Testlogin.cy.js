/// <reference types="cypress"/>
import loginPage from "../../../POM/OrangeHRM/Login/Login";

describe('Login Feature',() => {
    // User Login with Valid Credentials
      it('User Login with Valid credentials',() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword().type('admin123');
        cy.intercept("GET","**/employees/action-summary").as("actionSummary");
        loginPage.buttonLogin().click();
        cy.wait("@actionSummary").its('response.statusCode').should('eq', 200);
        cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Dashboard')
        });
  
    // User Login with Invalid Credentials
      it('User Login with Invalid Username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Adminn'); 
        loginPage.inputPassword().type('admin1234');
        cy.intercept("GET","**/core/i18n/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait('@messages').its('response.statusCode').should('eq', 304);
        cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');  // Memastikan pesan error tampil
        });
  
    //User Login with Invalid Password
      it('User Login with Invalid Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin'); 
        loginPage.inputPassword().type('user1234');
        cy.intercept("GET","**/core/i18n/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait('@messages').its('response.statusCode').should('eq', 304);
        cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');  // Memastikan pesan error tampil
        });

    //User Login with Invalid Username and Invalid Password
      it('User Login with Invalid Username and Invalid Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Adminn'); 
        loginPage.inputPassword().type('user123456');
        cy.intercept("GET","**/core/i18n/messages").as("messages");
        loginPage.buttonLogin().click();
        cy.wait('@messages').its('response.statusCode').should('eq', 304);
        cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');  
        });
      
    // Users Login without input Username and Password
      it('Users Login without input Username and Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername();
        loginPage.inputPassword();
        loginPage.buttonLogin().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','RequiredRequired');  // Memastikan pesan error tampil
        });
      
    // User Login with Blank Username and input Valid Password  
      it('User Login with Blank Username and input Valid Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername();
        loginPage.inputPassword().type('admin123');
        loginPage.buttonLogin().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
        });
  
    // User Login with Input Valid Username and Blank Password    
      it('User Login with Input Valid Username and Blank Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Admin');
        loginPage.inputPassword();
        loginPage.buttonLogin().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
        });
    
    // User Login with Blank username and Input Invalid password
      it('User Login with Blank username and Input Invalid password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername();
        loginPage.inputPassword().type('admin321');
        loginPage.buttonLogin().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
        });
  
    // User Login with Invalid username and Blank password
      it('User Login with Inalid username and Blank password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        loginPage.textLogin().should('have.text','Login');
        loginPage.inputUsername().type('Adminnd');
        loginPage.inputPassword();
        loginPage.buttonLogin().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
        });
});