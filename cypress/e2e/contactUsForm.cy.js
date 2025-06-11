///<reference types="cypress" />

import { contactUsForm } from "../support/utilities/hooks";

describe('Contact Us Form', () => {
    beforeEach(function() {
        contactUsForm();
    });

    it('should submit the contact us form successfully', function() {
        cy.fixture('loginData').then((userData) => {

            // Navigate to Contact Us page
            cy.get('a[href="/contact_us"]').click();
            cy.getByText('Get In Touch').should('be.visible');

            // Fill in the contact form
            cy.getTestData('name').type(userData.contactUsForm.name);
            cy.getTestData('email').type(userData.contactUsForm.email);
            cy.getTestData('subject').type(userData.contactUsForm.subject);
            cy.getById('message').type(userData.contactUsForm.message);
            cy.getByName('upload_file').attachFile(userData.contactUsForm.filePath); //upload file

            // Submit the form
            cy.getTestData('submit-button').click();

            // Handle alert confirmation
            cy.on('window:alert', (text) => {
                expect(text).to.contains('OK')
                return true
            });

            // Verify success message
            cy.getByText('Success! Your details have been submitted successfully.')
                .should('be.visible');

            //click on the home button
            cy.getById('form-section').find('a').contains('Home').click();
            
            // Verify redirection to home page
            cy.url().should('include', '/');

        });
    });


});