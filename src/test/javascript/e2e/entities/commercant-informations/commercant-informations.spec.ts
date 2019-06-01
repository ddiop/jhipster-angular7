/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    CommercantInformationsComponentsPage,
    CommercantInformationsDeleteDialog,
    CommercantInformationsUpdatePage
} from './commercant-informations.page-object';

const expect = chai.expect;

describe('CommercantInformations e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let commercantInformationsUpdatePage: CommercantInformationsUpdatePage;
    let commercantInformationsComponentsPage: CommercantInformationsComponentsPage;
    let commercantInformationsDeleteDialog: CommercantInformationsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CommercantInformations', async () => {
        await navBarPage.goToEntity('commercant-informations');
        commercantInformationsComponentsPage = new CommercantInformationsComponentsPage();
        await browser.wait(ec.visibilityOf(commercantInformationsComponentsPage.title), 5000);
        expect(await commercantInformationsComponentsPage.getTitle()).to.eq('jhipsterApp.commercantInformations.home.title');
    });

    it('should load create CommercantInformations page', async () => {
        await commercantInformationsComponentsPage.clickOnCreateButton();
        commercantInformationsUpdatePage = new CommercantInformationsUpdatePage();
        expect(await commercantInformationsUpdatePage.getPageTitle()).to.eq('jhipsterApp.commercantInformations.home.createOrEditLabel');
        await commercantInformationsUpdatePage.cancel();
    });

    it('should create and save CommercantInformations', async () => {
        const nbButtonsBeforeCreate = await commercantInformationsComponentsPage.countDeleteButtons();

        await commercantInformationsComponentsPage.clickOnCreateButton();
        await promise.all([
            commercantInformationsUpdatePage.setCleInput('cle'),
            commercantInformationsUpdatePage.setValeurInput('valeur'),
            commercantInformationsUpdatePage.commercantSelectLastOption()
        ]);
        expect(await commercantInformationsUpdatePage.getCleInput()).to.eq('cle');
        expect(await commercantInformationsUpdatePage.getValeurInput()).to.eq('valeur');
        await commercantInformationsUpdatePage.save();
        expect(await commercantInformationsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await commercantInformationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CommercantInformations', async () => {
        const nbButtonsBeforeDelete = await commercantInformationsComponentsPage.countDeleteButtons();
        await commercantInformationsComponentsPage.clickOnLastDeleteButton();

        commercantInformationsDeleteDialog = new CommercantInformationsDeleteDialog();
        expect(await commercantInformationsDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.commercantInformations.delete.question');
        await commercantInformationsDeleteDialog.clickOnConfirmButton();

        expect(await commercantInformationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
