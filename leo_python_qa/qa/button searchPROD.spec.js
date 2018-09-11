const webdriver = require('selenium-webdriver');
var By = webdriver.By;
const chrome = require('selenium-webdriver/chrome');

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions()
    .build();
const assert = require('assert');
const chai = require('chai');
const chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));
const expect = chai.expect;

describe('button_search', function() {
    before(async function() {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
    });
    after(async function(){
        return await driver.quit();
    });

    describe('button_search', function() {

        it('button_search_offers', async function() {
            await driver.get('http://tracker.aivix.com/offers');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(2) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_smartlinks', async function() {
            await driver.get('http://tracker.aivix.com/smartlinks');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(4);
        });

        it('button_search_slylinks', async function() {
            await driver.get('http://tracker.aivix.com/slylinks');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(2);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_tariffs', async function() {
            await driver.get('http://tracker.aivix.com/offers/tariffs');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_verticals', async function() {
            await driver.get('http://tracker.aivix.com/offers/verticals');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_landpages', async function() {
            await driver.get('http://tracker.aivix.com/offers/landpages');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_shortlinks', async function() {
            await driver.get('http://tracker.aivix.com/offers/shortlinks');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(2);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_caps', async function() {
            await driver.get('http://tracker.aivix.com/offers/caps');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_promos', async function() {
            await driver.get('http://tracker.aivix.com/offers/promos');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(6);
            const actions2typehtml = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2typehtml.length).to.be.equal(3);
            const actions2typeimage = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(5) td:last-child > div'));
            expect(actions2typeimage.length).to.be.equal(3);
            const actions2typeemail = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(7) td:last-child > div'));
            expect(actions2typeemail.length).to.be.equal(3);
        });

        it('button_search_conversions', async function() {
            await driver.get('http://tracker.aivix.com/conversions?filter1_goal_number[]=0');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(5);
            await driver.get('http://tracker.aivix.com/conversions?f1goal_number[]=0&f1conversions@status[]=pending');
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions2.length).to.be.equal(8);
            await driver.get('http://tracker.aivix.com/conversions?f1conversions%40status=blocked');
            const actions3 = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions3.length).to.be.equal(5);
            await driver.get('http://tracker.aivix.com/conversions?f1conversions%40status%5B%5D=hold&f1goal_number%5B%5D=0');
            const actions4 = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions4.length).to.be.equal(7);
            await driver.get('http://tracker.aivix.com/conversions?f1conversions%40status%5B%5D=approved&f1goal_number%5B%5D=0');
            const actions5 = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions5.length).to.be.equal(7);
            await driver.get('http://tracker.aivix.com/conversions?f1conversions%40status=declined');
            const actions6 = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions6.length).to.be.equal(5);
        });

        it('button_search_pixels', async function() {
            await driver.get('http://tracker.aivix.com/conversions/pixels');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_payouts', async function() {
            await driver.get('http://tracker.aivix.com/payouts');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(7);
        });

        it('button_search_Referral', async function() {
            await driver.get('http://tracker.aivix.com/payouts/referral');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(5);
        });

        it('button_search_invoices', async function() {
            await driver.get('http://tracker.aivix.com/payouts/invoices');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
        });

        it('button_search_affiliates', async function() {
            await driver.get('http://tracker.aivix.com/affiliates');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_Advertisers', async function() {
            await driver.get('http://tracker.aivix.com/recls');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_tips', async function() {
            await driver.get('http://tracker.aivix.com/tips');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_fields_approve', async function() {
            await driver.get('http://tracker.aivix.com/fields_approve');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(4);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_Managers', async function() {
            await driver.get('http://tracker.aivix.com/users');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_roles', async function() {
            await driver.get('http://tracker.aivix.com/settings/roles');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_permissions', async function() {
            await driver.get('http://tracker.aivix.com/settings/permissions');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_tags', async function() {
            await driver.get('http://tracker.aivix.com/settings/tags');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(2);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_Tracking Domains', async function() {
            await driver.get('http://tracker.aivix.com/settings/tracking');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(1);
        });

        it('button_search_payments', async function() {
            await driver.get('http://tracker.aivix.com/settings/payments');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
        });

        it('button_search_triggers', async function() {
            await driver.get('http://tracker.aivix.com/triggers/groups');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_triggers categories', async function() {
            await driver.get('http://tracker.aivix.com/triggers/categories');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_Pending Users', async function() {
            await driver.get('http://tracker.aivix.com/users/approval');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(2);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_Pending Affiliates', async function() {
            await driver.get('http://tracker.aivix.com/affiliates/approval');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(6);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_Pending advertisers', async function() {
            await driver.get('http://tracker.aivix.com/recls/approval');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(5);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(3);
        });

        it('button_search_Pending Offer Affiliates', async function() {
            await driver.get('http://tracker.aivix.com/offers/approval');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(5);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

        it('button_search_Pending Smartlink Affiliates', async function() {
            await driver.get('http://tracker.aivix.com/smartlinks/approval');
            const actions = await driver.findElements(By.css('form[id=filter_form_1] table tr:first-child th:last-child > div'));
            expect(actions.length).to.be.equal(3);
            const actions2 = await driver.findElements(By.css('form[id=filter_form_1] table tr:nth-child(3) td:last-child > div'));
            expect(actions2.length).to.be.equal(2);
        });

    });

});