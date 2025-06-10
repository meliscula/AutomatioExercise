/// <reference types="cypress" />
import { registrationSetup } from "../support/utilities/hooks";

describe('Register User Tests', () => {
    beforeEach(function() {
        registrationSetup();
    });

    it('should register a new user', function() {
        cy.fixture('loginData').then((userData) => {
            const uniqueEmail = `test${Date.now()}@example.com`;

            // Navigate to Signup/Login page
            cy.getByHref('/login').click();
            cy.getByFormAction('/signup').should('be.visible');
            cy.getTestData('signup-name').type(userData.validUser.name);
            cy.getTestData('signup-email').type(uniqueEmail);
            cy.getTestData('signup-button').click();
            
            // Fill registration form
            cy.getById('id_gender1').check();
            cy.getById('password').type(userData.registrationData.password);
            cy.getById('days').select('14');
            cy.getById('months').select('March');
            cy.getById('years').select('1990');
            cy.getById('newsletter').check();
            cy.getById('optin').check();
            cy.getById('first_name').type(userData.registrationData.firstName);
            cy.getById('last_name').type(userData.registrationData.lastName);
            cy.getById('company').type(userData.registrationData.company);
            cy.getById('address1').type(userData.registrationData.address);
            cy.getById('address2').type(userData.registrationData.address2);
            cy.getById('country').select('United States');
            cy.getById('state').type(userData.registrationData.state);
            cy.getById('city').type(userData.registrationData.city);
            cy.getById('zipcode').type(userData.registrationData.zipcode);
            cy.getById('mobile_number').type(userData.registrationData.mobileNumber);

            // Complete registration
            cy.getTestData('create-account').click();
            cy.getTestData('account-created')
                .should('be.visible', { timeout: 10000 });
            cy.contains('p', 'Congratulations! Your new account has been successfully created!')
                .should('be.visible');
            cy.getTestData('continue-button').click();

            // Verify registration
            cy.contains('li', 'Logged in as', { timeout: 20000 })
                .should('be.visible')
                .and('contain', userData.validUser.name);
            
            //delete the user account
            cy.getNavLink('Delete Account').click();

            //verify if account deletion is successful
            cy.getTestData('account-deleted').should('be.visible')
            cy.contains('p', 'Your account has been permanently deleted!').should('be.visible');

             //verify user is logged out
            cy.getTestData('continue-button').click();
            cy.get('div[class="logo pull-left"]').find('img').should('be.visible');
        });
    });
});