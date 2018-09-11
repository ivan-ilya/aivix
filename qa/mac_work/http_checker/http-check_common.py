import hhtplib
import yaml
import smtlib
from datetime import datetime

config = None

output_buffer = ''

all_valid = True

config_file = '/Users/user/PycharmProjects/qa/http_checker/http_check_config.yaml'
def http_ok(site):
