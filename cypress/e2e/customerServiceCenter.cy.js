/// <reference types="Cypress" />

import testData from "../fixtures/customerServiceCenter.json"

describe('Customer Service Center', () => {

  beforeEach(() => {
    cy.visit('src/index.html');
  })

  it('verify that the page loads successfully and contains relevant information', () => {
    cy.title()
      .should('be.equal', 'Customer Service Center');

    cy.get('h1')
      .should('have.text', 'Customer Service Center');
  })

  it('submit a successful request by filling in all required fields', () => {
    cy.fillMandatoryFields(testData.mandatoryFields);
    cy.submitTicket()

    cy.get('.success')
      .should('be.visible')
      .should('contain.text', 'Your message has been sent successfully.');
  })

  it('submit a successful request by filling in all fields', () => {
    cy.fillMandatoryFields(testData.allFields);

    cy.get('#phone').type(testData.allFields.phone);

    cy.get('#product')
      .select(testData.allFields.product);

    cy.get('#email-checkbox').check();
    cy.get('#phone-checkbox').check();

    cy.fixture('imageToUpload.png').as('imageToUpload')

    cy.get('input[type="file"]')
      .should('be.empty')
      .selectFile('@imageToUpload')
      .should(function (input) {
        expect(input[0].files[0].name).to.equal('imageToUpload.png')
      })
    
      cy.submitTicket()

      cy.get('.success')
        .should('be.visible')
        .should('contain.text', 'Your message has been sent successfully.');
  })

  it('phone field remains empty when filled with non-numeric value', () => {
    cy.get('#phone').type('test').should('have.value', '')
  })

  it('shows error message when submitting the form with an invalid formatting email', () => {
    cy.fillMandatoryFields(testData.invalidEmail);
    cy.submitTicket();

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Check the required fields!');
  })


  it('shows error message when submitting the form without filling in the required fields', () => {
    cy.submitTicket()

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Check the required fields!');
  })

  it('shows error message when the phone becomes mandatory but is not filled', () => {
    cy.fillMandatoryFields(testData.phoneBecomesMandatory);

    cy.get('#phone-checkbox').check();

    cy.submitTicket();

    cy.get('.error')
      .should('be.visible')
      .should('contain.text', 'Check the required fields!');
  })

  it('access the privacy policy page by removing the target', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()

    cy.get('h1')
      .should('have.text', 'Privacy Policy')
  })

})