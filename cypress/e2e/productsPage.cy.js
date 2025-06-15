/// <reference types="cypress" />
import {loginSetup} from "../support/utilities/hooks";

describe('Products Page', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        loginSetup();
    });

    it('should display products page with products',{ tags: ['@smoke', '@regression'] }, () => {
        cy.allure()
            .epic('Products')
            .feature('Display')
            .story('User views the products page');
        cy.visit('/products');
        cy.get('.title').contains(/ALL PRODUCTS/i).should('be.visible'); // Verify that the page title is displayed

        // Verify that products are displayed
        cy.get('.features_items').should('have.length.greaterThan', 0);
        
        // Click on the first product
        cy.get('a[href="/product_details/1"]').click();

        // Verify product details page
        cy.get('.product-information').should('be.visible'); // Check if product information is displayed
            cy.get('h2').should('includes.text', 'Blue Top') // Check product name
            cy.contains('p' , 'Category: Women > Tops').should('be.visible'); // Check product category
            cy.get('span').should('include.text', 'Rs. 500'); // Check product price
            cy.contains('p', 'Availability:').should('be.visible'); // Check product availability
            cy.contains('p', 'Condition:').should('be.visible'); // Check product condition
            cy.contains('p', 'Brand:').should('be.visible'); // Check product brand
        });
});
