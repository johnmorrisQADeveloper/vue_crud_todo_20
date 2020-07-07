/// <reference types="Cypress" />

import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open homepage', () => {
  cy.visit('https://warm-escarpment-23584.herokuapp.com/')
})

Then('I see {string} in the title', (title) => {
  cy.title().should('be', title)
})
