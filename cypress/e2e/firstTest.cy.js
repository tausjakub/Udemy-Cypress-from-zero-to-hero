/// <reference types="cypress"/>

const { Input } = require("@angular/core")

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

it('second test', ()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    cy.get('[data-cy="signInButton"]')

    cy.contains('Sign in')
    cy.contains('[status="warning"]','Sign in')
///na když na stránce není element unikátní, tak se dá postupovat, pomocí toho, pokud jiný element, který má stejný parent je unikátní
    cy.get('#inputEmail3')
    .parents('form')
    .find('button')
    .should('contain','Sign in')
    .parents('form')
    .find('nb-checkbox')
    .click()

    cy.contains('nb-card','Horizontal form').find('[type="email"]')


})

it('then and wrap methods', ()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
    cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email')
    cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

    //parametrizace v cypresss --> přes jQuery --> pokud se chci vrátit zpátky do Cypress, tak přes cy.wrap
    cy.contains('nb-card','Using the Grid').then( firstForm =>{
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')

        cy.contains('nb-card','Basic form').then( secondForm =>{
           //const emailLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
            const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
           //expect(emailLabelFirst).to.equal(emailLabelSecond)
            expect(passwordLabelFirst).to.equal(passwordLabelSecond)

            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')

        })

    })

})

it('inoke commands', ()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //příklady jak pracovat s textem
    
    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then( label =>{

        expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
        expect('text')

    })

    cy.contains('nb-card','Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
       //1.možnost 
       .should('contain','checked')
       //2. možnost
       .then(classValue =>{
            expect(classValue).to.contain('checked')
       })

})

//kontrola u datepickeru přes property

it('assert property',()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    
    cy.contains('nb-card','Common Datepicker').find('input').then(input=>{
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('14').click()
        cy.wrap(input).invoke('prop','value').should('contain','14')

    })
})

it('radio button', ()=>{
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons => {
        cy.wrap(radioButtons)
            .first()
            //force:true může zkontrolovat i skryté elementy
            .check({force:true})
            .should('be.checked')

        cy.wrap(radioButtons)
            .eq(1) 
            .check({force:true})

        cy.wrap(radioButtons)
            .eq(0)
            .should('not.be.checked')

        cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')

    })

})

it.only('check button', ()=>{
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({force:true}) //přes check metodu mohu pouze zašktrnout a ne odšktrnout
    cy.get('[type="checkbox"]').eq(0).click({force:true}) // přes click metodu mohu i odšktrnout




})
})
