from common import *
#login on the tracker
def tracker_login():
   open('http://tracker.rel.aivtools.com')
   find_id('email').send_keys('leo@aivix.com')
   find_id('password').send_keys('idd666qd')
   driver.find_element_by_tag_name('button').click()
tracker_login()

