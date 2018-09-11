from common import *
import time
#prod conversion
'''def conv():
   open('http://tracker.aivix.com:8080/tracker?offer_id=9&aff_id=1311')
   #open('http://tracker.rel.aivtools.com:9000/tracker?offer_id=27&aff_id=209')
   current_url = (driver.current_url)
   session = current_url[45:]
   #conversion = 'http://tracker.rel.aivtools.com:9000/aff_goal?transaction_id=' + session + '&goal_id=2285&is_hold=1'
   conversion = 'http://tracker.aivix.com:8080/aff_goal?transaction_id=' + session + '&goal_id=19&is_hold=1'
   open(conversion)
   time.sleep(5)
   driver.close()
conv()'''

#rel hold conversion loop 3 with aff_sub
def conv():
   open('http://tracker.rel.aivtools.com:9000/tracker?offer_id=1931&aff_id=1311&aff_sub=test')
   current_url = (driver.current_url)
   session = current_url[26:]
   time.sleep(10)
   conversion = 'http://tracker.rel.aivtools.com:9000/aff_goal?transaction_id=' + session + '&goal_id=2285&is_hold=1'
   #conversion
   #conversion = 'http://tracker.aivix.com:8080/aff_goal?transaction_id=' + session + '&goal_id=19'
   open(conversion)
   time.sleep(3)
for each in range(3):
   conv()
#conv()

'''
#prod conversion with aff_sub
def conv():
   open('http://tracker.aivix.com:8080/tracker?offer_id=1931&aff_id=1311&aff_sub=test')
   current_url = (driver.current_url)
   session = current_url[26:]
   time.sleep(10)
   conversion = 'http://tracker.aivix.com:8080/aff_goal?transaction_id=' + session + '&goal_id=2285&is_hold=1'
   #conversion = 'http://tracker.aivix.com:8080/aff_goal?transaction_id=' + session + '&goal_id=19'
   open(conversion)
for each in range(3):
   conv()
driver.close()
#hold conversion
#tracker.rel.aivtools.com:9000/aff_goal?transaction_id={}&goal_id={}&is_hold=1
'''