/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PropConfigComponentsPage, PropConfigDeleteDialog, PropConfigUpdatePage } from './prop-config.page-object';

const expect = chai.expect;

describe('PropConfig e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let propConfigUpdatePage: PropConfigUpdatePage;
    let propConfigComponentsPage: PropConfigComponentsPage;
    let propConfigDeleteDialog: PropConfigDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PropConfigs', async () => {
        await navBarPage.goToEntity('prop-config');
        propConfigComponentsPage = new PropConfigComponentsPage();
        await browser.wait(ec.visibilityOf(propConfigComponentsPage.title), 5000);
        expect(await propConfigComponentsPage.getTitle()).to.eq('jhipsterApp.propConfig.home.title');
    });

    it('should load create PropConfig page', async () => {
        await propConfigComponentsPage.clickOnCreateButton();
        propConfigUpdatePage = new PropConfigUpdatePage();
        expect(await propConfigUpdatePage.getPageTitle()).to.eq('jhipsterApp.propConfig.home.createOrEditLabel');
        await propConfigUpdatePage.cancel();
    });

    it('should create and save PropConfigs', async () => {
        const nbButtonsBeforeCreate = await propConfigComponentsPage.countDeleteButtons();

        await propConfigComponentsPage.clickOnCreateButton();
        await promise.all([
            propConfigUpdatePage.setNomInput('nom'),
            propConfigUpdatePage.setValeurInput('valeur'),
            propConfigUpdatePage.setDescriptionInput('description'),
            propConfigUpdatePage.setVersionInput('version')
        ]);
        expect(await propConfigUpdatePage.getNomInput()).to.eq('nom');
        expect(await propConfigUpdatePage.getValeurInput()).to.eq('valeur');
        expect(await propConfigUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await propConfigUpdatePage.getVersionInput()).to.eq('version');
        await propConfigUpdatePage.save();
        expect(await propConfigUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await propConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PropConfig', async () => {
        const nbButtonsBeforeDelete = await propConfigComponentsPage.countDeleteButtons();
        await propConfigComponentsPage.clickOnLastDeleteButton();

        propConfigDeleteDialog = new PropConfigDeleteDialog();
        expect(await propConfigDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.propConfig.delete.question');
        await propConfigDeleteDialog.clickOnConfirmButton();

        expect(await propConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
