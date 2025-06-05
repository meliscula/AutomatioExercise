/// <reference types="cypress" />

describe('Register User Tests', () =>{

    beforeEach(() => {
        // Clear cookies and localStorage before each test
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should visit Automation Exercise', () => {

        //verify the homepage is loaded
        cy.get('div[class="logo pull-left"] img').should('be.visible');
        
    });

    it('should register a new user', () => {

        //navigate to Signup/Login page
        cy.get('a[href="/login"]').click();
        cy.get('form[action="/signup"]').should('be.visible');
        cy.get('[data-qa="signup-name"]').type('John Doe');
        cy.get('[data-qa="signup-email"]').type('gwen5@yahoo.com');
        cy.get('[data-qa="signup-button"]').click();
        cy.get('h2[class="title text-center"]').should('be.visible');  
        
        //fill in user details
        cy.get('#id_gender1').check();
        cy.get('#password').type('password123');
        cy.get('#days').select('14');
        cy.get('#months').select('March');
        cy.get('#years').select('1990');
        cy.get('#newsletter').check();
        cy.get('#optin').check();
        cy.get('#first_name').type('John');
        cy.get('#last_name').type('Doe');
        cy.get('#company').type('Test Company');
        cy.get('#address1').type('123 Test St');
        cy.get('#address2').type('Apt 4B');
        cy.get('#country').select('United States');
        cy.get('#state').type('California');
        cy.get('#city').type('Los Angeles');
        cy.get('#zipcode').type('90001');
        cy.get('#mobile_number').type('1234567890');
        cy.get('[data-qa="create-account"]').click();
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.contains('p', 'Congratulations! Your new account has been successfully created!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

        //verify if user is created successfully and logged in
        cy.get('li a').contains('Logged in as').should('contain', 'John Doe');

        //delete the user account
        cy.get('li a').contains('Delete Account').click();

        //verify if account deletion is successful
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.contains('p', 'Your account has been permanently deleted!').should('be.visible');

        //verify user is logged out
        cy.get('[data-qa="continue-button"]').click();
        cy.get('div[class="logo pull-left"] img').should('be.visible');
    })

})