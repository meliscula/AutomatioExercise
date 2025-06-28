/// <reference types="cypress" />
import { productName } from "../support/utilities/hooks";

describe('Search Product', () => {
    beforeEach(function() {
        cy.allure().severity('critical');
        productName();
    });
    it('should search for a product and display results',{ tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Products')
            .feature('Search')
            .story('User searches for a product');

            // Navigate to Products page
            cy.visit('/products');
            cy.get('.title').contains(/ALL PRODUCTS/i).should('be.visible'); // Verify that the page title is displayed

            // Search for a product
        productName().then((randomProduct) => {
        cy.getById('search_product').type(randomProduct);
        cy.getById('submit_search').click();

        // Verify that the search results are displayed
        cy.getByText(randomProduct).should('be.visible');
            });
        });
    });