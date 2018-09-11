from common import *
from secrets import choice

#affiliate registration
def aff_reg():
    open('https://aivix.com')
    xpath('/html/body/section[1]/div[4]/header/div[2]/ul/li[3]/a').send_keys((Keys.RETURN))#sign_up
    form1 = '//*[@ id="registration_form"]/form[1]/div[1]'#affiliate_form
    xpath(form1+'/div[1]/input').send_keys('testx'+randomiser_adv)#first_name
    xpath(form1+'/div[2]/input').send_keys('testx')#last_name
    xpath(form1+'/div[3]/input').send_keys('testx'+randomiser_aff+'@gmail.com')#email
    xpath(form1+'/div[4]/input').send_keys('1234567890')#phone_number
    xpath('//*[@id="password3"]').send_keys('qwertasd')#password
    xpath(form1+'/div[6]/input').send_keys('qwertasd')#repeat_password
    xpath('//*[@id="radio_male"]').click()#An_Individual_Affiliate
    xpath('//*[@id="registration_form"]/form[1]/input[5]').click()#submit_form
aff_reg()

#advertiser registration
def adv_reg():
    open('https://aivix.com')
    xpath('/html/body/section[1]/div[4]/header/div[2]/ul/li[3]/a').send_keys((Keys.RETURN))#sign_up
    xpath('//*[@id="registration_form"]/div[2]/div/div[4]/label').click()
    form2 = '//*[@ id="registration_form"]/form[2]/div[1]'#affiliate_form
    xpath(form2+'/div[1]/input').send_keys('testx')#first_name
    xpath(form2+'/div[2]/input').send_keys('testx')#last_name
    xpath(form2+'/div[3]/input').send_keys('testx'+randomiser_adv+'@gmail.com')#email
    xpath(form2+'/div[4]/input').send_keys('1234567890')#phone_number
    xpath('//*[@id="password1"]').send_keys('qwertasd')#password
    xpath(form2+'/div[6]/input').send_keys('qwertasd')#repeat_password
    xpath(form2+'/div[7]/input').send_keys('test'+randomiser_aff)#company_name
    xpath(form2+'/div[8]/input').send_keys('test')#company_url
    xpath('//*[@id="registration_form"]/form[2]/input[5]').click()#submit_form
    #driver.close()
adv_reg()


