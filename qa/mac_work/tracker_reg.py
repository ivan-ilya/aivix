from common import *
#login in tracker
def tracker_login():
   driver.get('http://tracker.aivix.com/affiliates')
   #enter the email and pass
   id('email').send_keys('***')
   id('password').send_keys('***')
   driver.find_element_by_tag_name('button').click()
tracker_login()
#create a new affiliate_advertiser
def aff_adv_create():
   #aff_create
   class_name('fa-plus').click()
   #random aff name with key word 'testx'
   name('company').send_keys('testx'+randomiser_aff)
   '''xpath('//*[@id="status"]/div/button').click() #change_the_status to active
   xpath('/html/body/div[8]/div/ul/li[3]/a/span[1]').click()'''
   class_name('center-block').click()
   #adv_create
   open('http://tracker.aivix.com/recls')
   class_name('fa-plus').click()
   # random adv name with key word 'testx'
   xpath('//*[@id="company"]/input').send_keys('testx'+randomiser_adv)
   wait = WebDriverWait(driver, 10)
   xpath("/html/body/div[4]/div[1]/section[2]/div/div/div/div[2]/p/button").send_keys(Keys.RETURN)
aff_adv_create()
#create


