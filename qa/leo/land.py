import sys
#sys.path.insert(0, '/Users/user/PycharmProjects/qa/mac_work')
import time
from common import *
tag_name = driver.find_element_by_tag_name
id = driver.find_element_by_id
xpath = driver.find_element_by_xpath
class_name = driver.find_element_by_class_name
#
#open the preland-land and check the video working
#

def visit_click():
    try:
        link = ['https://ru.detector-million.com/','https://en.quantumsystemssoft.online/','https://ko.quantumsystemssoft.online/','https://tr.quantumsystemssoft.online/','https://ru.quantumsystemssoft.online/','https://ru.nasvostok3.com/','https://de.cryptomaster.top/','https://it.cryptomaster.top/','https://ar.cryptomaster.top/','https://en.bitcoinloophole2.online/','https://se.cryptomaster.top/','https://no.cryptomaster.top/','https://es.cryptomaster.top/','https://en.fordsystem.online/','https://de.fordsystem.online/','https://en.thecryptosgenius.pw/','https://de.thecryptosgenius.pw/','https://it.thecryptosgenius.pw/','https://sa.thecryptosgenius.pw/','https://it.fordsystem.online/','https://es.fordsystem.online/','https://en.autobitcoingenerator.pw/','https://ru.autobitcoingenerator.pw/','https://de.autobitcoingenerator.pw/','https://de.cryptomatic-app.com/','https://en.btc-app.pw/','https://ru.btc-app.pw/','https://de.btc-app.pw/','https://it.btc-app.pw/','https://it.autobitcoingenerator.pw/','https://pol.autobitcoingenerator.pw/','https://se.btc-app.pw/','https://uk.autobitcoingenerator.pw/','https://no.btc-app.pw/','https://ar.btc-app.pw/','http://ru.cryptomaster.top/','https://de.cryptocode-app.co/','https://ge.cryptocode-app.co/']
        for link in link:
            open(link)
            tag_name('iframe').click()
            time.sleep(0.5)
            open(link+'register')
            time.sleep(0.5)
            tag_name('iframe').click()
            #driver.close()
    except():
        print('Something went wrong. Repeat the test and look to the browser window when the script will crash')
visit_click()


#without iframe

def visit_click2():
    try:
        link2 = ['http://en.bitcoin-soft.com//','https://ww.bitcoin-soft.com/','https://gb.bitcoin-soft.com/', 'https://uk.bitcoin-soft.com/','https://us.bitcoin-soft.com/']
        for link2 in link2:
            open(link2)
            id('bitcoin-video').click()
            time.sleep(0.5)
    except():
        print('Something went wrong. Repeat the test and look to the browser window when the script will crash')
visit_click2()
#
def visit_click3():
    try:
        link3 = ['http://ru.alpha-trade.co/','https://en.thenewspy.co/','https://de.thenewspy.co/','https://rr.alpha-trade.co/','https://rr.infinity-app.co/','http://rus.bitcoin-system.online/','http://cis.bitcoin-system.online/','https://se.bitcoin-system.online/register','https://en.bitcoin-system.online/register','https://de.bitcoin-system.online/register','https://es.bitcoin-system.online/register','https://no.bitcoin-system.online/register,', 'https://it.bitcoin-system.online/register','https://gr.bitcoin-system.online/register','https://tr.bitcoin-system.online/register','https://en.theethereumscodes.com/register','https://it.theethereumscodes.com/register','https://de.theethereumscodes.com/register','https://ru.theethereumscodes.com/register','https://se.theethereumscodes.com/register','https://es.theethereumscodes.com/register','https://no.theethereumscodes.com/register','https://ru.bitcoin-system.online/register','https://cn.bitcoin-system.online/register','https://fr.millionnaire-francais.pw/register','https://ru.infinity-app.co/']
        for link3 in link3:
            open(link3)
            tag_name('iframe').click()
            tag_name('html').send_keys('ENTER')
            time.sleep(0.5)
    except():
        print('Something went wrong. Repeat the test and look to the browser window when the script will crash')
visit_click3()
driver.close()


#https://en.cryptomaster.top/ anticlicker
#'https://ru.infinity-app.co/' - need to fight with modal window
#https://sw.bitcoin-system.online/ - need to fight with modal window
#'https://de.pattern-traders.com/' - no button


