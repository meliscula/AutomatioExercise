/// <reference types="cypress" />
import { loginSetup } from "../support/utilities/hooks";

describe('Login with Valid Details Tests', () => {
    beforeEach(function() {
        loginSetup();
    });

    it('should login with valid user details', function() {
        cy.fixture('loginData').then((userData) => {
            // Navigate to Signup/Login page
            cy.getByHref('/login').click();
            cy.getByFormAction('/login').should('be.visible');
            
            // Fill in login details
            cy.getTestData('login-email')
                .should('be.visible')
                .type(userData.validUser.email);

            cy.getTestData('login-password')
                .should('be.visible')
                .type(userData.validUser.password);
            cy.getTestData('login-button').click();

            // Verify login
            cy.contains('ul', 'Logged in as', { timeout: 20000 })
                .should('be.visible')
                .and('contain', userData.validUser.name);
        });

    it('should allow user to logout', function() {
            cy.contains('ul', 'logout').click();
            cy.url('/login').should('be.visible');
        });
    });
});