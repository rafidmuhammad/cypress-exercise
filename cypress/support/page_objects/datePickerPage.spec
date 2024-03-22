export class DatePickerPage {

    selectCommonDatePicker() {
        cy.contains('nb-card', 'Common Datepicker').then(field => {
            cy.wrap(field).contains('[placeholder="Form Picker"]').click()
            cy.wrap(field).get('[class="day-cell ng-star-inserted"]').contains('10').click()
        })
    }

    selectCommonDatePickerRange() {
        cy.contains('nb-card', 'Datepicker With Range').find('form').then(field => {
            cy.wrap(field).contains('[placeholder="Range Picker"]').click()
            cy.wrap(field).get('[class="day-cell"]').contains('10').click()
        })
    }

    selectCommonDateWithDisableMinMaxValue() {
        cy.contains('nb-card', 'Datepicker With Range').find('form').then(field => {
            cy.wrap(field).contains('[placeholder="Min Max Picker"]').click()
            cy.wrap(field).get('[class="day-cell ng-star-inserted"]').contains('25').click()
        })
    }



}

export const onDatePickerPage = new DatePickerPage()