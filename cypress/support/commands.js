Cypress.Commands.add('fillMandatoryFields', ticket => {
    cy.get('#firstName').type(ticket.firstName)
    cy.get('#lastName').type(ticket.lastName)
    cy.get('#email').type(ticket.email)
    cy.get('#open-text-area').type(ticket.feedback)
    
})

Cypress.Commands.add('submitTicket', ticket => {
    cy.contains('button', 'Submit').click()
})