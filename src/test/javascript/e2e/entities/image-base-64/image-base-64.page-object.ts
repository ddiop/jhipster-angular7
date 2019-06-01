import { element, by, ElementFinder } from 'protractor';

export class ImageBase64ComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-image-base-64 div table .btn-danger'));
    title = element.all(by.css('jhi-image-base-64 div h2#page-heading span')).first();

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

export class ImageBase64UpdatePage {
    pageTitle = element(by.id('jhi-image-base-64-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    cheminInput = element(by.id('field_chemin'));
    imageInput = element(by.id('file_image'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setCheminInput(chemin) {
        await this.cheminInput.sendKeys(chemin);
    }

    async getCheminInput() {
        return this.cheminInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
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

export class ImageBase64DeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-imageBase64-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-imageBase64'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
