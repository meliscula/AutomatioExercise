/// <reference types="cypress" />
import { loginSetup} from "../support/utilities/hooks";

describe('Test Cases Page', () => {
    beforeEach(function() {
        cy.allure().severity('minor');
        loginSetup();
    });

    it('should display the test cases page',{ tags: ['@smoke', '@regression'] }, function() {
        cy.allure()
            .epic('Test Cases')
            .feature('Display')
            .story('User views the test cases page');
        cy.fixture('loginData').then((userData) => {

            // Navigate to Test Cases page
            cy.get('a[href="/test_cases"]').contains('Test Cases').click();
            cy.getByText('Test Cases').should('be.visible');

            // Verify the presence of test case elements
            cy.getByText('Test Case 1').should('be.visible');
            cy.getByText('Test Case 2').should('be.visible');
            cy.getByText('Test Case 3').should('be.visible');

            // Verify that the test cases are listed correctly
            cy.get('#form > .container').children('.panel-group').should('exist');
        });
    });
});