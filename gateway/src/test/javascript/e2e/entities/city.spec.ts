import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('City e2e test', () => {

    let navBarPage: NavBarPage;
    let cityDialogPage: CityDialogPage;
    let cityComponentsPage: CityComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cities', () => {
        navBarPage.goToEntity('city');
        cityComponentsPage = new CityComponentsPage();
        expect(cityComponentsPage.getTitle()).toMatch(/deliveryApp.city.home.title/);

    });

    it('should load create City dialog', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage = new CityDialogPage();
        expect(cityDialogPage.getModalTitle()).toMatch(/deliveryApp.city.home.createOrEditLabel/);
        cityDialogPage.close();
    });

    it('should create and save Cities', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage.setNameInput('name');
        expect(cityDialogPage.getNameInput()).toMatch('name');
        cityDialogPage.setSymbolInput('symbol');
        expect(cityDialogPage.getSymbolInput()).toMatch('symbol');
        cityDialogPage.stateSelectLastOption();
        cityDialogPage.save();
        expect(cityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-city div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CityDialogPage {
    modalTitle = element(by.css('h4#myCityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    symbolInput = element(by.css('input#field_symbol'));
    stateSelect = element(by.css('select#field_state'));
    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }
    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }
    setSymbolInput = function (symbol) {
        this.symbolInput.sendKeys(symbol);
    }
    getSymbolInput = function () {
        return this.symbolInput.getAttribute('value');
    }
    stateSelectLastOption = function () {
        this.stateSelect.all(by.tagName('option')).last().click();
    }
    stateSelectOption = function (option) {
        this.stateSelect.sendKeys(option);
    }
    getStateSelect = function () {
        return this.stateSelect;
    }
    getStateSelectedOption = function () {
        return this.stateSelect.element(by.css('option:checked')).getText();
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
