export class FormLayoutPage {

    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(field => {
            cy.wrap(field).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(field).find('[placeholder="Email"]').type(email)
            cy.wrap(field).find('[type="checkbox"]').check({ force: true })
            cy.wrap(field).submit() //TODO: submit method can only be used for form
        })
    }

    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(field => {
            cy.wrap(field).find('[placeholder="Email"]').type('test@test.com')
            cy.wrap(field).find('[placeholder="Password"]').type('1234567')
            cy.wrap(field).find('[type="checkbox"]').check({ force: true })
            cy.wrap(field).submit() //TODO: submit method can only be used for form
        })
    }

}

export const onFormLayoutPage = new FormLayoutPage()