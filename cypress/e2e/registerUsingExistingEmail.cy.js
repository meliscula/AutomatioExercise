/// <reference types="cypress" />
import { ExistingEmail } from "../support/utilities/hooks";

describe('Register Using Existing Email', () => {
    beforeEach(function() {
        ExistingEmail();
    });

    it('should not register a new user', function() {
        cy.fixture('loginData').then((userData) => {

            // Navigate to Signup/Login page
            cy.getByHref('/login').click();
            cy.getByFormAction('/signup').should('be.visible');
            cy.getTestData('signup-name').type(userData.ExistingUser.name);
            cy.getTestData('signup-email').type(userData.ExistingUser.email);
            cy.getTestData('signup-button').click();

            // Verify error message for existing email
            cy.contains('p', 'Email Address already exist!', { timeout: 20000 })
                .should('be.visible')
        });
    });
});