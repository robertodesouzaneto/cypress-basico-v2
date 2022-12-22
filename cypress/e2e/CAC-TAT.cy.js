/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  const ticket = {};

  beforeEach(() => {
    cy.visit('src/index.html')

    ticket.firstName = 'Roberto'
    ticket.lastName = 'Neto'
    ticket.email = 'rosone96@gmail.com'
    ticket.feedback = 'Lorem ipsum'
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    
    const longText = Cypress._.repeat('Test ', 20)

    cy.clock()
    cy.get('#firstName').type('Roberto')
    cy.get('#lastName').type('de Souza Neto')
    cy.get('#email').type('rosone96@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Roberto')
    cy.get('#lastName').type('de Souza Neto')
    cy.get('#email').type('wrong@')
    cy.get('#open-text-area').type("Lorem Ipsum",)
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('campo telefone permanece vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone').type('test').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Roberto')
    cy.get('#lastName').type('de Souza Neto')
    cy.get('#email').type('rosone96@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("Lorem Ipsum")
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Roberto').should('have.value', 'Roberto').clear().should('have.value', '')
    cy.get('#lastName').type('de Souza Neto').should('have.value', 'de Souza Neto').clear().should('have.value', '')
    cy.get('#email').type('rosone96@gmail.com').should('have.value', 'rosone96@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('form > button').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit(ticket)
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('be.empty')
      .selectFile('./cypress/fixtures/imageToUpload.png')
      .should(function(input){
        expect(input[0].files[0].name).to.equal('imageToUpload.png')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('be.empty')
      .selectFile('./cypress/fixtures/imageToUpload.png', { action: 'drag-drop' })
      .should(function(input){
        expect(input[0].files[0].name).to.equal('imageToUpload.png')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('imageToUpload.png').as('imageToUpload')

    cy.get('input[type="file"]')
      .should('be.empty')
      .selectFile('@imageToUpload')
      .should(function(input){
        expect(input[0].files[0].name).to.equal('imageToUpload.png')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
     .should('have.attr', 'target', '_blank')
  })
  
  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.get('h1')
      .should('have.text', 'CAC TAT - Política de privacidade')
  })

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.get('h1')
      .should('have.text', 'CAC TAT - Política de privacidade')
  })
  
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
    
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat('Test ', 20)
    
    cy.get('#open-text-area')
      .should('be.empty')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it.only('faz uma requisição HTTP', () => {
    cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const { status, statusText, body } = response
        
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })

  })
})