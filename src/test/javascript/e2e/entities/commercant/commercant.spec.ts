/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommercantComponentsPage, CommercantDeleteDialog, CommercantUpdatePage } from './commercant.page-object';

const expect = chai.expect;

describe('Commercant e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let commercantUpdatePage: CommercantUpdatePage;
    let commercantComponentsPage: CommercantComponentsPage;
    let commercantDeleteDialog: CommercantDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Commercants', async () => {
        await navBarPage.goToEntity('commercant');
        commercantComponentsPage = new CommercantComponentsPage();
        await browser.wait(ec.visibilityOf(commercantComponentsPage.title), 5000);
        expect(await commercantComponentsPage.getTitle()).to.eq('jhipsterApp.commercant.home.title');
    });

    it('should load create Commercant page', async () => {
        await commercantComponentsPage.clickOnCreateButton();
        commercantUpdatePage = new CommercantUpdatePage();
        expect(await commercantUpdatePage.getPageTitle()).to.eq('jhipsterApp.commercant.home.createOrEditLabel');
        await commercantUpdatePage.cancel();
    });

    it('should create and save Commercants', async () => {
        const nbButtonsBeforeCreate = await commercantComponentsPage.countDeleteButtons();

        await commercantComponentsPage.clickOnCreateButton();
        await promise.all([commercantUpdatePage.setNomInput('nom')]);
        expect(await commercantUpdatePage.getNomInput()).to.eq('nom');
        await commercantUpdatePage.save();
        expect(await commercantUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await commercantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Commercant', async () => {
        const nbButtonsBeforeDelete = await commercantComponentsPage.countDeleteButtons();
        await commercantComponentsPage.clickOnLastDeleteButton();

        commercantDeleteDialog = new CommercantDeleteDialog();
        expect(await commercantDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.commercant.delete.question');
        await commercantDeleteDialog.clickOnConfirmButton();

        expect(await commercantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
