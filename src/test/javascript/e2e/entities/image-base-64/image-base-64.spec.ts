/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImageBase64ComponentsPage, ImageBase64DeleteDialog, ImageBase64UpdatePage } from './image-base-64.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ImageBase64 e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let imageBase64UpdatePage: ImageBase64UpdatePage;
    let imageBase64ComponentsPage: ImageBase64ComponentsPage;
    let imageBase64DeleteDialog: ImageBase64DeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ImageBase64S', async () => {
        await navBarPage.goToEntity('image-base-64');
        imageBase64ComponentsPage = new ImageBase64ComponentsPage();
        await browser.wait(ec.visibilityOf(imageBase64ComponentsPage.title), 5000);
        expect(await imageBase64ComponentsPage.getTitle()).to.eq('jhipsterApp.imageBase64.home.title');
    });

    it('should load create ImageBase64 page', async () => {
        await imageBase64ComponentsPage.clickOnCreateButton();
        imageBase64UpdatePage = new ImageBase64UpdatePage();
        expect(await imageBase64UpdatePage.getPageTitle()).to.eq('jhipsterApp.imageBase64.home.createOrEditLabel');
        await imageBase64UpdatePage.cancel();
    });

    it('should create and save ImageBase64S', async () => {
        const nbButtonsBeforeCreate = await imageBase64ComponentsPage.countDeleteButtons();

        await imageBase64ComponentsPage.clickOnCreateButton();
        await promise.all([
            imageBase64UpdatePage.setNameInput('name'),
            imageBase64UpdatePage.setCheminInput('chemin'),
            imageBase64UpdatePage.setImageInput(absolutePath)
        ]);
        expect(await imageBase64UpdatePage.getNameInput()).to.eq('name');
        expect(await imageBase64UpdatePage.getCheminInput()).to.eq('chemin');
        expect(await imageBase64UpdatePage.getImageInput()).to.endsWith(fileNameToUpload);
        await imageBase64UpdatePage.save();
        expect(await imageBase64UpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await imageBase64ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ImageBase64', async () => {
        const nbButtonsBeforeDelete = await imageBase64ComponentsPage.countDeleteButtons();
        await imageBase64ComponentsPage.clickOnLastDeleteButton();

        imageBase64DeleteDialog = new ImageBase64DeleteDialog();
        expect(await imageBase64DeleteDialog.getDialogTitle()).to.eq('jhipsterApp.imageBase64.delete.question');
        await imageBase64DeleteDialog.clickOnConfirmButton();

        expect(await imageBase64ComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
