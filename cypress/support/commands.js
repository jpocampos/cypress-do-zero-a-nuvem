Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user = {
    firstName: "Gaby",
    lastName: "Martins",
    email: "gaby@gmail.com",
    msg: "teste2"
}) => {
    cy.get('#firstName').type(user.firstName) 
    cy.get('#lastName').type(user.lastName) 
    cy.get('#email').type(user.email) 
    cy.get('#open-text-area').type(user.msg) 
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
})