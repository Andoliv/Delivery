import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('DeliveryMan e2e test', () => {

    let navBarPage: NavBarPage;
    let deliveryManDialogPage: DeliveryManDialogPage;
    let deliveryManComponentsPage: DeliveryManComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DeliveryMen', () => {
        navBarPage.goToEntity('delivery-man');
        deliveryManComponentsPage = new DeliveryManComponentsPage();
        expect(deliveryManComponentsPage.getTitle()).toMatch(/deliveryApp.deliveryMan.home.title/);

    });

    it('should load create DeliveryMan dialog', () => {
        deliveryManComponentsPage.clickOnCreateButton();
        deliveryManDialogPage = new DeliveryManDialogPage();
        expect(deliveryManDialogPage.getModalTitle()).toMatch(/deliveryApp.deliveryMan.home.createOrEditLabel/);
        deliveryManDialogPage.close();
    });

    it('should create and save DeliveryMen', () => {
        deliveryManComponentsPage.clickOnCreateButton();
        deliveryManDialogPage.setSalaryInput('salary');
        expect(deliveryManDialogPage.getSalaryInput()).toMatch('salary');
        deliveryManDialogPage.userExtraSelectLastOption();
        deliveryManDialogPage.save();
        expect(deliveryManDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DeliveryManComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-delivery-man div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DeliveryManDialogPage {
    modalTitle = element(by.css('h4#myDeliveryManLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    salaryInput = element(by.css('input#field_salary'));
    userExtraSelect = element(by.css('select#field_userExtra'));
    setSalaryInput = function (salary) {
        this.salaryInput.sendKeys(salary);
    }
    getSalaryInput = function () {
        return this.salaryInput.getAttribute('value');
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
