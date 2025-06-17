/// <reference types="cypress" />
import { loginSetup, generateInvalidEmail, generateUniqueEmail } from "../support/utilities/hooks";


describe('Subscription Tests', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        loginSetup();
    });

    it('should subscribe to a newsletter with valid email', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Subscription')
            .feature('Newsletter Subscription')
            .story('User subscribes with a valid email');

        // Navigate to homepage page and verify subscription
        cy.fixture('loginData').then((userData) => {
            cy.generateEmail().then((validEmail) => { // Generate a unique valid email
            if (!validEmail) {
                throw new Error('Generated email is undefined');
            }
            
        cy.getById('susbscribe_email').type(validEmail);
        cy.getById('subscribe').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('You have been successfully subscribed!');
            });
        });
    }); 
});

    it('should not subscribe with an invalid email', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Subscription')
            .feature('Newsletter Subscription')
            .story('User tries to subscribe with an invalid email');

        // Navigate to Signup/Login page and verify subscription
        cy.fixture('loginData').then((userData) => {
            cy.generateInvalidEmail().then((invalidEmail) => { // Generate an invalid email
                if (!invalidEmail) {
                    throw new Error('Generated invalid email is undefined');
                }
                
                cy.getById('susbscribe_email').type(invalidEmail);
                cy.getById('subscribe').click();
                cy.on('window:alert', (text) => {
                    expect(text).should('be.visible');
                });
            });
        });    
    });


        // navigate to cart page and verify subscription
    it('should subscribe to a newsletter with valid email from cart page', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Subscription')
            .feature('Newsletter Subscription')
            .story('User subscribes with a valid email');
        cy.visit('/view_cart'); // Navigate to the cart page
        cy.url().should('include', '/view_cart'); // Verify we are on the cart page

        // Navigate to Signup/Login page and verify subscription
        cy.fixture('loginData').then((userData) => {
            cy.generateEmail().then((validEmail) => { // Generate a unique valid email
            if (!validEmail) {
                throw new Error('Generated email is undefined');
            }
            
        cy.getById('susbscribe_email').type(validEmail);
        cy.getById('subscribe').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('You have been successfully subscribed!');
            });
        });
    }); 
});

    it('should not subscribe with an invalid email from cart page', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Subscription')
            .feature('Newsletter Subscription')
            .story('User tries to subscribe with an invalid email');
        cy.visit('/view_cart'); // Navigate to the cart page
        cy.url().should('include', '/view_cart'); // Verify we are on the cart page

        // Navigate to Signup/Login page and verify subscription
        cy.fixture('loginData').then((userData) => {
            cy.generateInvalidEmail().then((invalidEmail) => { // Generate an invalid email
                if (!invalidEmail) {
                    throw new Error('Generated invalid email is undefined');
                }
                
                cy.getById('susbscribe_email').type(invalidEmail);
                cy.getById('subscribe').click();
                cy.on('window:alert', (text) => {
                    expect(text).should('be.visible');
                });
            });
        });    
    });
});
