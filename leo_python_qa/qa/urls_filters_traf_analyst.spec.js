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
    "http://tracker.aivix.com/offers?f1l_name=1&f1type%5B%5D=new&f1goal_data%5B%5D=1&f1offers%40advertiser_id%5B%5D=1&f1offer_mode%5B%5D=CPL&f1offer_flow%5B%5D=Default&f1filters%40traffic_sources%5B%5D=adult&f1filters%40os_types%5B%5D=Windows&f1filters%40browser_types%5B%5D=MSIE&f1filters%40countries%5B%5D=GR&f1vertical_id%5B%5D=0&f1offers%40status%5B%5D=active",
    "http://tracker.aivix.com/offers/create/0/details",
    "http://tracker.aivix.com/offers/clone/2671/details",
    "http://tracker.aivix.com/offers/edit/930/creatives",
    "http://tracker.aivix.com/offers/edit/930/affiliates",
    "http://tracker.aivix.com/offers/930/view",
    "http://tracker.aivix.com/smartlinks",
    "http://tracker.aivix.com/smartlinks?f1l_id=1&f1l_name=1",
    "http://tracker.aivix.com/offers/tariffs",
    "http://tracker.aivix.com/offers/tariffs?f1tariffs%40id=1&f1tariffs%40goal_id=1&f1tariffs%40affiliate_id=2&f1countries%5B%5D=GR",
    "http://tracker.aivix.com/offers/landpages",
    "http://tracker.aivix.com/offers/landpages?f1id=1&f1name=test&f1countries%5B%5D=GR&f1type=preland&f1connection_type=responsive&f1vertical_id=1&f1language=ar",
    "http://tracker.aivix.com/offers/caps",
    "http://tracker.aivix.com/offers/caps?f1offer_id=0&f1affiliate_id=0&f1l_aff_sub=1&f1cap_status=lifetime",
    "http://tracker.aivix.com/conversions?f1goal_number[]=0",
    "http://tracker.aivix.com/conversions?f1conversions%40affiliate_id%5B%5D=1&f1advertiser_id%5B%5D=4&f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=HK&f1conversions%40status%5B%5D=declined&f1conversions%40postback_status=sent&f1cost=1&f1revenue=1&f1f_conversions%40click_ts=2018-08-21&f1t_conversions%40click_ts=2018-08-21&f1f_conversions%40ts=2018-08-21&f1t_conversions%40ts=2018-08-21&f1f_conversions%40final_ts=2018-08-21&f1t_conversions%40final_ts=2018-08-21&f1goal_number%5B%5D=0&f1id=1&f1affiliate_manager=301&f1ipaddr=1&f1conversions%40flags%5B%5D=1",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-15&f1t_ts=2018-08-15&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_affiliates&cols%5B%5D=active_offers&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=cr&cols%5B%5D=cpc&cols%5B%5D=cost&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost&grp=1",
    "http://tracker.aivix.com/stats/opportunities",
    "http://tracker.aivix.com/stats/fast_reports",
    "http://tracker.aivix.com/stats/fast_reports?f1report_url=2",
    "http://tracker.aivix.com/stats/analize?base_on=affiliate_manager&ts_linked_to=0&cols[]=affiliate_manager_id&cols[]=active_affiliates&cols[]=reg_count&cols[]=conv_count&cols[]=revenue&grp=1&run=1&f1f_ts=2018-07-01&f1t_ts=2018-08-01&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=affiliate_manager&ts_linked_to=0&cols[]=affiliate_id&cols[]=affiliate_manager_id&cols[]=vertical&cols[]=reg_count&cols[]=conv_count&cols[]=epc&cols[]=revenue&cols[]=margin&grp=1&run=1&lines=25&f1f_ts=2018-08-13&f1t_ts=2018-08-20&run=1",
    "http://tracker.aivix.com/click/report",
    "http://tracker.aivix.com/click/report?ts_from=2018-08-22&ts_to=2018-08-22&run=1",
    "http://tracker.aivix.com/click/report?ts_from=2018-08-22&ts_to=2018-08-22&run=1&lines=25&f1id=1&f1offer_id=1&f1affiliate_id=3&f1country%5B%5D=GR",
    "http://tracker.aivix.com/deferred_actions",
    "http://tracker.aivix.com/deferred_actions?f1model=1&f1model_id=1&f1f_created_at=2018-08-21&f1t_created_at=2018-08-21&f1f_trigger_time=2018-08-21&f1t_trigger_time=2018-08-21",
    "http://tracker.aivix.com/affiliates",
    "http://tracker.aivix.com/affiliates?f1l_affiliates%40id=1&f1affiliate=1&f1email=1&f1traffic_sources%5B%5D=Display&f1vertical_id%5B%5D=1&f1account_manager_id=301&f1source=1&f1affiliates%40tag%5B%5D=Facebook%20-%20Nutra&f1affiliates%40status=active&f1domain_id=3&f1payment_methods%5B%5D=2",
    "http://tracker.aivix.com/affiliates/8/edit",
    "http://tracker.aivix.com/affiliates/8/edit?f2l_title=1&f2l_status=active&f2payment_id=2&f3l_offers%40id=1&f3l_offers%40name=1&f3domain_id=14&f3offer_affiliate%40hold=1&f4id=13&f4affiliates%40status=blocked,",
    "http://tracker.aivix.com/affiliates/0/edit"
];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
        await driver.get('http://tracker.aivix.com/users?page=2');
        await driver.findElement(By.css('form[id=filter_form_1] table tr:nth-child(9) td:last-child div:last-child')).click();
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
