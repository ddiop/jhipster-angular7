import { element, by, ElementFinder } from 'protractor';

export class AdresseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-adresse div table .btn-danger'));
    title = element.all(by.css('jhi-adresse div h2#page-heading span')).first();

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

export class AdresseUpdatePage {
    pageTitle = element(by.id('jhi-adresse-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    adressePostaleInput = element(by.id('field_adressePostale'));
    codePostaleInput = element(by.id('field_codePostale'));
    villeInput = element(by.id('field_ville'));
    paysInput = element(by.id('field_pays'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAdressePostaleInput(adressePostale) {
        await this.adressePostaleInput.sendKeys(adressePostale);
    }

    async getAdressePostaleInput() {
        return this.adressePostaleInput.getAttribute('value');
    }

    async setCodePostaleInput(codePostale) {
        await this.codePostaleInput.sendKeys(codePostale);
    }

    async getCodePostaleInput() {
        return this.codePostaleInput.getAttribute('value');
    }

    async setVilleInput(ville) {
        await this.villeInput.sendKeys(ville);
    }

    async getVilleInput() {
        return this.villeInput.getAttribute('value');
    }

    async setPaysInput(pays) {
        await this.paysInput.sendKeys(pays);
    }

    async getPaysInput() {
        return this.paysInput.getAttribute('value');
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

export class AdresseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-adresse-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-adresse'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
