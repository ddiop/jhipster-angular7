/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonneComponentsPage, PersonneDeleteDialog, PersonneUpdatePage } from './personne.page-object';

const expect = chai.expect;

describe('Personne e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let personneUpdatePage: PersonneUpdatePage;
    let personneComponentsPage: PersonneComponentsPage;
    let personneDeleteDialog: PersonneDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Personnes', async () => {
        await navBarPage.goToEntity('personne');
        personneComponentsPage = new PersonneComponentsPage();
        await browser.wait(ec.visibilityOf(personneComponentsPage.title), 5000);
        expect(await personneComponentsPage.getTitle()).to.eq('jhipsterApp.personne.home.title');
    });

    it('should load create Personne page', async () => {
        await personneComponentsPage.clickOnCreateButton();
        personneUpdatePage = new PersonneUpdatePage();
        expect(await personneUpdatePage.getPageTitle()).to.eq('jhipsterApp.personne.home.createOrEditLabel');
        await personneUpdatePage.cancel();
    });

    it('should create and save Personnes', async () => {
        const nbButtonsBeforeCreate = await personneComponentsPage.countDeleteButtons();

        await personneComponentsPage.clickOnCreateButton();
        await promise.all([
            personneUpdatePage.setSurnomInput('surnom'),
            personneUpdatePage.civiliteSelectLastOption(),
            personneUpdatePage.setPrenomInput('prenom'),
            personneUpdatePage.setNomInput('nom'),
            personneUpdatePage.setMailInput('mail'),
            personneUpdatePage.setPasswordInput('password'),
            personneUpdatePage.setDateNaissanceInput('2000-12-31'),
            personneUpdatePage.setCguVersionInput('5'),
            personneUpdatePage.setCguDateValidationInput('2000-12-31'),
            personneUpdatePage.langueSelectLastOption(),
            personneUpdatePage.adresseResidenceSelectLastOption()
            // personneUpdatePage.deviceSelectLastOption(),
        ]);
        expect(await personneUpdatePage.getSurnomInput()).to.eq('surnom');
        expect(await personneUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await personneUpdatePage.getNomInput()).to.eq('nom');
        expect(await personneUpdatePage.getMailInput()).to.eq('mail');
        expect(await personneUpdatePage.getPasswordInput()).to.eq('password');
        expect(await personneUpdatePage.getDateNaissanceInput()).to.eq('2000-12-31');
        expect(await personneUpdatePage.getCguVersionInput()).to.eq('5');
        const selectedCguValide = personneUpdatePage.getCguValideInput();
        if (await selectedCguValide.isSelected()) {
            await personneUpdatePage.getCguValideInput().click();
            expect(await personneUpdatePage.getCguValideInput().isSelected()).to.be.false;
        } else {
            await personneUpdatePage.getCguValideInput().click();
            expect(await personneUpdatePage.getCguValideInput().isSelected()).to.be.true;
        }
        expect(await personneUpdatePage.getCguDateValidationInput()).to.eq('2000-12-31');
        await personneUpdatePage.save();
        expect(await personneUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await personneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Personne', async () => {
        const nbButtonsBeforeDelete = await personneComponentsPage.countDeleteButtons();
        await personneComponentsPage.clickOnLastDeleteButton();

        personneDeleteDialog = new PersonneDeleteDialog();
        expect(await personneDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.personne.delete.question');
        await personneDeleteDialog.clickOnConfirmButton();

        expect(await personneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
