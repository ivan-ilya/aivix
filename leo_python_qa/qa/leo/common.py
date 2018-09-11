#import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
#modules for randomiser
import string
import random
#include the webdriver by xpath
driver = webdriver.Chrome('/Users/user/PycharmProjects/qa/mac_work/chromedriver')
#methods
open = driver.get
id = driver.find_element_by_id
xpath = driver.find_element_by_xpath
class_name = driver.find_element_by_class_name
name = driver.find_element_by_name
tag_name = driver.find_element_by_tag_name
#randomiser for email
randomiser_aff = (''.join(random.sample((string.ascii_lowercase+string.digits),5)))
randomiser_adv = (''.join(random.sample((string.ascii_lowercase+string.digits),6)))

