// Common test setup hooks
export const loginSetup = () => {
    cy.fixture("loginData").as("userData");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/');
};

export const registrationSetup = () => {
    cy.fixture("loginData").as("registrationData");  // Loads test data
    cy.clearCookies();                               // Clears browser cookies
    cy.clearLocalStorage();                          // Clears localStorage
    cy.visit('/');                                   // Visits the base URL
}; 