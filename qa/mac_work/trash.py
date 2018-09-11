#from common import *
#login in the tracker
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
class Payouts(unittest.TestCase):
    def setUp(self):
       self.driver = webdriver.Chrome('/Users/user/PycharmProjects/qa/chromedriver')
       self.driver.implicitly_wait(10)
    def user_login(self):
       driver = self.driver
       driver.get('***')
       driver.find_element_by_id('email').send_keys('***')
       driver.find_element_by_id('password').send_keys('***')
       driver.find_element_by_tag_name('button').click()
if __name__ == '__main__':
    unittest.main()
