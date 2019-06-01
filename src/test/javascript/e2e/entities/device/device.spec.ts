/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeviceComponentsPage, DeviceDeleteDialog, DeviceUpdatePage } from './device.page-object';

const expect = chai.expect;

describe('Device e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deviceUpdatePage: DeviceUpdatePage;
    let deviceComponentsPage: DeviceComponentsPage;
    let deviceDeleteDialog: DeviceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Devices', async () => {
        await navBarPage.goToEntity('device');
        deviceComponentsPage = new DeviceComponentsPage();
        await browser.wait(ec.visibilityOf(deviceComponentsPage.title), 5000);
        expect(await deviceComponentsPage.getTitle()).to.eq('jhipsterApp.device.home.title');
    });

    it('should load create Device page', async () => {
        await deviceComponentsPage.clickOnCreateButton();
        deviceUpdatePage = new DeviceUpdatePage();
        expect(await deviceUpdatePage.getPageTitle()).to.eq('jhipsterApp.device.home.createOrEditLabel');
        await deviceUpdatePage.cancel();
    });

    it('should create and save Devices', async () => {
        const nbButtonsBeforeCreate = await deviceComponentsPage.countDeleteButtons();

        await deviceComponentsPage.clickOnCreateButton();
        await promise.all([
            deviceUpdatePage.setUuidInput('uuid'),
            deviceUpdatePage.setNumeroInput('numero'),
            deviceUpdatePage.setIndicatifInternationalInput('5'),
            deviceUpdatePage.setNotificationUidInput('notificationUid'),
            deviceUpdatePage.setMarqueInput('marque'),
            deviceUpdatePage.setModelInput('model'),
            deviceUpdatePage.setActivationCodeInput('5'),
            deviceUpdatePage.setActivationTentativeInput('5'),
            deviceUpdatePage.setActivationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await deviceUpdatePage.getUuidInput()).to.eq('uuid');
        expect(await deviceUpdatePage.getNumeroInput()).to.eq('numero');
        expect(await deviceUpdatePage.getIndicatifInternationalInput()).to.eq('5');
        expect(await deviceUpdatePage.getNotificationUidInput()).to.eq('notificationUid');
        expect(await deviceUpdatePage.getMarqueInput()).to.eq('marque');
        expect(await deviceUpdatePage.getModelInput()).to.eq('model');
        expect(await deviceUpdatePage.getActivationCodeInput()).to.eq('5');
        expect(await deviceUpdatePage.getActivationTentativeInput()).to.eq('5');
        expect(await deviceUpdatePage.getActivationDateInput()).to.contain('2001-01-01T02:30');
        await deviceUpdatePage.save();
        expect(await deviceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Device', async () => {
        const nbButtonsBeforeDelete = await deviceComponentsPage.countDeleteButtons();
        await deviceComponentsPage.clickOnLastDeleteButton();

        deviceDeleteDialog = new DeviceDeleteDialog();
        expect(await deviceDeleteDialog.getDialogTitle()).to.eq('jhipsterApp.device.delete.question');
        await deviceDeleteDialog.clickOnConfirmButton();

        expect(await deviceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
