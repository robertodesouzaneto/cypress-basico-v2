Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ticket => {
    cy.get('#firstName').type(ticket.firstName)
    cy.get('#lastName').type(ticket.lastName)
    cy.get('#email').type(ticket.email)
    cy.get('#open-text-area').type(ticket.feedback)
    cy.contains('button', 'Submit').click()
})