import { element, by, ElementFinder } from 'protractor';

export class DeviceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-device div table .btn-danger'));
    title = element.all(by.css('jhi-device div h2#page-heading span')).first();

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

export class DeviceUpdatePage {
    pageTitle = element(by.id('jhi-device-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    uuidInput = element(by.id('field_uuid'));
    numeroInput = element(by.id('field_numero'));
    indicatifInternationalInput = element(by.id('field_indicatifInternational'));
    notificationUidInput = element(by.id('field_notificationUid'));
    marqueInput = element(by.id('field_marque'));
    modelInput = element(by.id('field_model'));
    activationCodeInput = element(by.id('field_activationCode'));
    activationTentativeInput = element(by.id('field_activationTentative'));
    activationDateInput = element(by.id('field_activationDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUuidInput(uuid) {
        await this.uuidInput.sendKeys(uuid);
    }

    async getUuidInput() {
        return this.uuidInput.getAttribute('value');
    }

    async setNumeroInput(numero) {
        await this.numeroInput.sendKeys(numero);
    }

    async getNumeroInput() {
        return this.numeroInput.getAttribute('value');
    }

    async setIndicatifInternationalInput(indicatifInternational) {
        await this.indicatifInternationalInput.sendKeys(indicatifInternational);
    }

    async getIndicatifInternationalInput() {
        return this.indicatifInternationalInput.getAttribute('value');
    }

    async setNotificationUidInput(notificationUid) {
        await this.notificationUidInput.sendKeys(notificationUid);
    }

    async getNotificationUidInput() {
        return this.notificationUidInput.getAttribute('value');
    }

    async setMarqueInput(marque) {
        await this.marqueInput.sendKeys(marque);
    }

    async getMarqueInput() {
        return this.marqueInput.getAttribute('value');
    }

    async setModelInput(model) {
        await this.modelInput.sendKeys(model);
    }

    async getModelInput() {
        return this.modelInput.getAttribute('value');
    }

    async setActivationCodeInput(activationCode) {
        await this.activationCodeInput.sendKeys(activationCode);
    }

    async getActivationCodeInput() {
        return this.activationCodeInput.getAttribute('value');
    }

    async setActivationTentativeInput(activationTentative) {
        await this.activationTentativeInput.sendKeys(activationTentative);
    }

    async getActivationTentativeInput() {
        return this.activationTentativeInput.getAttribute('value');
    }

    async setActivationDateInput(activationDate) {
        await this.activationDateInput.sendKeys(activationDate);
    }

    async getActivationDateInput() {
        return this.activationDateInput.getAttribute('value');
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

export class DeviceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-device-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-device'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
