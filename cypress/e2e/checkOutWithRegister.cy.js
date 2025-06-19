/// <reference types="cypress" />
import { checkoutRegistrationSetup, paymentDetailsSetup, } from "../support/utilities/hooks";

describe('Checkout with Registration', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        checkoutRegistrationSetup();
        paymentDetailsSetup();
    });

    it('should proceed to checkout with registration', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Checkout')
            .feature('User Registration')
            .story('User proceeds to checkout and registers');
            cy.fixture("loginData").then((checkoutRegistration) => {

        // Navigate to products page
        cy.getByHref('/products').click();
        // Verify that the products page is displayed
        cy.get('.title').contains(/ALL PRODUCTS/i).should('be.visible');

        //hover over the first product to reveal the add to cart button and add it to the cart
        cy.getByClass('features_items > :nth-child(3)').invoke('show');
        cy.get('[data-product-id = "1"]').click({force: true, multiple: true});                            // Click on the "Add to Cart" button for the first product
        cy.getByClass('modal-content').should('be.visible').within(() => {
        cy.getByClass('modal-body').contains('Your product has been added to cart.').should('be.visible'); // Verify success message
        cy.get('.modal-footer > .btn').contains('Continue Shopping').click();                              // Click on the "Continue Shopping" button
        });
        // Navigate to the cart page
        cy.visit('/view_cart');

        // Verify that the cart page is displayed
        cy.url().should('include', '/view_cart');

        // Verify that the cart contains the added products
        cy.getById('cart_info').should('have.length.greaterThan', 0); // Check that there are items in the cart

        //click on the "Proceed to Checkout" button
        cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click();

        //verify that modal is displayed
        cy.getByClass('modal-content').should('be.visible').within(() => {
            cy.getByClass('modal-body').contains('Register / Login account to proceed on checkout.').should('be.visible'); // Verify message
            cy.getByHref('/login').contains('Register / Login').click(); // Click on the "Register/Login" hyperlink
        });

            // Verify that the user is redirected to the signup page
            cy.generateEmail().then((email) => {
            if (!email) {
                throw new Error('Generated unique email is undefined');
            }

            cy.getByFormAction('/signup').should('be.visible');
            cy.getTestData('signup-name').type(checkoutRegistration.checkoutRegistrationData.name);
            cy.getTestData('signup-email').type(email);
            cy.getTestData('signup-button').click();
        }); 
            
            // Fill registration form
            cy.getById('id_gender1').check();
            cy.getById('password').type(checkoutRegistration.checkoutRegistrationData.password);
            cy.getById('days').select('14');
            cy.getById('months').select('March');
            cy.getById('years').select('1990');
            cy.getById('newsletter').check();
            cy.getById('optin').check();
            cy.getById('first_name').type(checkoutRegistration.checkoutRegistrationData.firstName);
            cy.getById('last_name').type(checkoutRegistration.checkoutRegistrationData.lastName);
            cy.getById('company').type(checkoutRegistration.checkoutRegistrationData.company);
            cy.getById('address1').type(checkoutRegistration.checkoutRegistrationData.address);
            cy.getById('address2').type(checkoutRegistration.checkoutRegistrationData.address2);
            cy.getById('country').select('United States');
            cy.getById('state').type(checkoutRegistration.checkoutRegistrationData.state);
            cy.getById('city').type(checkoutRegistration.checkoutRegistrationData.city);
            cy.getById('zipcode').type(checkoutRegistration.checkoutRegistrationData.zipcode);
            cy.getById('mobile_number').type(checkoutRegistration.checkoutRegistrationData.mobileNumber);

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
                .and('contain', checkoutRegistration.checkoutRegistrationData.name);

            // Proceed to checkout
            cy.get('.shop-menu > .nav').within(() => {
                cy.getByHref('/view_cart').click();
            });
            cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').click();

            // Verify Delivery Address section
            cy.getById('address_delivery').should('be.visible')
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.name)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.company)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.address)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.address2)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.city)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.state)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.zipcode)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.mobileNumber);

            // Verify Billing Address section
            cy.getById('address_invoice').should('be.visible')
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.name)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.company)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.address)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.address2)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.city)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.state)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.zipcode)
                .and('contain.text', checkoutRegistration.checkoutRegistrationData.mobileNumber);

            // Verify Order Summary section
            cy.getById('cart_info').should('be.visible').within(() => {
                cy.getById('product-1').each(($selector) => {
                    cy.wrap($selector).find('.cart_description').should('exist');
                    cy.wrap($selector).find('h4 a')
                        .should('have.text', 'Blue Top');
                    cy.wrap($selector).find('p').should('contain.text', 'Women > Tops');

            // Verify product price
            cy.wrap($selector).find('.cart_price').should('contain.text', 'Rs. 500');
            // Verify quantity
            cy.wrap($selector).find('.cart_quantity').should('contain.text', '1');
            // Verify total price
            cy.wrap($selector).find('.cart_total').should('contain.text', 'Rs. 500');
            cy.wrap($selector).find('.cart_total_price').should('contain.text', 'Rs. 500');
                });
            });

            // Enter message for delivery
            cy.getById('ordermsg').type('Please deliver between 9 AM to 5 PM.');

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

                // Click on the "Pay and Confirm Order" button
                cy.getById('submit').contains('Pay and Confirm Order').click();

                // Verify that the order is placed successfully
                cy.getTestData('order-placed').contains('Order Placed!').should('be.visible');
                cy.contains('p', 'Congratulations! Your order has been confirmed!')
                    .should('be.visible');

                // download invoice
                cy.get('.btn.btn-default.check_out').contains('Download Invoice').click();


                // Click on the "Continue" button
                cy.getTestData('continue-button').click();

                // Verify that the user is redirected to the home page
                cy.get('div[class="logo pull-left"]').find('img').should('be.visible');
            });
        });
    });
});