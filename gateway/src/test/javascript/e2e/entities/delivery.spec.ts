import {browser, by, element} from 'protractor';
import {NavBarPage} from './../page-objects/jhi-page-objects';

const path = require('path');

describe('Delivery e2e test', () => {

    let navBarPage: NavBarPage;
    let deliveryDialogPage: DeliveryDialogPage;
    let deliveryComponentsPage: DeliveryComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Deliveries', () => {
        navBarPage.goToEntity('delivery');
        deliveryComponentsPage = new DeliveryComponentsPage();
        expect(deliveryComponentsPage.getTitle()).toMatch(/deliveryApp.delivery.home.title/);

    });

    it('should load create Delivery dialog', () => {
        deliveryComponentsPage.clickOnCreateButton();
        deliveryDialogPage = new DeliveryDialogPage();
        expect(deliveryDialogPage.getModalTitle()).toMatch(/deliveryApp.delivery.home.createOrEditLabel/);
        deliveryDialogPage.close();
    });

    it('should create and save Deliveries', () => {
        deliveryComponentsPage.clickOnCreateButton();
        deliveryDialogPage.setTitleInput('title');
        expect(deliveryDialogPage.getTitleInput()).toMatch('title');
        deliveryDialogPage.setDescriptionInput('description');
        expect(deliveryDialogPage.getDescriptionInput()).toMatch('description');
        deliveryDialogPage.setValueInput('5');
        expect(deliveryDialogPage.getValueInput()).toMatch('5');
        deliveryDialogPage.setExpectedDistanceInput('5');
        expect(deliveryDialogPage.getExpectedDistanceInput()).toMatch('5');
        deliveryDialogPage.setTravelledDistanceInput('5');
        expect(deliveryDialogPage.getTravelledDistanceInput()).toMatch('5');
        deliveryDialogPage.setExpectedCostInput('5');
        expect(deliveryDialogPage.getExpectedCostInput()).toMatch('5');
        deliveryDialogPage.setTotalCostInput('5');
        expect(deliveryDialogPage.getTotalCostInput()).toMatch('5');
        deliveryDialogPage.setDeliveryQualityInput('deliveryQuality');
        expect(deliveryDialogPage.getDeliveryQualityInput()).toMatch('deliveryQuality');
        deliveryDialogPage.setPaymentQualityInput('paymentQuality');
        expect(deliveryDialogPage.getPaymentQualityInput()).toMatch('paymentQuality');
        deliveryDialogPage.setExpectedTimeInput('5');
        expect(deliveryDialogPage.getExpectedTimeInput()).toMatch('5');
        deliveryDialogPage.setDeliveryTimeInput('5');
        expect(deliveryDialogPage.getDeliveryTimeInput()).toMatch('5');
        deliveryDialogPage.deliveryManSelectLastOption();
        deliveryDialogPage.clientSelectLastOption();
        deliveryDialogPage.save();
        expect(deliveryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DeliveryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-delivery div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DeliveryDialogPage {
    modalTitle = element(by.css('h4#myDeliveryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    descriptionInput = element(by.css('input#field_description'));
    valueInput = element(by.css('input#field_value'));
    expectedDistanceInput = element(by.css('input#field_expectedDistance'));
    travelledDistanceInput = element(by.css('input#field_travelledDistance'));
    expectedCostInput = element(by.css('input#field_expectedCost'));
    totalCostInput = element(by.css('input#field_totalCost'));
    deliveryQualityInput = element(by.css('input#field_deliveryQuality'));
    paymentQualityInput = element(by.css('input#field_paymentQuality'));
    expectedTimeInput = element(by.css('input#field_expectedTime'));
    deliveryTimeInput = element(by.css('input#field_deliveryTime'));
    deliveryManSelect = element(by.css('select#field_deliveryMan'));
    clientSelect = element(by.css('select#field_client'));
    setTitleInput = function (title) {
        this.titleInput.sendKeys(title);
    }
    getTitleInput = function () {
        return this.titleInput.getAttribute('value');
    }
    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }
    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }
    setValueInput = function (value) {
        this.valueInput.sendKeys(value);
    }
    getValueInput = function () {
        return this.valueInput.getAttribute('value');
    }
    setExpectedDistanceInput = function (expectedDistance) {
        this.expectedDistanceInput.sendKeys(expectedDistance);
    }
    getExpectedDistanceInput = function () {
        return this.expectedDistanceInput.getAttribute('value');
    }
    setTravelledDistanceInput = function (travelledDistance) {
        this.travelledDistanceInput.sendKeys(travelledDistance);
    }
    getTravelledDistanceInput = function () {
        return this.travelledDistanceInput.getAttribute('value');
    }
    setExpectedCostInput = function (expectedCost) {
        this.expectedCostInput.sendKeys(expectedCost);
    }
    getExpectedCostInput = function () {
        return this.expectedCostInput.getAttribute('value');
    }
    setTotalCostInput = function (totalCost) {
        this.totalCostInput.sendKeys(totalCost);
    }
    getTotalCostInput = function () {
        return this.totalCostInput.getAttribute('value');
    }
    setDeliveryQualityInput = function (deliveryQuality) {
        this.deliveryQualityInput.sendKeys(deliveryQuality);
    }
    getDeliveryQualityInput = function () {
        return this.deliveryQualityInput.getAttribute('value');
    }
    setPaymentQualityInput = function (paymentQuality) {
        this.paymentQualityInput.sendKeys(paymentQuality);
    }
    getPaymentQualityInput = function () {
        return this.paymentQualityInput.getAttribute('value');
    }
    setExpectedTimeInput = function (expectedTime) {
        this.expectedTimeInput.sendKeys(expectedTime);
    }
    getExpectedTimeInput = function () {
        return this.expectedTimeInput.getAttribute('value');
    }
    setDeliveryTimeInput = function (deliveryTime) {
        this.deliveryTimeInput.sendKeys(deliveryTime);
    }
    getDeliveryTimeInput = function () {
        return this.deliveryTimeInput.getAttribute('value');
    }
    deliveryManSelectLastOption = function () {
        this.deliveryManSelect.all(by.tagName('option')).last().click();
    }
    deliveryManSelectOption = function (option) {
        this.deliveryManSelect.sendKeys(option);
    }
    getDeliveryManSelect = function () {
        return this.deliveryManSelect;
    }
    getDeliveryManSelectedOption = function () {
        return this.deliveryManSelect.element(by.css('option:checked')).getText();
    }
    clientSelectLastOption = function () {
        this.clientSelect.all(by.tagName('option')).last().click();
    }
    clientSelectOption = function (option) {
        this.clientSelect.sendKeys(option);
    }
    getClientSelect = function () {
        return this.clientSelect;
    }
    getClientSelectedOption = function () {
        return this.clientSelect.element(by.css('option:checked')).getText();
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
