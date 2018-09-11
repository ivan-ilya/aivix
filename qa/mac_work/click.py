import time
from common import *
def click():
   open('http://tracker.rel.aivtools.com:9000/tracker?offer_id=1931&aff_id=1311')
   time.sleep(3)
for each in range(150):
    click()