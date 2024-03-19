/// <reference types="cypress" />

const { table } = require("console")
const exp = require("constants")

describe('first test suite', () => {

    it('First Test Case', () => {

        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Form Layouts').click()

        //put the code of the test

        // by Tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class value
        cy.get('.input-full-width')

        //by Attribute name
        cy.get('[fullwidth]')

        //by Attribute and Value
        cy.get('[placeholder = "Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by two attributes
        cy.get('[placeholder = "Email"][fullwidth]')

        //by tag, attribute, id and class
        cy.get('input[placeholder = "Email"]#inputEmail1.input-full-width')

        //by cypress test ID (add your own test locators into the source code)
        cy.get('[data-cy="imputEmail1"]')

    })

    it("Second test case", () => {
        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Form Layouts').click()

        // three methods to interact with web elements on the page -> get, contains and find
        //get -> find an element GLOBALLY by locator
        //find -> find child element by locator. cannot be called directyly as cy's  method
        //contains -> find element by HTML text and by Text and locator. return the first match 

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.contains('nb-card', 'Horizontal form').find('button')

        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        cy.contains('nb-card', 'Horizontal form').get('button') //this will find all the sign in button regardless the previous chaining

        //Cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        //NOTE: don't chain cypress command after action methods. Just begin with a new cy chain.
    })


    it('save subject of the command', () => {
        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        //NOTE: Neater structure
        //1 Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')
        cy.get('@usingTheGrid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        //2 Cypress then method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => { //not chainable anymore
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email') //now chainable
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text value', () => {
        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Form Layouts').click()

        //1
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').then((labelText) => {
            const label = labelText.text();
            expect(label).to.equal('Email address')
            cy.wrap(label).should('contain', 'Email address')
        })

        //3 getting html text 
        cy.get('[for="exampleInputEmail1"]').invoke('text').then((text) => {
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labeltext').should('contain', 'Email address')

        //4 getting attribute value
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //5
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
    })


    it('radio buttons', () => {
        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
            cy.wrap(radioButton).eq(0).check({ force: true }).should('be.checked') //disable the automated check for elements to be visible, clickable and so on. commonly we need to avoid this
            cy.wrap(radioButton).eq(1).check({ force: true }).should('be.checked');
            cy.wrap(radioButton).eq(0).should('not.be.checked')
            cy.wrap(radioButton).eq(2).should('be.disabled')


        })
    })

    //TODO: Learned how to handle checkboxes
    it('Checkboxes', () => {
        cy.visit('/')

        cy.contains('Modal & Overlays').click()

        cy.contains('Toastr').click()

        cy.get('input[type="checkbox"]').then(checkBox => {
            cy.wrap(checkBox).eq(0).uncheck({ force: true })
            cy.wrap(checkBox).eq(1).check({ force: true }) //TODO: force:true is needed because the element has class visually hidden
            cy.wrap(checkBox).eq(2).check({ force: true })
            cy.wrap(checkBox).eq(0).click({ force: true })
        })

    })

    it('Datepicker', () => {

        function selectDate(dayOffset) {
            let date = new Date()

            date.setDate(date.getDate() + dayOffset)
            let futureDate = date.getDate();
            let futureMonth = date.toLocaleDateString('en-US', { month: 'short' });
            let futureYear = date.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`
            //TODO: recursive function to loop through the datepicker if condition not met
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDate(dayOffset)
                }
                else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
                }

            })
            return dateToAssert;
        }



        cy.visit('/')

        cy.contains('Forms').click()

        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDate(5)
            cy.wrap(input).invoke('prop', 'value').should('equal', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    })

    //TODO: Learned about iterating list and handles dropdown
    it("List and dropdown", () => {
        cy.visit('/')

        //1
        cy.get('nav nb-select').click()
        cy.get('ul.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')


        //2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('ul.options-list nb-option').each((listItem, index) => {
                const listText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', listText)

                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    //TODO: Learned about getting row by text, getting row by index
    it("Tables", () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 get row by text
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('50')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', 50)
        })

        //2 get row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then((headRow) => {
            cy.wrap(headRow).find('[placeholder="First Name"]').type('jameson')
            cy.wrap(headRow).find('[placeholder="Last Name"]').type('jonah')
            cy.wrap(headRow).find('.nb-checkmark').click()

        })
        cy.get('tbody tr').first().find('td').then(tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain', 'jameson')
            cy.wrap(tableColumn).eq(3).should('contain', 'jonah')
        })
    })

    //TODO: Learned about iterating elements in cypress and processing each elements
    it("tables filter", () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const age = [20, 30, 40, 200]
        cy.wrap(age).each((age) => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500) //TODO: Needed because cypress will query faster than the app
            cy.get('tbody tr').each(tableRow => {
                if (age == 200) {
                    cy.wrap(tableRow).find('td').should('contain', 'No data found')
                }
                else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', `${age}`)
                }

            })
        })
    })

    it("Tooltips", () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        //TODO : most of the times regular click event will work. Otherwise trigger mouse hover event
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        //TODO : get element from the cypress runner
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it.only("Dialog Box", () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //TODO : Cypress automatically confirmed a dialog box from browser
        //1
        cy.get('tbody tr').first().find('td').then(element => {
            cy.wrap(element).find('.nb-trash').click()
            cy.on('window:confirm', (confirm) => { //only executed when the window:confirmed is fired
                expect(confirm).to.equal('Are you sure you want to delete?')
            })
        })

        //2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('td').then(element => {
            cy.wrap(element).find('.nb-trash').click()
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        //3
        cy.get('tbody tr').first().find('td').then(element => {
            cy.wrap(element).find('.nb-trash').click()
            cy.on('window:confirm', () => false)
        })

    })

}) 