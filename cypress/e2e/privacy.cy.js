/// <reference types="Cypress" />

describe('Politica de privacidade - Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('src/privacy.html')
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.title()
            .should('be.equal', 'Customer Service Center - Privacy Policy')

        cy.get('h1')
            .should('have.text', 'Privacy Policy')
    })
})