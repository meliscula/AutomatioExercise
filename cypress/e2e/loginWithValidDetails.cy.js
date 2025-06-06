/// <reference types="cypress" />

describe('Login with Valid Details Tests', () => {
    beforeEach(() => {
        // Clear cookies and localStorage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should visit Automation Exercise', () => {
        // Verify the homepage is loaded
        cy.get('div[class="logo pull-left"] img').should('be.visible');
    });

    it('should login with valid user details', () => {
        // Navigate to Signup/Login page
        cy.get('a[href="/login"]').click();
        cy.get('form[action="/login"]').should('be.visible');
        
        // Fill in login details
        cy.get('[data-qa="login-email"]').type('gwen5@yahoo.com');
        cy.get('[data-qa="login-password"]').type('password123');
        cy.get('[data-qa="login-button"]').click();

        //verify if user is created successfully and logged in
        cy.get('li a').contains('Logged in as').should('contain', 'John Doe');

        //delete the user account
        cy.get('li a').contains('Delete Account').click();

        //verify if account deletion is successful
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.contains('p', 'Your account has been permanently deleted!').should('be.visible');

    })

})
