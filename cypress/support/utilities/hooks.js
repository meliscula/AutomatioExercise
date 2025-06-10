// Common test setup hooks
export const loginSetup = () => {
    return cy.fixture("loginData").then(function (data) {
        cy.wrap(data).as('userData')  // Loads test data into this context
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
});
};

export const registrationSetup = () => {
    return cy.fixture('loginData').then((data) => {
        cy.wrap(data).as('userData');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });
};
