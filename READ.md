# Cypress Automation Testing with Allure Reports and GitHub Actions

This project demonstrates an automation testing setup using **Cypress** with **JavaScript**, enhanced with **Allure Reports** for detailed test reporting, and **GitHub Actions** for streamlined continuous integration and delivery.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Running Tests Locally](#running-tests-locally)  
- [Generating Allure Reports](#generating-allure-reports)  
- [GitHub Actions Integration](#github-actions-integration)  
- [Folder Structure](#folder-structure) 

---

## Overview

This project provides a scalable automated testing framework for web applications using Cypress. It utilizes Allure Reports for an advanced visual test report, making test results easier to analyze. GitHub Actions is configured to run tests on every push or pull request to facilitate continuous integration.

---

## Features

- **Robust end-to-end tests** using Cypress and JavaScript  
- **Detailed Allure Reports** with screenshots and logs  
- **CI/CD Pipeline** via GitHub Actions to automate test execution  
- Easy setup and extensibility for additional tests and workflows  

---

## Technologies Used

- [Cypress](https://www.cypress.io/) - JavaScript testing framework  
- [Allure Reports](https://docs.qameta.io/allure/) - Test reporting tool  
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation  
- JavaScript (ES6+)  

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
2. Install dependencies
    npm install
3. Configure environment variables if necessary (e.g., base URL).

## Running Test Locally
1. Run Cypress tests in interactive mode
    npx cypress open
2. Run tests headlessly (useful for CI):
    npx cypress run

## Generating Allure Reports
1. Ensure allure-commandline is installed globally
    npm install -g allure-commandline --save-dev
2. Run tests with Allure reporter enabled
    npx cypress run --reporter allure-mochawesome
3. Generate and open the Allure report
    allure serve allure-results

## Github Actions Integration
1. The workflow runs tests on push or pull requests to the main branch.
2. Tests run in headless mode.
3. Allure reports are generated as build artifacts for later download and review.


## Folder Structure
root
├── cypress/
│   ├── e2e/               # Test specs
│   ├── fixtures/          # Test data files
│   └── support/           # Support commands and utilities
├── allure-results/        # Test results for Allure
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions workflow file
├── cypress.config.js      # Cypress configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file







































