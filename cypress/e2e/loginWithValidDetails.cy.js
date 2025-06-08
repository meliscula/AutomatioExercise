/// <reference types="cypress" />
import { loginSetup } from "../support/utilities/hooks";
describe('Login with Valid Details Tests', () => {
    beforeEach(function() {
        loginSetup();
    });

    it('should visit Automation Exercise', () => {
        // Verify the homepage is loaded
        cy.get('div[class="logo pull-left"] img').should('be.visible');
    });

    it('should login with valid user details', function() {
        // Navigate to Signup/Login page
        cy.getByHref('/login').click();
        cy.getByFormAction('/login').should('be.visible');
        
        // Fill in login details
        cy.getTestData('login-email').type(this.userData.validUser.email);
        cy.getTestData('login-password').type(this.userData.validUser.password);
        cy.getTestData('login-button').click();

        //verify if user is created successfully and logged in
        cy.getNavLink('Logged in as').should('contain', this.userData.validUser.name);

        //delete the user account
        cy.getNavLink('Delete Account').click();

        //verify if account deletion is successful
        cy.getTestData('account-deleted').should('be.visible')
        cy.contains('p', 'Your account has been permanently deleted!').should('be.visible');

    });

});