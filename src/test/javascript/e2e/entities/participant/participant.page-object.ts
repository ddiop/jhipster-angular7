import { element, by, ElementFinder } from 'protractor';

export class ParticipantComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-participant div table .btn-danger'));
    title = element.all(by.css('jhi-participant div h2#page-heading span')).first();

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

export class ParticipantUpdatePage {
    pageTitle = element(by.id('jhi-participant-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    organisateurInput = element(by.id('field_organisateur'));
    personneSelect = element(by.id('field_personne'));
    evenementSelect = element(by.id('field_evenement'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getOrganisateurInput() {
        return this.organisateurInput;
    }

    async personneSelectLastOption() {
        await this.personneSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async personneSelectOption(option) {
        await this.personneSelect.sendKeys(option);
    }

    getPersonneSelect(): ElementFinder {
        return this.personneSelect;
    }

    async getPersonneSelectedOption() {
        return this.personneSelect.element(by.css('option:checked')).getText();
    }

    async evenementSelectLastOption() {
        await this.evenementSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async evenementSelectOption(option) {
        await this.evenementSelect.sendKeys(option);
    }

    getEvenementSelect(): ElementFinder {
        return this.evenementSelect;
    }

    async getEvenementSelectedOption() {
        return this.evenementSelect.element(by.css('option:checked')).getText();
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

export class ParticipantDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-participant-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-participant'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
