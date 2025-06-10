/// <reference types="cypress" />
import { loginSetup } from "../support/utilities/hooks";
describe('Login with Incorrect Password Tests', () => {
    beforeEach(function() {
        loginSetup();
    });

    it('should visit Automation Exercise', () => {
        // Verify the homepage is loaded
        cy.get('div[class="logo pull-left"]').find('img').should('be.visible');
    });

    it('should login with incorrect password', function() {
        cy.get('@userData').then((userData) => {
        // Navigate to Signup/Login page
        cy.getByHref('/login').click();
        cy.getByFormAction('/login').should('be.visible');
        
        // Fill in login details with incorrect password
        cy.getTestData('login-email').type(userData.invalidUser.email);
        cy.getTestData('login-password').type(userData.invalidUser.password);
        cy.getTestData('login-button').click();

        // Verify error message for incorrect password
        cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
        });
    });
});