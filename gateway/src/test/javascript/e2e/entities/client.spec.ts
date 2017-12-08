import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('Client e2e test', () => {

    let navBarPage: NavBarPage;
    let clientDialogPage: ClientDialogPage;
    let clientComponentsPage: ClientComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clients', () => {
        navBarPage.goToEntity('client');
        clientComponentsPage = new ClientComponentsPage();
        expect(clientComponentsPage.getTitle()).toMatch(/deliveryApp.client.home.title/);

    });

    it('should load create Client dialog', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage = new ClientDialogPage();
        expect(clientDialogPage.getModalTitle()).toMatch(/deliveryApp.client.home.createOrEditLabel/);
        clientDialogPage.close();
    });

    it('should create and save Clients', () => {
        clientComponentsPage.clickOnCreateButton();
        clientDialogPage.setScoreInput('5');
        expect(clientDialogPage.getScoreInput()).toMatch('5');
        clientDialogPage.userExtraSelectLastOption();
        clientDialogPage.save();
        expect(clientDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClientComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-client div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClientDialogPage {
    modalTitle = element(by.css('h4#myClientLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    scoreInput = element(by.css('input#field_score'));
    userExtraSelect = element(by.css('select#field_userExtra'));
    setScoreInput = function (score) {
        this.scoreInput.sendKeys(score);
    }
    getScoreInput = function () {
        return this.scoreInput.getAttribute('value');
    }
    userExtraSelectLastOption = function () {
        this.userExtraSelect.all(by.tagName('option')).last().click();
    }
    userExtraSelectOption = function (option) {
        this.userExtraSelect.sendKeys(option);
    }
    getUserExtraSelect = function () {
        return this.userExtraSelect;
    }
    getUserExtraSelectedOption = function () {
        return this.userExtraSelect.element(by.css('option:checked')).getText();
    }

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
