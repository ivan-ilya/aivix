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
    "http://tracker.aivix.com/offers?f1l_name=1&f1type%5B%5D=new&f1goal_data%5B%5D=1&f1offers%40advertiser_id%5B%5D=1&f1offer_mode%5B%5D=CPA&f1offer_flow%5B%5D=Default&f1filters%40traffic_sources%5B%5D=seo&f1filters%40os_types%5B%5D=Android&f1filters%40browser_types%5B%5D=Firefox&f1filters%40countries%5B%5D=GR&f1vertical_id%5B%5D=0&f1offers%40status%5B%5D=pending",
    "http://tracker.aivix.com/offers/930/view",
    "http://tracker.aivix.com/offers/tariffs",
    "http://tracker.aivix.com/offers/tariffs?f1tariffs%40id=1&f1tariffs%40goal_id=1&f1tariffs%40affiliate_id=1&f1countries%5B%5D=GR",
    "http://tracker.aivix.com/offers/landpages",
    "http://tracker.aivix.com/offers/landpages?f1id=1&f1name=test%20preland&f1countries%5B%5D=GR&f1type=preland&f1connection_type=web&f1vertical_id=0&f1language=ar",
    "http://tracker.aivix.com/offers/caps",
    "http://tracker.aivix.com/offers/caps?f1offer_id=1&f1affiliate_id=1&f1l_aff_sub=1&f1cap_status=monthly",
    "http://tracker.aivix.com/conversions?f1goal_number[]=0",
    "http://tracker.aivix.com/conversions?f1conversions%40affiliate_id%5B%5D=1&f1advertiser_id%5B%5D=1&f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=GR&f1cost=1&f1revenue=1&f1f_conversions%40click_ts=2018-08-21&f1t_conversions%40click_ts=2018-08-21&f1f_conversions%40ts=2018-08-21&f1t_conversions%40ts=2018-08-21&f1f_conversions%40final_ts=2018-08-21&f1t_conversions%40final_ts=2018-08-21&f1goal_number%5B%5D=0&f1id=1&f1affiliate_manager=301&f1advertiser_manager=335&f1ipaddr=1&f1conversions%40flags%5B%5D=0",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-10&f1t_ts=2018-08-10&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=offer&cols%5B%5D=offer_id&cols%5B%5D=affiliate_id&cols%5B%5D=advertiser&cols%5B%5D=advertiser_id&cols%5B%5D=affiliate_manager&cols%5B%5D=affiliate_manager_id&cols%5B%5D=advertiser_manager&cols%5B%5D=advertiser_manager_id&cols%5B%5D=smartlink&cols%5B%5D=vertical&cols%5B%5D=ts&cols%5B%5D=country&cols%5B%5D=is_phone&cols%5B%5D=device_type&cols%5B%5D=aff_tag&cols%5B%5D=adv_tag&cols%5B%5D=city&cols%5B%5D=flow_id&cols%5B%5D=filter_id&cols%5B%5D=aff_sub&cols%5B%5D=aff_sub2&cols%5B%5D=aff_sub3&cols%5B%5D=aff_sub4&cols%5B%5D=aff_sub5&cols%5B%5D=os&cols%5B%5D=os_version&cols%5B%5D=browser&cols%5B%5D=browser_version&cols%5B%5D=connect_type&cols%5B%5D=provider&cols%5B%5D=land_id&cols%5B%5D=preland_id&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_affiliates&cols%5B%5D=active_offers&cols%5B%5D=active_advertisers&cols%5B%5D=preland_count&cols%5B%5D=land_count&cols%5B%5D=offer_count&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=invalid_conversions_count&cols%5B%5D=cr&cols%5B%5D=epc&cols%5B%5D=cpc&cols%5B%5D=rpc&cols%5B%5D=ctr&cols%5B%5D=vtc&cols%5B%5D=rtv&cols%5B%5D=epv&cols%5B%5D=revenue&cols%5B%5D=cost&cols%5B%5D=profit&cols%5B%5D=margin&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost&cols%5B%5D=hold_conversions_revenue&cols%5B%5D=declined_conversions_revenue&cols%5B%5D=invalid_conversions_revenue&grp=1",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-10&f1t_ts=2018-08-10&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=revenue&cols%5B%5D=cost&f1affiliate=&run=1",
    "http://tracker.aivix.com/stats/marketing_report",
    "http://tracker.aivix.com/stats/fast_reports",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=conv_count&cols[]=revenue&lines=25&grp=1&f1f_ts=2018-07-01&f1t_ts=2018-08-01&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=offer&cols[]=advertiser&cols[]=conv_count&cols[]=epc&cols[]=revenue&lines=25&f1f_ts=2018-08-15&f1t_ts=2018-08-22&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser&ts_linked_to=0&cols[]=offer&cols[]=affiliate_id&cols[]=affiliate_manager_id&cols[]=clicks_count&cols[]=conv_count&cols[]=epc&cols[]=revenue&lines=25&run=1&f1f_ts=2018-08-21&f1t_ts=2018-08-22&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=advertiser_manager&ts_linked_to=0&cols[]=vertical&cols[]=active_advertisers&cols[]=revenue&cols[]=cost&cols[]=profit&cols[]=margin&grp=1&f1f_ts=2018-07-01&f1t_ts=2018-08-01&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=affiliate_manager&ts_linked_to=0&cols[]=affiliate_manager_id&cols[]=active_affiliates&cols[]=reg_count&cols[]=conv_count&cols[]=revenue&grp=1&run=1&f1f_ts=2018-07-01&f1t_ts=2018-08-01&run=1",
    "http://tracker.aivix.com/stats/analize?base_on=affiliate_manager&ts_linked_to=0&cols[]=affiliate_id&cols[]=affiliate_manager_id&cols[]=vertical&cols[]=reg_count&cols[]=conv_count&cols[]=epc&cols[]=revenue&cols[]=margin&grp=1&run=1&lines=25&f1f_ts=2018-08-15&f1t_ts=2018-08-22&run=1",
    "http://tracker.aivix.com/payouts",
    "http://tracker.aivix.com/payouts?f1l_payouts%40id=1&f1payouts%40affiliate_id=1&f1aff_payment_id=3&f1payment_id=1&f1l_receiver_data=1&f1payouts%40tag%5B%5D=affiliate_referral&f1requester_user_id=0&f1f_payouts%40created_at=2018-08-21&f1t_payouts%40created_at=2018-08-21&f1f_payouts%40due_date=2018-08-21&f1t_payouts%40due_date=2018-08-21",
    "http://tracker.aivix.com/payouts/history",
    "http://tracker.aivix.com/payouts/history?f1payouts%40id=1&f1payouts%40affiliate_id=1&f1payouts%40source_id=1&f1payouts%40status%5B%5D=pending&f1payouts%40aff_payment_id=3&f1payment_id%5B%5D=1&f1payment_id%5B%5D=2&f1payment_id%5B%5D=3&f1payment_id%5B%5D=4&f1payment_id%5B%5D=5&f1payment_id%5B%5D=6&f1payment_id%5B%5D=7&f1payment_id%5B%5D=8&f1payment_id%5B%5D=9&f1payment_id%5B%5D=10&f1payment_id%5B%5D=11&f1payment_id%5B%5D=12&f1payment_id%5B%5D=13&f1payment_id%5B%5D=28&f1payment_id%5B%5D=29&f1payment_id%5B%5D=30&f1payment_id%5B%5D=32&f1payment_id%5B%5D=33&f1payouts%40requester_user_id=0&f1payouts%40approver_user_id=0&f1f_payouts%40created_at=2018-08-21&f1t_payouts%40created_at=2018-08-21&f1f_payouts%40updated_at=2018-08-21&f1t_payouts%40updated_at=2018-08-21&f1f_payouts%40due_date=2018-08-21&f1t_payouts%40due_date=2018-08-21&f1payouts%40tag%5B%5D=affiliate_referral",
    "http://tracker.aivix.com/tips",
    "http://tracker.aivix.com/tips?f1l_id=1&f1l_name=1&f1language=en",
    "http://tracker.aivix.com/deferred_actions",
    "http://tracker.aivix.com/deferred_actions?f1model=1&f1model_id=1&f1f_created_at=2018-08-21&f1t_created_at=2018-08-21&f1f_trigger_time=2018-08-21&f1t_trigger_time=2018-08-21"

];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
        await driver.get('http://tracker.aivix.com/users');
        await driver.findElement(By.css('form[id=filter_form_1] table tr:nth-child(25) td:last-child div:last-child')).click();
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
