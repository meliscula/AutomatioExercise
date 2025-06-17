/// <reference types="cypress" />
import { loginSetup } from "../support/utilities/hooks";

describe('Add to Cart Tests', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        loginSetup();
    });

    it('should add a product to the cart', { tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Add to Cart')
            .feature('Product Addition')
            .story('User adds a product to the cart');

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

        //hover over the second product to reveal the add to cart button and add it to the cart
        cy.getByClass('features_items > :nth-child(4)').invoke('show');                                    // Hover over the second product to reveal the "Add to Cart" button
        cy.get('[data-product-id = "2"]').click({force: true, multiple: true});                            // Click on the "Add to Cart" button for the second product
        cy.getByClass('modal-content',).should('be.visible').within(() =>{                                 // Verify that the cart modal is displayed
        cy.getByClass('modal-body').contains('Your product has been added to cart.').should('be.visible'); // Verify success message
        cy.get('.modal-footer > .btn').contains('Continue Shopping').click();                              // Click on the "Continue Shopping" button
        cy.wait(5000);                                                                                     // Wait for the modal to close
        });

        // Navigate to the cart page
        cy.visit('/view_cart');                                        // Click on the "View Cart" link

        // Verify that the cart page is displayed
        cy.url().should('include', '/view_cart');

        // Verify that the cart contains the added products
        cy.getById('cart_info').should('have.length.greaterThan', 0); // Check that there are items in the cart

        // Get the product row and verify its components
        cy.getById('cart_info_table').within(() => {
            // Verify product image
            cy.get('.cart_product')
                .should('exist');

            // Verify product description 
            cy.getById('product-1').each(($selector) => {
                cy.wrap($selector).find('.cart_description').should('exist');
                cy.wrap($selector).find('h4 a')
                        .should('have.text', 'Blue Top');
                cy.wrap($selector).find('p').should('contain.text', 'Women > Tops');

            // Verify product price
                cy.wrap($selector).find('.cart_price')
                .should('exist')
                .and('contain.text', 'Rs. 500');

            // Verify quantity
                cy.wrap($selector).find('.cart_quantity')
                .should('exist')
                .and('contain.text', '1');

            // Verify total price
                cy.wrap($selector).find('.cart_total')
                .should('exist')
                .and('contain.text', 'Rs. 500');

            // Verify delete button
                cy.wrap($selector).find('.cart_delete')
                .should('exist')
            });
        });
    });
});
