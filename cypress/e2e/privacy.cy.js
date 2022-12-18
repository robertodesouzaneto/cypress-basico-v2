/// <reference types="Cypress" />

describe('Politica de privacidade - Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('src/privacy.html')
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')

        cy.get('h1')
            .should('have.text', 'CAC TAT - Política de privacidade')
    })
})