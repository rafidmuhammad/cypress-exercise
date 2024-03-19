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


export class DatePickerPage {
    selectCommonDatePicker(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDate(dayFromToday)
            cy.wrap(input).invoke('prop', 'value').should('equal', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    }

    selectCommonDatePickerRange(first, second) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssertFirst = selectDate(first)
            const dateToAssertSecond = selectDate(second)
            const dateToAssert = `${dateToAssertFirst} - ${dateToAssertSecond}`
            cy.wrap(input).invoke('prop', 'value').should('equal', dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    }
}

export const onDatePickerPage = new DatePickerPage()