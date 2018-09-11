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

function createdPromiseTimeout(ms){
    return new Promise(function (resolve) {
        setTimeout(resolve,ms);
    });
};
describe('login as', function() {
    before(async function() {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
    });
    after(async function(){
        return await driver.quit();
    });

    describe('created conversion', function() {
        let sessionId;
        before (async function(){
            await driver.get('tracker.aivix.com:8080/tracker?offer_id=930&aff_id=8');
            const element = driver.findElement(By.css('form[action="/register.html"] input[name="session"]'));
            sessionId = await element.getAttribute("value");
            await createdPromiseTimeout(30000);
            await driver.get('http://tracker.aivix.com:8080/aff_goal?goal_id=1037&transaction_id=' + sessionId);
        });
        it('check created conversion', async function() {
            await driver.get('http://tracker.aivix.com/conversions?f1conversions%40affiliate_id%5B%5D=8&f1conversions%40offer_id%5B%5D=930&f1goal_number%5B%5D=0');
            const actions = await driver.findElement(By.css('form[id=filter_form_1] table tr:nth-child(3) td:nth-child(19)')).getAttribute("innerHTML");
            const arr = actions.split('<br>');
            const element = arr[1];
            expect(element).to.be.equal(sessionId);
        });
    });
});

