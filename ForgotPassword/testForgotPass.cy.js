import ForgotPassword from "./forgotpass.cy";

describe('Forgot Your Password Feature',() => {
    // User success Forgot Password with Valid Credentials
    it('User success Forgot Password with Valid Credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        ForgotPassword.buttonForgotPass().click();
        ForgotPassword.textResetPassword().should('have.text','Reset Password');
        cy.url().should('include', '/requestPasswordResetCode'); 
        ForgotPassword.inputUsername().type('Admin');
        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPassword");
        ForgotPassword.bottonResetPassword().click();
        cy.wait('@requestResetPassword').its('response.statusCode').should('eq', 302);
        ForgotPassword.statusResetPassword().should('have.text','Reset Password link sent successfully');
      });
    
    // User reset password with Different Username
    it('User reset password with Different Username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        ForgotPassword.buttonForgotPass().click();
        ForgotPassword.textResetPassword().should('have.text','Reset Password');
        cy.url().should('include', '/requestPasswordResetCode'); 
        ForgotPassword.inputUsername().type('UserAdmin');
        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPassword");
        ForgotPassword.bottonResetPassword().click();
        cy.wait('@requestResetPassword').its('response.statusCode').should('eq', 302);
        ForgotPassword.statusResetPassword().should('have.text','Reset Password link sent successfully');
      });
    
    // User Cancel Reset Password
    it('User Cancel Reset Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        ForgotPassword.buttonForgotPass().click();
        ForgotPassword.textResetPassword().should('have.text','Reset Password');
        cy.url().should('include', '/requestPasswordResetCode'); 
        ForgotPassword.inputUsername().type('Admin');
        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPassword");
        ForgotPassword.buttonCancel().click();
        ForgotPassword.textLogin().should('have.text','Login');

    })

    // 
    it('User Reset Password Without Input Username', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        ForgotPassword.buttonForgotPass().click();
        ForgotPassword.textResetPassword().should('have.text','Reset Password');
        cy.url().should('include', '/requestPasswordResetCode'); 
        ForgotPassword.inputUsername();
        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPassword");
        ForgotPassword.bottonResetPassword().click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');
      });
    
    })
    