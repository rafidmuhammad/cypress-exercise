const { NavigateTo } = require('../support/page_objects/navigationPage');
const { onFormLayoutPage } = require('../support/page_objects/formLayoutPage');
const { onDatePickerPage } = require('../support/page_objects/datePickerPage.spec');

describe('Test with page object', () => {
    beforeEach('Open application', () => {
        cy.openHomePage()
    })

    it('verify navigation accross the pages', () => {
        NavigateTo.datePickerPage()
        NavigateTo.formLayoutPage()
        NavigateTo.smartTablePage()

        NavigateTo.toasterPage()
        NavigateTo.tooltipPage()
    })

    it.only("should submit inline and basic form and select tomorrow date in the calendar", () => {
        NavigateTo.formLayoutPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('LeBron', 'test@test.com')
        onFormLayoutPage.submitBasicFormWithEmailAndPassword('test@test.com', '12345678')
        NavigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePicker(10)
        onDatePickerPage.selectCommonDatePickerRange(7, 14)

    })
})