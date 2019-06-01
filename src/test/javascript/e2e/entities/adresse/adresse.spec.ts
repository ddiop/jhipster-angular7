/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdresseComponentsPage, AdresseDeleteDialog, AdresseUpdatePage } from './adresse.page-object';

const expect = chai.expect;

describe('Adresse e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let adresseUpdatePage: AdresseUpdatePage;
    let adresseComponentsPage: AdresseComponentsPage;
    let adresseDeleteDialog: AdresseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Adresses', async () => {
        await navBarPage.goToEntity('adresse');
        adresseComponentsPage = new AdresseComponentsPage();
        await browser.wait(ec.visibilityOf(adresseComponentsPage.title), 5000);
        expect(await adresseComponentsPage.getTitle()).to.eq('jhipsterApp.adresse.home.title');
    });

    it('should load create Adresse page', async () => {
        await adresseComponentsPage.clickOnCreateButton();
        adresseUpdatePage = new AdresseUpdatePage();
        expect(await adresseUpdatePage.getPageTitle()).to.eq('jhipsterApp.adresse.home.createOrEditLabel');
        await adresseUpdatePage.cancel();
    });

    it('should create and save Adresses', async () => {
        const nbButtonsBeforeCreate = await adresseComponentsPage.countDeleteButtons();

        await adresseComponentsPage.clickOnCreateButton();
        await promise.all([
            adresseUpdatePage.setAdressePostaleInput('adressePostale'),
            adresseUpdatePage.setCodePostaleInput('codePostale'),
            adresseUpdatePage.setVilleInput('ville'),
            adresseUpdatePage.setPaysInput('pays')
        ]);
        expect(await adresseUpdatePage.getAdressePostaleInput()).to.eq('adressePostale');
        expect(await adresseUpdatePage.getCodePostaleInput()).to.eq('codePostale');
        expect(await adresseUpdatePage.getVilleInput()).to.eq('ville');
        expect(await adresseUpdatePage.getPaysInput()).to.eq('pays');
        await adresseUpdatePage.save();
        expect(await adresseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Adresse', async () => {
        const nbButtonsBeforeDelete = await adresseComponentsPage.countDeleteButtons();
        await adresseComponentsPage.clickOnLastDeleteButton();

        adresseDeleteDialog = new AdresseDeleteDialog();
        expect(await adresseDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.adresse.delete.question');
        await adresseDeleteDialog.clickOnConfirmButton();

        expect(await adresseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
