import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('UserExtra e2e test', () => {

    let navBarPage: NavBarPage;
    let userExtraDialogPage: UserExtraDialogPage;
    let userExtraComponentsPage: UserExtraComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserExtras', () => {
        navBarPage.goToEntity('user-extra');
        userExtraComponentsPage = new UserExtraComponentsPage();
        expect(userExtraComponentsPage.getTitle()).toMatch(/deliveryApp.userExtra.home.title/);

    });

    it('should load create UserExtra dialog', () => {
        userExtraComponentsPage.clickOnCreateButton();
        userExtraDialogPage = new UserExtraDialogPage();
        expect(userExtraDialogPage.getModalTitle()).toMatch(/deliveryApp.userExtra.home.createOrEditLabel/);
        userExtraDialogPage.close();
    });

    it('should create and save UserExtras', () => {
        userExtraComponentsPage.clickOnCreateButton();
        userExtraDialogPage.setFirstNameInput('firstName');
        expect(userExtraDialogPage.getFirstNameInput()).toMatch('firstName');
        userExtraDialogPage.setLastNameInput('lastName');
        expect(userExtraDialogPage.getLastNameInput()).toMatch('lastName');
        userExtraDialogPage.setEmailInput('email');
        expect(userExtraDialogPage.getEmailInput()).toMatch('email');
        userExtraDialogPage.setPhoneNumberInput('phoneNumber');
        expect(userExtraDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        userExtraDialogPage.setCommentsInput('comments');
        expect(userExtraDialogPage.getCommentsInput()).toMatch('comments');
        userExtraDialogPage.locationSelectLastOption();
        userExtraDialogPage.save();
        expect(userExtraDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserExtraComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-extra div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserExtraDialogPage {
    modalTitle = element(by.css('h4#myUserExtraLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    commentsInput = element(by.css('input#field_comments'));
    locationSelect = element(by.css('select#field_location'));
    setFirstNameInput = function (firstName) {
        this.firstNameInput.sendKeys(firstName);
    }
    getFirstNameInput = function () {
        return this.firstNameInput.getAttribute('value');
    }
    setLastNameInput = function (lastName) {
        this.lastNameInput.sendKeys(lastName);
    }
    getLastNameInput = function () {
        return this.lastNameInput.getAttribute('value');
    }
    setEmailInput = function (email) {
        this.emailInput.sendKeys(email);
    }
    getEmailInput = function () {
        return this.emailInput.getAttribute('value');
    }
    setPhoneNumberInput = function (phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    }
    getPhoneNumberInput = function () {
        return this.phoneNumberInput.getAttribute('value');
    }
    setCommentsInput = function (comments) {
        this.commentsInput.sendKeys(comments);
    }
    getCommentsInput = function () {
        return this.commentsInput.getAttribute('value');
    }
    locationSelectLastOption = function () {
        this.locationSelect.all(by.tagName('option')).last().click();
    }
    locationSelectOption = function (option) {
        this.locationSelect.sendKeys(option);
    }
    getLocationSelect = function () {
        return this.locationSelect;
    }
    getLocationSelectedOption = function () {
        return this.locationSelect.element(by.css('option:checked')).getText();
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
