describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> {
      cy.visit('../../src/index.html')
      cy.get('input[type="checkbox"]').should('be.visible').as('checkboxs')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
  })

  it('escreve e envia',()=> {
    cy.get('input[name="firstName"]').should('be.visible')
    cy.get('input[name="firstName"]').type("Michelle")

    cy.get('input[name="lastName"]').should('be.visible')
    cy.get('input[name="lastName"]').type("Martins")

    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="email"]').type("michellemartin@gmail.com")

    cy.get('[id="open-text-area"]').should('be.visible')
    cy.get('[id="open-text-area"]').type("site muito bom")

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
    
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',()=> {
    cy.get('input[name="firstName"]').should('be.visible')
    cy.get('input[name="firstName"]').type("Michelle")

    cy.get('input[name="lastName"]').should('be.visible')
   cy.get('input[name="lastName"]').type("Martins")

   cy.get('input[type="email"]').should('be.visible')
   cy.get('input[type="email"]').type("michellemartin@gmail,com")

   cy.get('[id="open-text-area"]').should('be.visible')
    cy.get('[id="open-text-area"]').type("site muito bom")

   cy.contains('button', 'Enviar').should('be.visible')
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')
  
  })

  it('validando campo de telefone',() => {
    cy.get('input[type="number"]').should('be.visible')
    cy.get('input[type="number"]').type('asda')
    cy.get('input[type="number"]').should('have.text','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[name="firstName"]').should('be.visible')
    cy.get('input[name="firstName"]').type("Michelle")

    cy.get('input[name="lastName"]').should('be.visible')
   cy.get('input[name="lastName"]').type("Martins")

   cy.get('input[type="email"]').should('be.visible')
   cy.get('input[type="email"]').type("michellemartin@gmail.com")

   cy.get('[id="open-text-area"]').should('be.visible')
    cy.get('[id="open-text-area"]').type("site muito bom")

    cy.get('#phone-checkbox').should('be.visible')
    cy.get('#phone-checkbox').check()

    
   cy.contains('button', 'Enviar').should('be.visible')
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]')
    .type("valor-aqui")
    .should('have.value', 'valor-aqui')
    .clear()
    .should('have.value', '')
    cy.get('input[name="lastName"]')
    .type("valor-aqui")
    .should('have.value', 'valor-aqui')
    .clear()
    .should('have.value', '')
    cy.get('input[type="email"]')
    .type("valor-aqui")
    .should('have.value', 'valor-aqui')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type("123451")
    .should('have.value', '123451')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
   cy.contains('button', 'Enviar').should('be.visible')
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado',() => {
    const user = {
      firstName: "João",
      lastName: "Campos",
      email: "jpcampos@gmail.com",
      msg: "teste"
    }

    cy.fillMandatoryFieldsAndSubmit(user)
  })


// SEÇÃO 4

  it('Selecione o produto Youtube', () => {
    cy.get('#product').select('youtube').should('have.value', 'youtube')
//  cy.get('#product').select('cursos').should('have.value', 'cursos')
  })

// SEÇÃO 5

  it('arca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check('feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService)
      .check()
      .should('be.checked')
    })
  })


// SEÇÃO 6

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('@checkboxs')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

// SEÇÃO 7

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.fixture('example.json', null).as('file')
    cy.get('input[type="file"]')
    .selectFile('@file')
    .should(input => {
      cy.expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.fixture('example.json', null).as('file')
    cy.get('input[type="file"]')
    .selectFile('@file', { action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('file')
    cy.get('input[type="file"]')
      .selectFile('@file')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

// SEÇÃO 8

  it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .invoke('removeAttr', 'target')
    .click()
  })
  
// SEÇÃO 9

// SEÇAO
})

