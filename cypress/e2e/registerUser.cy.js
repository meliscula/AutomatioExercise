/// <reference types="cypress" />
import { loginSetup, registrationSetup } from "../support/utilities/hooks";
describe('Register User Tests', () =>{

    beforeEach(function() {
        registrationSetup();
    });

    it('should visit Automation Exercise', () => {

        //verify the homepage is loaded
        cy.get('div[class="logo pull-left"]').find('img').should('be.visible');
        
    });

    it('should register a new user', function() {

        //navigate to Signup/Login page
        cy.getByHref('/login').click();
        cy.getByFormAction('/signup').should('be.visible');
        cy.getTestData('signup-name').type(this.registrationSetup.validUser.name);
        cy.getTestData('signup-password').type(this.registrationSetup.validUser.password);
        cy.getTestData('signup-email').type(this.registrationSetup.validUser.email);
        cy.getTestData('signup-button').click();
        cy.getByTagAndClass('h2', 'title text-center').should('be.visible');  
        
        //fill in user details
        cy.getById('#id_gender1').check();
        cy.getById('#password').type(this.registrationSetup.registrationData.password);
        cy.getById('#days').select('14');
        cy.getById('#months').select('March');
        cy.getById('#years').select('1990');
        cy.getById('#newsletter').check();
        cy.getById('#optin').check();
        cy.getById('#first_name').type(this.registrationSetup.registrationData.firstName);
        cy.getById('#last_name').type(this.registrationSetup.registrationData.lastName);
        cy.getById('#company').type(this.registrationSetup.registrationData.company);
        cy.getById('#address1').type(this.registrationSetup.registrationData.address);
        cy.getById('#address2').type(this.registrationSetup.registrationData.address2);
        cy.getById('#country').select('United States');
        cy.getById('#state').type(this.registrationSetup.registrationData.state);
        cy.getById('#city').type(this.registrationSetup.registrationData.city);
        cy.getById('#zipcode').type(this.registrationSetup.registrationData.zipcode);
        cy.getById('#mobile_number').type(this.registrationSetup.registrationData.mobileNumber);
        cy.getTestData('create-account').click();
        cy.getTestData('account-created').should('be.visible')
        cy.contains('p', 'Congratulations! Your new account has been successfully created!').should('be.visible');
        cy.getTestData('continue-button').click();

        //verify if user is created successfully and logged in
        cy.getNavLink('Logged in as').should('contain', 'John Doe');

        //delete the user account
        cy.getNavLink('Delete Account').click();

        //verify if account deletion is successful
        cy.getTestData('account-deleted').should('be.visible')
        cy.contains('p', 'Your account has been permanently deleted!').should('be.visible');

        //verify user is logged out
        cy.getTestData('continue-button').click();
        cy.getByClass('logo pull-left').find('img').should('be.visible');
    });

});