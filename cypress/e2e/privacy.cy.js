/// <reference types="Cypress" />

describe('Privacy Policy - Customer Service Center', () => {
    beforeEach(() => {
        cy.visit('src/privacy.html')
    })

    it('Verify that the privacy policy page loads successfully and contains relevant information', () => {
        cy.title()
            .should('be.equal', 'Customer Service Center - Privacy Policy')

        cy.get('h1')
            .should('have.text', 'Privacy Policy')
    })
})