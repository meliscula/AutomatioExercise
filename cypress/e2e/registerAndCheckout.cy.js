/// <reference types="cypress" />

import { paymentDetailsSetup, registrationSetup } from "../support/utilities/hooks";

describe('Register and Checkout Tests', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        registrationSetup();
        });

    it('should register and proceed to checkout', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Register and Checkout')
            .feature('User Registration')
            .story('User registers and proceeds to checkout');

        cy.fixture('loginData').then((userData) => {
                    const email = generateUniqueEmail();
                    if(!email) {
                        throw new Error('Generated email is undefined');
                    }
        
                    // Navigate to Signup/Login page
                    cy.getByHref('/login').click();
                    cy.getByFormAction('/signup').should('be.visible');
                    cy.getTestData('signup-name').type(userData.validUser.name);
                    cy.getTestData('signup-email').type(email);
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

                    //hover over the first product to reveal the add to cart button and add it to the cart
                    cy.getByClass('features_items > :nth-child(3)').invoke('show');
                    cy.get('[data-product-id = "2"]').click({force: true, multiple: true});                            // Click on the "Add to Cart" button for the second product
                    cy.getByClass('modal-content').should('be.visible').within(() => {
                    cy.getByClass('modal-body').contains('Your product has been added to cart.').should('be.visible'); // Verify success message
                    cy.get('.modal-footer > .btn').contains('Continue Shopping').click();                              // Click on the "Continue Shopping" button
                    });

                    // Navigate to the cart page
                    cy.get('.shop-menu > .nav').within(() => {
                    cy.getByHref('/view_cart').click();
                    });

                    // Verify that the cart page is displayed
                    cy.url().should('include', '/view_cart');

                    // Verify that the cart contains the added products
                    cy.getById('cart_info').should('have.length.greaterThan', 0); // Check that there are items in the cart

                    // Verify Order Summary section
                    cy.getById('cart_info').should('be.visible').within(() => {
                        cy.getById('product-2').each(($selector) => {
                            cy.wrap($selector).find('.cart_description').should('exist');
                            cy.wrap($selector).find('h4 a')
                                .should('have.text', 'Men Tshirt');
                            cy.wrap($selector).find('p').should('contain.text', 'Men > Tshirts');

                    // Verify product price
                    cy.wrap($selector).find('.cart_price').should('contain.text', 'Rs. 400');
                    // Verify quantity
                    cy.wrap($selector).find('.cart_quantity').should('contain.text', '1');
                    // Verify total price
                    cy.wrap($selector).find('.cart_total').should('contain.text', 'Rs. 400');
                    cy.wrap($selector).find('.cart_total_price').should('contain.text', 'Rs. 400');
                        });
                    });
                    //click on the "Proceed to Checkout" button
                    cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click();

                        // Verify Delivery Address section
                    cy.getById('address_delivery').should('be.visible')
                    .and('contain.text', registrationSetup.registrationData.name)
                    .and('contain.text', registrationSetup.registrationData.company)
                    .and('contain.text', registrationSetup.registrationData.address)
                    .and('contain.text', registrationSetup.registrationData.address2)
                    .and('contain.text', registrationSetup.registrationData.city)
                    .and('contain.text', registrationSetup.registrationData.state)
                    .and('contain.text', registrationSetup.registrationData.zipcode)
                    .and('contain.text', registrationSetup.registrationData.mobileNumber);

            // Verify Billing Address section
                    cy.getById('address_invoice').should('be.visible')
                    .and('contain.text', registrationSetup.registrationData.name)
                    .and('contain.text', registrationSetup.registrationData.company)
                    .and('contain.text', registrationSetup.registrationData.address)
                    .and('contain.text', registrationSetup.registrationData.address2)
                    .and('contain.text', registrationSetup.registrationData.city)
                    .and('contain.text', registrationSetup.registrationData.state)
                    .and('contain.text', registrationSetup.registrationData.zipcode)
                    .and('contain.text', registrationSetup.registrationData.mobileNumber);

                    // Enter message for delivery
                    cy.getById('message').type('Please deliver between 9 AM to 5 PM');

                    // Click on the "Place Order" button
                    cy.getByHref('/payment').contains('Place Order').click();

                    // Verify that the user is redirected to the payment page
                    cy.getByClass('heading').contains('Payment').should('be.visible');

                    cy.fixture('loginData').then((paymentDetails) => {
                // Fill payment details
                    cy.getTestData('name-on-card').type(paymentDetails.paymentDetails.cardName);
                    cy.getTestData('card-number').type(paymentDetails.paymentDetails.cardNumber);
                    cy.getTestData('cvc').type(paymentDetails.paymentDetails.cvc);
                    cy.getTestData('expiry-month').type(paymentDetails.paymentDetails.expiryMonth);
                    cy.getTestData('expiry-year').type(paymentDetails.paymentDetails.expiryYear);
            });
        });
    });
});