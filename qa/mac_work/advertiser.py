from common import *
#login in the tracker
def tracker_login():
   open('***')
   id('email').send_keys('***')
   id('password').send_keys('***')
   driver.find_element_by_tag_name('button').click()
tracker_login()
#offer create
driver.find_element_by_class_name('fa-plus').click()
xpath('//*[@id="company"]/input').send_keys('testxxx')
wait = WebDriverWait(driver, 10)
xpath("/html/body/div[4]/div[1]/section[2]/div/div/div/div[2]/p/button").send_keys(Keys.RETURN)
