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
    "http://tracker.aivix.com/offers/approval",
    "http://tracker.aivix.com/smartlinks/approval",
    "http://tracker.aivix.com/affiliates/approval",
    "http://tracker.aivix.com/affiliates/approval?f1l_affiliates%40id=1&f1l_company=1&f1l_email=1&f1traffic_sources%5B%5D=Display&f1vertical_id%5B%5D=1&f1l_users%40phone=1&f1l_skype=1&f1account_manager_id=0&f1f_created_at=2018-08-20&f1t_created_at=2018-08-20",
    "http://tracker.aivix.com/users/approval",
    "http://tracker.aivix.com/users/approval?f1users%40id=2&f1l_users%40login=2&f1l_users%40first_name=2&f1l_users%40last_name=2&f1l_users%40email=2",
    "http://tracker.aivix.com/offers",
    "http://tracker.aivix.com/offers?f1l_name=1&f1type%5B%5D=new&f1goal_data%5B%5D=1&f1offer_mode%5B%5D=CPA&f1offer_flow%5B%5D=Default&f1filters%40traffic_sources%5B%5D=seo&f1filters%40os_types%5B%5D=Android&f1filters%40browser_types%5B%5D=Chrome&f1filters%40countries%5B%5D=GR&f1vertical_id%5B%5D=0&f1offers%40status%5B%5D=active",
    "http://tracker.aivix.com/offers/930/view",
    "http://tracker.aivix.com/smartlinks",
    "http://tracker.aivix.com/smartlinks?f1l_id=1&f1l_name=1",
    "http://tracker.aivix.com/smartlinks/1/info",
    "http://tracker.aivix.com/smartlinks/1/edit",
    "http://tracker.aivix.com/smartlinks/1/edit?f1l_offer_id=1&f1l_offers%40name=1&f1advertiser_id=1&f1offer_mode=CPA&f1filters%40traffic_sources=seo&f1filters%40os_types=Android&f1filters%40browser_types=Chrome&f1l_filters%40countries=GR&f1offers%40status=pending&f1l_priority=1",
    "http://tracker.aivix.com/slylinks",
    "http://tracker.aivix.com/slylinks?f1l_id=1&f1l_name=1&f1status=active",
    "http://tracker.aivix.com/slylinks/2/view",
    "http://tracker.aivix.com/slylinks/2/view?f1l_slylink_filter%40id=1&f1l_filter_id=1&f1filters%40countries%5B%5D=GR&f1filters%40devices%5B%5D=Desktop&f1filters%40connection_types%5B%5D=cable&f1filters%40os_types%5B%5D=Android&f1filters%40browser_types%5B%5D=Chrome&f1filters%40traffic_sources%5B%5D=seo&f1filters%40carriers=1&f1filters%40affiliate_filters=1&f1filters%40weight=1&f1is_enabled=1",
    "http://tracker.aivix.com/offers/tariffs",
    "http://tracker.aivix.com/offers/tariffs?f1tariffs%40id=1&f1tariffs%40goal_id=1&f1tariffs%40affiliate_id=0&f1countries%5B%5D=GR",
    "http://tracker.aivix.com/offers/landpages",
    "http://tracker.aivix.com/offers/landpages?f1id=1&f1name=test%20preland&f1countries%5B%5D=GR&f1type=preland&f1connection_type=mobile&f1vertical_id=0&f1language=ar",
    "http://tracker.aivix.com/offers/shortlinks",
    "http://tracker.aivix.com/offers/shortlinks?f1l_id=1&f1offer_id=9&f1affiliate_id=2",
    "http://tracker.aivix.com/offers/caps",
    "http://tracker.aivix.com/offers/caps?f1offer_id=0&f1affiliate_id=2&f1l_aff_sub=1&f1cap_status=daily",
    "http://tracker.aivix.com/offers/promos",
    "http://tracker.aivix.com/offers/promos?f1l_promos%40id=1&f1description=1&f1type=image",
    "http://tracker.aivix.com/conversions?f1goal_number[]=0",
    "http://tracker.aivix.com/conversions?f1conversions%40affiliate_id%5B%5D=2&f1advertiserID=1&f1conversions%40offer_id%5B%5D=0&f1conversions%40country%5B%5D=GR&f1conversions%40status%5B%5D=hold&f1conversions%40postback_status=queued&f1cost=1&f1f_conversions%40click_ts=2018-08-14&f1t_conversions%40click_ts=2018-08-14&f1f_conversions%40ts=2018-08-14&f1t_conversions%40ts=2018-08-14&f1goal_number%5B%5D=0&f1goal_number%5B%5D=1&f1id=1&f1advertiser_manager=1&f1ipaddr=1&f1conversions%40flags%5B%5D=0",
    "http://tracker.aivix.com/conversions/pixels",
    "http://tracker.aivix.com/conversions/pixels?f1affiliate_id=2&f1goal_id=1",
    "http://tracker.aivix.com/conversions/pixels/1233/test",
    "http://tracker.aivix.com/conversions/test",
    "http://tracker.aivix.com/conversions/view_test_conversions_responses",
    "http://tracker.aivix.com/conversions/view_test_conversions_responses?f1conversion_test_responses%40id=1&f1goal_id=1&f1affiliate_id=24&f1f_created_at=2018-08-14&f1t_created_at=2018-08-14",
    "http://tracker.aivix.com/stats/analize",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-15&f1t_ts=2018-08-15&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=unique_clicks_percent&cols%5B%5D=nontarget_percent&cols%5B%5D=active_affiliates&cols%5B%5D=active_offers&cols%5B%5D=total_conversion&cols%5B%5D=conv_approve&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=hold_conversions_count&cols%5B%5D=declined_conversions_count&cols%5B%5D=declined_notrash_count&cols%5B%5D=trash_count&cols%5B%5D=cr&cols%5B%5D=cpc&cols%5B%5D=cost&cols%5B%5D=hold_conversions_cost&cols%5B%5D=declined_conversions_cost&grp=1",
    "http://tracker.aivix.com/stats/opportunities",
    "http://tracker.aivix.com/stats/analize?f1f_ts=2018-08-15&f1t_ts=2018-08-15&base_on=affiliate&ts_linked_to=1&timezone=UTC&cols%5B%5D=clicks_count&cols%5B%5D=unique_clicks_count&cols%5B%5D=reg_count&cols%5B%5D=conv_count&cols%5B%5D=cost&f1affiliate=&run=1",
    "http://tracker.aivix.com/payouts/history",
    "http://tracker.aivix.com/payouts/history?f1payouts%40id=1&f1payouts%40affiliate_id=2&f1payouts%40source_id=2&f1payouts%40status%5B%5D=pending&f1payouts%40aff_payment_id=1492&f1payment_id%5B%5D=1&f1payment_id%5B%5D=2&f1payment_id%5B%5D=3&f1payment_id%5B%5D=4&f1payment_id%5B%5D=5&f1payment_id%5B%5D=6&f1payment_id%5B%5D=7&f1payment_id%5B%5D=8&f1payment_id%5B%5D=9&f1payment_id%5B%5D=10&f1payment_id%5B%5D=11&f1payment_id%5B%5D=12&f1payment_id%5B%5D=13&f1payment_id%5B%5D=28&f1payment_id%5B%5D=29&f1payment_id%5B%5D=30&f1payment_id%5B%5D=32&f1payment_id%5B%5D=33&f1payouts%40requester_user_id=0&f1payouts%40approver_user_id=0&f1f_payouts%40created_at=2018-08-14&f1t_payouts%40created_at=2018-08-14&f1f_payouts%40updated_at=2018-08-14&f1t_payouts%40updated_at=2018-08-14&f1f_payouts%40due_date=2018-08-14&f1t_payouts%40due_date=2018-08-14&f1payouts%40tag%5B%5D=affiliate_referral",
    "http://tracker.aivix.com/affiliates",
    "http://tracker.aivix.com/affiliates?f1l_affiliates%40id=1&f1affiliate=2&f1email=1&f1traffic_sources%5B%5D=Native&f1vertical_id%5B%5D=1&f1source=1&f1affiliates%40tag%5B%5D=Facebook%20-%20Nutra&f1affiliates%40status=pending&f1domain_id=3&f1payment_methods%5B%5D=1",
    "http://tracker.aivix.com/affiliates/0/edit",
    "http://tracker.aivix.com/affiliates/209/edit",
    "http://tracker.aivix.com/affiliates/209/edit?f2l_title=1&f2l_status=1&f2payment_id=1&f3l_offers%40id=1&f3l_offers%40name=1&f3domain_id=0&f3offer_affiliate%40hold=0&f4id=2&f4affiliates%40status=pending",
    "http://tracker.aivix.com/affiliates/topOffers",
    "http://tracker.aivix.com/affiliates/topOffers?f1affiliates%40id=2&f1top_offers_affiliates%40mode=manual&f1offers=1",
    "http://tracker.aivix.com/deferred_actions",
    "http://tracker.aivix.com/deferred_actions?f1model=App%5CModels%5COfferAffiliate&f1model_id=1&f1f_created_at=2018-08-14&f1t_created_at=2018-08-14&f1f_trigger_time=2018-08-14&f1t_trigger_time=2018-08-14",
    "http://tracker.aivix.com/settings/tracking",
    "http://tracker.aivix.com/settings/tracking?f1domains%40id=2&f1domain=2&f1l_registrar=2&f1is_public=0&f1l_status=active&f1is_https=0&f1clients=2",
    "http://tracker.aivix.com/settings/tracking#tab_3_2",
    "http://tracker.aivix.com/settings/tracking#tab_3_1",
    "http://tracker.aivix.com/settings/tracking?f2id=1&f2affiliate_id=2&f2l_status=active&f2l_domain=1#tab_3_2",
    "http://tracker.aivix.com/users",
    "http://tracker.aivix.com/users?f1l_users%40id=1&f1l_users%40login=1&f1l_users%40first_name=1&f1l_users%40last_name=1&f1l_users%40email=1&f1role_id=1&f1users%40status=pending"

];

describe('login_to_trecker', function() {
    before(async function () {
        await driver.get('http://tracker.aivix.com/login');
        await driver.findElement(By.id('email')).sendKeys('логин');
        await driver.findElement(By.id('password')).sendKeys('пароль');
        await driver.findElement(By.css('form[action="http://tracker.aivix.com/login"] button[type="submit"]')).click();
        await driver.get('http://tracker.aivix.com/users');
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
