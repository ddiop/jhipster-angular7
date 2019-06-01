import { element, by, ElementFinder } from 'protractor';

export class CommercantInformationsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-commercant-informations div table .btn-danger'));
    title = element.all(by.css('jhi-commercant-informations div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommercantInformationsUpdatePage {
    pageTitle = element(by.id('jhi-commercant-informations-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    cleInput = element(by.id('field_cle'));
    valeurInput = element(by.id('field_valeur'));
    commercantSelect = element(by.id('field_commercant'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCleInput(cle) {
        await this.cleInput.sendKeys(cle);
    }

    async getCleInput() {
        return this.cleInput.getAttribute('value');
    }

    async setValeurInput(valeur) {
        await this.valeurInput.sendKeys(valeur);
    }

    async getValeurInput() {
        return this.valeurInput.getAttribute('value');
    }

    async commercantSelectLastOption() {
        await this.commercantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async commercantSelectOption(option) {
        await this.commercantSelect.sendKeys(option);
    }

    getCommercantSelect(): ElementFinder {
        return this.commercantSelect;
    }

    async getCommercantSelectedOption() {
        return this.commercantSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CommercantInformationsDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-commercantInformations-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-commercantInformations'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
