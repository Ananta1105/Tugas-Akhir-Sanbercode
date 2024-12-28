export default class ForgotPassword {
    static textLogin() {
        return cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title');
    }

    static buttonForgotPass () {
        return cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]');
    }

    static textResetPassword() {
        return cy.get('h6').contains('Reset Password');
    }

    static inputUsername (){
        return cy.get('[name="username"]');
    }  
    
    static bottonResetPassword() {
        return cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]');
    }

    static statusResetPassword() {
        return cy.get('h6').contains('Reset Password link sent successfully')
    }

    static buttonCancel(){
        return cy.get('[type="button"]');
    }
}