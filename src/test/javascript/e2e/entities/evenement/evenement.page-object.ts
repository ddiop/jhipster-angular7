import { element, by, ElementFinder } from 'protractor';

export class EvenementComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-evenement div table .btn-danger'));
    title = element.all(by.css('jhi-evenement div h2#page-heading span')).first();

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

export class EvenementUpdatePage {
    pageTitle = element(by.id('jhi-evenement-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    detailInput = element(by.id('field_detail'));
    lieuDepartInput = element(by.id('field_lieuDepart'));
    lieuDestinationInput = element(by.id('field_lieuDestination'));
    dateDepartInput = element(by.id('field_dateDepart'));
    dateRetourInput = element(by.id('field_dateRetour'));
    dateReflexionInput = element(by.id('field_dateReflexion'));
    dateCreationInput = element(by.id('field_dateCreation'));
    commercantSelect = element(by.id('field_commercant'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setDetailInput(detail) {
        await this.detailInput.sendKeys(detail);
    }

    async getDetailInput() {
        return this.detailInput.getAttribute('value');
    }

    async setLieuDepartInput(lieuDepart) {
        await this.lieuDepartInput.sendKeys(lieuDepart);
    }

    async getLieuDepartInput() {
        return this.lieuDepartInput.getAttribute('value');
    }

    async setLieuDestinationInput(lieuDestination) {
        await this.lieuDestinationInput.sendKeys(lieuDestination);
    }

    async getLieuDestinationInput() {
        return this.lieuDestinationInput.getAttribute('value');
    }

    async setDateDepartInput(dateDepart) {
        await this.dateDepartInput.sendKeys(dateDepart);
    }

    async getDateDepartInput() {
        return this.dateDepartInput.getAttribute('value');
    }

    async setDateRetourInput(dateRetour) {
        await this.dateRetourInput.sendKeys(dateRetour);
    }

    async getDateRetourInput() {
        return this.dateRetourInput.getAttribute('value');
    }

    async setDateReflexionInput(dateReflexion) {
        await this.dateReflexionInput.sendKeys(dateReflexion);
    }

    async getDateReflexionInput() {
        return this.dateReflexionInput.getAttribute('value');
    }

    async setDateCreationInput(dateCreation) {
        await this.dateCreationInput.sendKeys(dateCreation);
    }

    async getDateCreationInput() {
        return this.dateCreationInput.getAttribute('value');
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

export class EvenementDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-evenement-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-evenement'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
