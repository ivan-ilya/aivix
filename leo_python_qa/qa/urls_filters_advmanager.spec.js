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
    "http://tracker.aivix.com/users/approval",
    "http://tracker.aivix.com/recls/approval",
    "http://tracker.aivix.com/offers",
    "http://tracker.aivix.com/offers/edit/930/details",
    "http://tracker.aivix.com/offers/930/view",
    "http://tracker.aivix.com/offers/create/0/details",
    "http://tracker.aivix.com/offers/edit/930/creatives",
    "http://tracker.aivix.com/offers/edit/930/affiliates",
    "http://tracker.aivix.com/smartlinks",
    "http://tracker.aivix.com/offers?f1l_name=1&f1type%5B%5D=new&f1goal_data%5B%5D=3&f1offers%40advertiser_id%5B%5D=1&f1offer_mode%5B%5D=CPA&f1offer_flow%5B%5D=Default&f1filters%40traffic_sources%5B%5D=seo&f1filters%40os_types%5B%5D=Android&f1filters%40browser_types%5B%5D=Chrome&f1filters%40countries%5B%5D=GR&f1vertical_id%5B%5D=0&f1offers%40status%5B%5D=pending",
    "http://tracker.aivix.com/smartlinks?f1l_id=1&f1l_name=1",
    "http://tracker.aivix.com/offers/tariffs",
    "http://tracker.aivix.com/offers/tariffs?f1tariffs%40id=2&f1tariffs%40goal_id=3&f1affiliate_id=2&f1countries%5B%5D=HK",
    "http://tracker.aivix.com/offers/landpages",
    "http://tracker.aivix.com/offers/landpages?f1id=2&f1name=test%20preland&f1countries%5B%5D=GR&f1type=preland&f1connection_type=mobile&f1vertical_id=0&f1language=ar",
    "http://tracker.aivix.com/offers/caps",
    "http://tracker.aivix.com/offers/caps?f1affiliateID=2&f1offer_id=0&f1l_aff_sub=2&f1cap_status=daily",
    "http://tracker.aivix.com/offers/promos",
    "http://tracker.aivix.com/offers/promos?f1l_promos%40id=2&f1description=730&f1type=image",
    "http://tracker.aivix.com/conversions?f1goal_number[]=0",
    "http://tracker.aivix.com/conversions?f1advertiser_id=1&f1affiliateID=1&f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=GR&f1conversions%40status%5B%5D=blocked&f1conversions%40postback_status=queued&f1revenue=1&f1f_conversions%40click_ts=2018-08-13&f1t_conversions%40click_ts=2018-08-13&f1f_conversions%40ts=2018-08-13&f1t_conversions%40ts=2018-08-13&f1goal_number%5B%5D=0&f1goal_number%5B%5D=1&f1id=1&f1affiliate_manager=301&f1ipaddr=1&f1conversions%40flags%5B%5D=0",
    "http://tracker.aivix.com/click/test_affiliates",
    "http://tracker.aivix.com/click/test_affiliates?f1id=1&f1offer_id=1&f1affiliate_id=8&f1country%5B%5D=GR",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-14&f1t_ts=2018-08-14&base_on=advertiser&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=revenue&grp=1",
    "http://tracker.aivix.com/stats/fast_reports",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=conv_count&cols[]=revenue&lines=25&grp=1&f1f_ts=2018-07-01&f1t_ts=2018-08-01&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=offer&cols[]=advertiser&cols[]=conv_count&cols[]=epc&cols[]=revenue&lines=25&f1f_ts=2018-08-07&f1t_ts=2018-08-14&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=offer&cols[]=affiliate_id&cols[]=affiliate_manager_id&cols[]=clicks_count&cols[]=conv_count&cols[]=epc&cols[]=revenue&lines=25&run=1&f1f_ts=2018-08-13&f1t_ts=2018-08-14&run=1",
    "http://tracker.aivix.com/payouts/invoices",
    "http://tracker.aivix.com/payouts/invoices?f1offers_cost=2&f1advertiser_id=1&f1payment_method_id=1&f1company_id=6&f1f_period=2018-08-13&f1t_period=2018-08-13",
    "http://tracker.aivix.com/payouts/invoices/0/edit",
    "http://tracker.aivix.com/payouts/incomes",
    "http://tracker.aivix.com/payouts/incomes?f1advertiser_id=1&f1payment_method_id=1&f1l_legal_name=2&f1currency=USD&f1cost=2&f1cost_in_usd=2&f1f_created_at=2018-08-13&f1t_created_at=2018-08-13&f1f_actual_income_date=2018-08-13&f1t_actual_income_date=2018-08-13&f1f_period=2018-08-13&f1t_period=2018-08-13&f1l_comment=2",
    "http://tracker.aivix.com/payouts/incomes/0/edit",
    "http://tracker.aivix.com/payouts/incomes/4/edit",
    "http://tracker.aivix.com/recls",
    "http://tracker.aivix.com/recls?f1l_advertisers%40id=1&f1advertiser=1&f1advertisers%40tag%5B%5D=Facebook%20-%20Nutra&f1advertisers%40status=pending",
    "http://tracker.aivix.com/recls/0/edit",
    "http://tracker.aivix.com/recls/1/edit",
    "http://tracker.aivix.com/deferred_actions",
    "http://tracker.aivix.com/deferred_actions?f1model=App%5CModels%5COfferAffiliate&f1model_id=1&f1f_created_at=2018-08-13&f1t_created_at=2018-08-13&f1f_trigger_time=2018-08-13&f1t_trigger_time=2018-08-13"
];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
        await driver.get('http://tracker.aivix.com/users');
        await driver.findElement(By.css('form[id=filter_form_1] table tr:nth-child(15) td:last-child div:last-child')).click();
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
