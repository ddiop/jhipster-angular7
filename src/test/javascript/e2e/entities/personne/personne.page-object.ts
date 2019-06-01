import { element, by, ElementFinder } from 'protractor';

export class PersonneComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-personne div table .btn-danger'));
    title = element.all(by.css('jhi-personne div h2#page-heading span')).first();

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

export class PersonneUpdatePage {
    pageTitle = element(by.id('jhi-personne-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    surnomInput = element(by.id('field_surnom'));
    civiliteSelect = element(by.id('field_civilite'));
    prenomInput = element(by.id('field_prenom'));
    nomInput = element(by.id('field_nom'));
    mailInput = element(by.id('field_mail'));
    passwordInput = element(by.id('field_password'));
    dateNaissanceInput = element(by.id('field_dateNaissance'));
    cguVersionInput = element(by.id('field_cguVersion'));
    cguValideInput = element(by.id('field_cguValide'));
    cguDateValidationInput = element(by.id('field_cguDateValidation'));
    langueSelect = element(by.id('field_langue'));
    adresseResidenceSelect = element(by.id('field_adresseResidence'));
    deviceSelect = element(by.id('field_device'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setSurnomInput(surnom) {
        await this.surnomInput.sendKeys(surnom);
    }

    async getSurnomInput() {
        return this.surnomInput.getAttribute('value');
    }

    async setCiviliteSelect(civilite) {
        await this.civiliteSelect.sendKeys(civilite);
    }

    async getCiviliteSelect() {
        return this.civiliteSelect.element(by.css('option:checked')).getText();
    }

    async civiliteSelectLastOption() {
        await this.civiliteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setMailInput(mail) {
        await this.mailInput.sendKeys(mail);
    }

    async getMailInput() {
        return this.mailInput.getAttribute('value');
    }

    async setPasswordInput(password) {
        await this.passwordInput.sendKeys(password);
    }

    async getPasswordInput() {
        return this.passwordInput.getAttribute('value');
    }

    async setDateNaissanceInput(dateNaissance) {
        await this.dateNaissanceInput.sendKeys(dateNaissance);
    }

    async getDateNaissanceInput() {
        return this.dateNaissanceInput.getAttribute('value');
    }

    async setCguVersionInput(cguVersion) {
        await this.cguVersionInput.sendKeys(cguVersion);
    }

    async getCguVersionInput() {
        return this.cguVersionInput.getAttribute('value');
    }

    getCguValideInput() {
        return this.cguValideInput;
    }
    async setCguDateValidationInput(cguDateValidation) {
        await this.cguDateValidationInput.sendKeys(cguDateValidation);
    }

    async getCguDateValidationInput() {
        return this.cguDateValidationInput.getAttribute('value');
    }

    async setLangueSelect(langue) {
        await this.langueSelect.sendKeys(langue);
    }

    async getLangueSelect() {
        return this.langueSelect.element(by.css('option:checked')).getText();
    }

    async langueSelectLastOption() {
        await this.langueSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async adresseResidenceSelectLastOption() {
        await this.adresseResidenceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async adresseResidenceSelectOption(option) {
        await this.adresseResidenceSelect.sendKeys(option);
    }

    getAdresseResidenceSelect(): ElementFinder {
        return this.adresseResidenceSelect;
    }

    async getAdresseResidenceSelectedOption() {
        return this.adresseResidenceSelect.element(by.css('option:checked')).getText();
    }

    async deviceSelectLastOption() {
        await this.deviceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async deviceSelectOption(option) {
        await this.deviceSelect.sendKeys(option);
    }

    getDeviceSelect(): ElementFinder {
        return this.deviceSelect;
    }

    async getDeviceSelectedOption() {
        return this.deviceSelect.element(by.css('option:checked')).getText();
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

export class PersonneDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-personne-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-personne'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
