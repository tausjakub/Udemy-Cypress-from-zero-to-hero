/// <reference types="cypress"/>

describe('Pur first suite', ()=>{

it('first test', ()=>{
cy.visit('/')
cy.contains('Forms').click()
cy.contains('Form Layouts').click()
    //by Tag Name
    cy.get('input')

    //by ID --> před jméno id se dá #
    cy.get('#inputEmail1')

    //by class --> před jméno class se dá .
    cy.get('.input-full-width')

    //by Attribute name --> dá se do []
    cy.get('[placeholder]')

    //by Attribute name and value --> attribute je v [] a value je v "", spojeno =
    cy.get('[placeholder="Email"]')

    //by Class value --> když je víc class hodnot tak se to musí celé specifikovat
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag name and Atrribute with value --> naskládávají se na sebe
    cy.get('input[placeholder="Email"]')

    //by two diffetent attributes --> skládají se na sebe
    cy.get('[placeholder="Email"][type="email"]')

    //by tag name, Attribute with value,ID and class name --> skládají se na sebe
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    //The most recommendet way by Cypress --> aby to vývojáři nepřepsali omylem je vhodné si vytvořit vlastní atributy
    cy.get('[data-cy="imputEmail1"]')

})

})