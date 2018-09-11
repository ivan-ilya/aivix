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
const request = require('supertest');

const urls = [
    "http://tracker.aivix.com/profile",
    "http://tracker.aivix.com/offers",
    "http://tracker.aivix.com/offers/930/view",
    "http://tracker.aivix.com/offers?f1l_name=1&f1filters%40os_types=Android&f1filters%40countries%5B%5D=GR&f1vertical_id%5B%5D=0&f1offer_mode=CPA&f1offer_flow%5B%5D=Default&f1offers%40status=active",
    "http://tracker.aivix.com/smartlinks",
    "http://tracker.aivix.com/conversions?f1goal_number[]=0&filter1_conversions@offer_id=-139",
    "http://tracker.aivix.com/conversions?f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=GR&f1conversions%40status%5B%5D=hold&f1conversions%40postback_status=queued&f1cost=1&f1f_conversions%40click_ts=2018-08-13&f1t_conversions%40click_ts=2018-08-13&f1f_conversions%40ts=2018-08-13&f1t_conversions%40ts=2018-08-13&f1goal_number%5B%5D=0&f1goal_number%5B%5D=1&f1id=1&f1ipaddr=1&f1conversions%40flags%5B%5D=0",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?base_on=offer&ts_linked_to=1&timezone=UTC&lines=25&cols%5B%5D=smartlink&cols%5B%5D=country&cols%5B%5D=land_id&cols%5B%5D=preland_id&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_offers&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=cr&cols%5B%5D=aff_epc&cols%5B%5D=cost&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost",
    "http://tracker.aivix.com/payouts",
    "http://tracker.aivix.com/payouts/settings",
    "http://tracker.aivix.com/payouts?f1type=auto&f1aff_payment_id=641&f1payouts%40status=pending&f1f_payouts%40created_at=2018-08-13&f1t_payouts%40created_at=2018-08-13",
    "http://tracker.aivix.com/payouts/referral",
    "http://tracker.aivix.com/payouts/referral?f1f_payouts%40created_at=2018-08-13&f1t_payouts%40created_at=2018-08-13&f1payouts%40source_id=%D0%B0%D0%B0&f1payouts%40status=success",
    "http://tracker.aivix.com/offers/shortlinks",
    "http://tracker.aivix.com/offers/shortlinks?f1l_id=23",
    "http://tracker.aivix.com/domain/parking_domain",
    "http://tracker.aivix.com/domain/parking_domain?f1l_domain=e",
    "http://tracker.aivix.com/domain/add_parking_domain",
    "http://tracker.aivix.com/tickets"
];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин аффа');
        await driver.findElement(By.id('password')).sendKeys('пароль аффа');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
    });
    after(async function () {
        return await driver.quit();
    });
    describe('test', function () {
        it('', async function () {
            const requester = request("http://tracker.aivix.com/")
            const listPromisesUrls = urls.map(function (url) {
                return requester.get(url.slice(24))
            });
            const responses = await Promise.all(listPromisesUrls)
            responses.forEach(function (item) {
                console.log(item.headers.location)
                expect(item).to.own.include({statusCode:302});
            });
        });
    });
});
