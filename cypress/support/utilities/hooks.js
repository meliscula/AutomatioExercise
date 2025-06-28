import { data } from "ospath";

// Common test setup hooks
export const loginSetup = () => {
    return cy.fixture('loginData').then(function (data) {
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

export const ExistingEmail = () => {
    return cy.fixture('loginData').then((data) => {
        cy.wrap(data).as('userData');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });
};

export const contactUsForm = () => {
    return cy.fixture('loginData').then((data) => {
        cy.wrap(data).as('userData');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/');
    });
};

export const generateUniqueEmail = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `test.${timestamp}.${random}@example.com`;
};

export const generateInvalidEmail = (type = 'random') => {
    return cy.fixture('loginData').then(data => {
        if (type === 'random') {
            const types = Object.keys(data.invalidEmails);
            type = types[Math.floor(Math.random() * types.length)];
        }
        return data.invalidEmails[type] || data.invalidEmails.noAt;
    });
};

export const checkoutRegistrationSetup = () => {
    return cy.fixture("loginData").then((data) => {
        cy.wrap(data).as("checkoutRegistration");
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit("/");
    });
};

export const paymentDetailsSetup = () => {
    return cy.fixture("loginData").then((data) => {
        cy.wrap(data).as("paymentDetails");
    });
};

export const productName = () => {
    return cy.fixture("loginData").then((data) => {
        const names = data.products.names;
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    });
};