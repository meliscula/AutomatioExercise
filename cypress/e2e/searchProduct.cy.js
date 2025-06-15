/// <reference types="cypress" />
import {productName} from "../support/utilities/hooks";

describe('Search Product', () => {

    let userData;

    beforeEach(function() {
        cy.allure().severity('critical');
        cy.getRandomProduct().then((productName) => {
            userData = {productName};
    });
});

    it('should search for a product and display results',{ tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Products')
            .feature('Search')
            .story('User searches for a product');
        cy.getRandomProduct().then((productName) => {
            cy.log(`Searching for product: ${productName}`);

            // Navigate to Products page
            cy.visit('/products');
            cy.get('.title').contains(/ALL PRODUCTS/i).should('be.visible'); // Verify that the page title is displayed

            // Search for a product
            cy.getById('search_product').type(userData.productName);
            cy.getById('submit_search').click();

            // Verify that the search results are displayed
            cy.getByText(userData.productName).should('be.visible');
        });
    });
});
