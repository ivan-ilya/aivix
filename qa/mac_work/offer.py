from common import *
import time
#login in the tracker
def tracker_login():
   open('http://tracker.rel.aivtools.com/offers')
   id('email').send_keys('mail')
   id('password').send_keys('pass')
   tag_name('button').click()
   driver.find_element_by_tag_name('button').click()
tracker_login()
#add a new offer
def off_create():
   #driver.get('http://tracker.rel.aivtools.com/offers')
   driver.find_element_by_class_name('fa-plus').click()
   '''xpath('//*[@id="advertiser_id"]/div/button/span[1]').click()
   xpath('/html/body/div[8]/div/ul/li[1]/a/span[1]').click()
   xpath('//*[@id="name"]/input').send_keys('test_advert')
   xpath('//*[@id="offer_url"]/table/tbody/tr/td[3]/input').send_keys('https.habr.com')'''
   driver.implicitly_wait(10)
   #driver.find_element_by_class_name('cke_toolbar').click()
   #driver.implicitly_wait(10)
   #text_area = id('cke_1_contents').click()
   #xpath('/html/body/p[1]').click()
   #xpath('/html/body/p[1]').send_keys('test')
   #id('cke_36_textarea').send_keys('test')
   #xpath('//*[@id="cke_42_label"]').click()#send_keys(Keys.RETURN)
   #driver.send_keys('keys.ENTER')
   driver.switch_to.frame(driver.find_element_by_tag_name("iframe"))
   time.sleep(5)
   xpath('/html/body/p[1]').click()
   time.sleep(5)
   xpath('/html/body/p[1]').send_keys('test')
off_create()
#close the browser windowq
#driver.close()
#//*[@id="cke_1_contents"]/iframe

