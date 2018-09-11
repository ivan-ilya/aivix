from common import *
#login in the tracker
def tracker_login():
   driver.get('http://***')
   id = driver.find_element_by_id
   id('email').send_keys('***')
   id('password').send_keys('***')
   driver.find_element_by_tag_name('button').click()
tracker_login()
#pending_regect_payout
def coach_change():
#change the coach_id to 209
   xpath = driver.find_element_by_xpath
   xpath('/html/body/div[4]/div[1]/section[2]/div[1]/div/form/div/ul/li[5]/a/span').click()
   xpath('// *[ @ id = "coach_id"] / div / button').send_keys(207)
   xpath('/html/body/div[8]/div/ul/li[196]/a').click()
   #wait = WebDriverWait(driver, 10)
   #clc = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "button")))
   #clc.click()
   wait = WebDriverWait(driver, 10)
   xpath("/html/body/div[4]/div[1]/section[2]/div[1]/div/form/div/p/button").send_keys(Keys.RETURN)
   #driver.find_element_by_class_name('btn-primary').click()
coach_change()
