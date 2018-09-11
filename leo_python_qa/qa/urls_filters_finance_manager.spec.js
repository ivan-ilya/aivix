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
    "http://tracker.aivix.com/conversions?f1goal_number[]=0",
    "http://tracker.aivix.com/conversions?f1conversions%40affiliate_id%5B%5D=1&f1vertical_id%5B%5D=1&f1advertiser_id%5B%5D=1&f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=GR&f1conversions%40status%5B%5D=pending&f1conversions%40postback_status=pending&f1cost=1&f1revenue=1&f1f_conversions%40click_ts=2018-08-19&f1t_conversions%40click_ts=2018-08-19&f1f_conversions%40ts=2018-08-19&f1t_conversions%40ts=2018-08-19&f1goal_number%5B%5D=0&f1id=1&f1ipaddr=1&f1conversions%40flags%5B%5D=0",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-20&f1t_ts=2018-08-20&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_affiliates&cols%5B%5D=active_offers&cols%5B%5D=active_advertisers&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=cr&cols%5B%5D=epc&cols%5B%5D=cpc&cols%5B%5D=rpc&cols%5B%5D=revenue&cols%5B%5D=cost&cols%5B%5D=profit&cols%5B%5D=margin&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost&cols%5B%5D=hold_conversions_revenue&cols%5B%5D=declined_conversions_revenue&cols%5B%5D=invalid_conversions_revenue&grp=1",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-20&f1t_ts=2018-08-20&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_affiliates&cols%5B%5D=active_offers&cols%5B%5D=active_advertisers&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=cr&cols%5B%5D=epc&cols%5B%5D=cpc&cols%5B%5D=rpc&cols%5B%5D=revenue&cols%5B%5D=cost&cols%5B%5D=profit&cols%5B%5D=margin&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost&cols%5B%5D=hold_conversions_revenue&cols%5B%5D=declined_conversions_revenue&cols%5B%5D=invalid_conversions_revenue&f1affiliate=&run=1",
    "http://tracker.aivix.com/payouts",
    "http://tracker.aivix.com/payouts?f1l_payouts%40id=2&f1payouts%40affiliate_id=1&f1aff_payment_id=3&f1payment_id=1&f1l_receiver_data=2&f1payouts%40tag%5B%5D=affiliate_referral&f1requester_user_id=1&f1f_payouts%40created_at=2018-08-12&f1t_payouts%40created_at=2018-08-12&f1f_payouts%40due_date=2018-08-12&f1t_payouts%40due_date=2018-08-12",
    "http://tracker.aivix.com/payouts/referral",
    "http://tracker.aivix.com/payouts/referral?f1l_payouts%40id=1&f1payouts%40affiliate_id=8&f1payouts%40source_id=1&f1aff_payment_id=1492&f1payment_id=1&f1l_receiver_data=1&f1payouts%40tag%5B%5D=affiliate_referral&f1requester_user_id=0&f1f_payouts%40created_at=2018-08-12&f1t_payouts%40created_at=2018-08-12&f1f_payouts%40due_date=2018-08-12&f1t_payouts%40due_date=2018-08-12",
    "http://tracker.aivix.com/payouts/calendar",
    "http://tracker.aivix.com/payouts/history",
    "http://tracker.aivix.com/payouts/history?f1payouts%40id=1&f1payouts%40affiliate_id=1&f1payouts%40source_id=1&f1payouts%40status%5B%5D=pending&f1payouts%40aff_payment_id=3&f1payment_id%5B%5D=1&f1payment_id%5B%5D=2&f1payment_id%5B%5D=3&f1payment_id%5B%5D=4&f1payment_id%5B%5D=5&f1payment_id%5B%5D=6&f1payment_id%5B%5D=7&f1payment_id%5B%5D=8&f1payment_id%5B%5D=9&f1payment_id%5B%5D=10&f1payment_id%5B%5D=11&f1payment_id%5B%5D=12&f1payment_id%5B%5D=13&f1payment_id%5B%5D=28&f1payment_id%5B%5D=29&f1payment_id%5B%5D=30&f1payment_id%5B%5D=32&f1payment_id%5B%5D=33&f1payouts%40requester_user_id=0&f1payouts%40approver_user_id=0&f1f_payouts%40created_at=2018-08-12&f1t_payouts%40created_at=2018-08-12&f1f_payouts%40updated_at=2018-08-12&f1t_payouts%40updated_at=2018-08-12&f1f_payouts%40due_date=2018-08-12&f1t_payouts%40due_date=2018-08-12&f1payouts%40tag%5B%5D=affiliate_referral",
    "http://tracker.aivix.com/affiliates",
    "http://tracker.aivix.com/affiliates?f1l_affiliates%40id=1&f1affiliate=1&f1email=1&f1traffic_sources%5B%5D=Native&f1vertical_id%5B%5D=1&f1source=1&f1affiliates%40tag%5B%5D=Facebook%20-%20Nutra&f1affiliates%40status=pending&f1domain_id=3&f1payment_methods%5B%5D=1",
    "http://tracker.aivix.com/affiliates/8/edit",
    "http://tracker.aivix.com/affiliates/8/edit?f1l_title=1&f1l_status=pending&f1payment_id=1",
    "http://tracker.aivix.com/payouts/balance_history/affiliate",
    "http://tracker.aivix.com/payouts/balance_history/affiliate?f1affiliate_id=8&f1l_balance_history%40source=a&f1source_id=a&f1f_created_at=2018-08-12&f1t_created_at=2018-08-12",
    "http://tracker.aivix.com/affiliates/requisites",
    "http://tracker.aivix.com/affiliates/requisites?f1affiliate_id=1&f1l_title=1&f1affiliate_payment%40status=pending&f1payment_id=1&f1l_receiver_data=2",
    "http://tracker.aivix.com/recls",
    "http://tracker.aivix.com/recls?f1l_advertisers%40id=1&f1advertiser=1&f1advertisers%40tag%5B%5D=Facebook%20-%20Nutra&f1advertisers%40status=rejected",
    "http://tracker.aivix.com/payouts/balance_history/advertiser",
    "http://tracker.aivix.com/payouts/balance_history/advertiser?f1partner_id=1&f1l_source=1&f1source_id=1&f1f_created_at=2018-08-29&f1t_created_at=2018-08-29",
    "http://tracker.aivix.com/payouts/invoices",
    "http://tracker.aivix.com/payouts/invoices?f1offers_cost=2&f1advertiser_id=1&f1payment_method_id=1&f1company_id=6&f1f_period=2018-08-12&f1t_period=2018-08-12",
    "http://tracker.aivix.com/payouts/invoices/9/edit",
    "http://tracker.aivix.com/payouts/invoices/0/edit",
    "http://tracker.aivix.com/payouts/incomes",
    "http://tracker.aivix.com/payouts/incomes?f1advertiser_id=1&f1advertiser_manager=335&f1payment_method_id=1&f1l_legal_name=%D1%80&f1currency=USD&f1cost=s&f1cost_in_usd=s&f1f_created_at=2018-08-12&f1t_created_at=2018-08-12&f1f_actual_income_date=2018-08-12&f1t_actual_income_date=2018-08-12&f1f_period=2018-08-12&f1t_period=2018-08-12&f1l_comment=s",
    "http://tracker.aivix.com/payouts/incomes/4/edit",
    "http://tracker.aivix.com/payouts/incomes/0/edit",
    "http://tracker.aivix.com/settings/payments",
    "http://tracker.aivix.com/settings/payments?f1l_id=2&f1l_method=2",
    "http://tracker.aivix.com/settings/payments/0/edit",
    "http://tracker.aivix.com/settings/payments/1/edit",
    "http://tracker.aivix.com/companies"
];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
        await driver.get('http://tracker.aivix.com/users?page=2');
        await driver.findElement(By.css('form[id=filter_form_1] table tr:nth-child(26) td:last-child div:last-child')).click();
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
