/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EvenementComponentsPage, EvenementDeleteDialog, EvenementUpdatePage } from './evenement.page-object';

const expect = chai.expect;

describe('Evenement e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let evenementUpdatePage: EvenementUpdatePage;
    let evenementComponentsPage: EvenementComponentsPage;
    let evenementDeleteDialog: EvenementDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Evenements', async () => {
        await navBarPage.goToEntity('evenement');
        evenementComponentsPage = new EvenementComponentsPage();
        await browser.wait(ec.visibilityOf(evenementComponentsPage.title), 5000);
        expect(await evenementComponentsPage.getTitle()).to.eq('jhipsterApp.evenement.home.title');
    });

    it('should load create Evenement page', async () => {
        await evenementComponentsPage.clickOnCreateButton();
        evenementUpdatePage = new EvenementUpdatePage();
        expect(await evenementUpdatePage.getPageTitle()).to.eq('jhipsterApp.evenement.home.createOrEditLabel');
        await evenementUpdatePage.cancel();
    });

    it('should create and save Evenements', async () => {
        const nbButtonsBeforeCreate = await evenementComponentsPage.countDeleteButtons();

        await evenementComponentsPage.clickOnCreateButton();
        await promise.all([
            evenementUpdatePage.setNomInput('nom'),
            evenementUpdatePage.setDetailInput('detail'),
            evenementUpdatePage.setLieuDepartInput('lieuDepart'),
            evenementUpdatePage.setLieuDestinationInput('lieuDestination'),
            evenementUpdatePage.setDateDepartInput('2000-12-31'),
            evenementUpdatePage.setDateRetourInput('2000-12-31'),
            evenementUpdatePage.setDateReflexionInput('2000-12-31'),
            evenementUpdatePage.setDateCreationInput('2000-12-31'),
            evenementUpdatePage.commercantSelectLastOption()
        ]);
        expect(await evenementUpdatePage.getNomInput()).to.eq('nom');
        expect(await evenementUpdatePage.getDetailInput()).to.eq('detail');
        expect(await evenementUpdatePage.getLieuDepartInput()).to.eq('lieuDepart');
        expect(await evenementUpdatePage.getLieuDestinationInput()).to.eq('lieuDestination');
        expect(await evenementUpdatePage.getDateDepartInput()).to.eq('2000-12-31');
        expect(await evenementUpdatePage.getDateRetourInput()).to.eq('2000-12-31');
        expect(await evenementUpdatePage.getDateReflexionInput()).to.eq('2000-12-31');
        expect(await evenementUpdatePage.getDateCreationInput()).to.eq('2000-12-31');
        await evenementUpdatePage.save();
        expect(await evenementUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await evenementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Evenement', async () => {
        const nbButtonsBeforeDelete = await evenementComponentsPage.countDeleteButtons();
        await evenementComponentsPage.clickOnLastDeleteButton();

        evenementDeleteDialog = new EvenementDeleteDialog();
        expect(await evenementDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.evenement.delete.question');
        await evenementDeleteDialog.clickOnConfirmButton();

        expect(await evenementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
