import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('Country e2e test', () => {

    let navBarPage: NavBarPage;
    let countryDialogPage: CountryDialogPage;
    let countryComponentsPage: CountryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle()).toMatch(/deliveryApp.country.home.title/);

    });

    it('should load create Country dialog', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage = new CountryDialogPage();
        expect(countryDialogPage.getModalTitle()).toMatch(/deliveryApp.country.home.createOrEditLabel/);
        countryDialogPage.close();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryDialogPage.setNameInput('name');
        expect(countryDialogPage.getNameInput()).toMatch('name');
        countryDialogPage.setSymbolInput('symbol');
        expect(countryDialogPage.getSymbolInput()).toMatch('symbol');
        countryDialogPage.save();
        expect(countryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CountryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-country div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CountryDialogPage {
    modalTitle = element(by.css('h4#myCountryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    symbolInput = element(by.css('input#field_symbol'));
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
