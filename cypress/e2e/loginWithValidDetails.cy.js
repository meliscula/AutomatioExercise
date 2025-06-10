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

            // Delete account
            cy.getNavLink('Delete Account').click();

            // Verify account deletion
            cy.getTestData('account-deleted')
                .should('be.visible', { timeout: 10000 });
            cy.contains('p', 'Your account has been permanently deleted!')
                .should('be.visible');
        });
    });
});