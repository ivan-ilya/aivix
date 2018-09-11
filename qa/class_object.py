'''class User:
    name = 'user'
    email = 'mail'
    phone = '000'
    def met(self):
       return self.name + '--' + self.email + '--' + self.phone
user_data = User()
user_data.name = 'Ivan'
User.email = 'test@test.test'
User.phone = '123456'
user_admin =  User()
user_admin.name  = 'Petr'
print(user_admin.name)
print(user_data.name)
print(User.name)
'''

class X:
    def __init__(self, color = 'green', width = 100, height = 100):
        self.color = color
        self.width = width
        self.height = height
    def square(self):
        return self.width * self.height
y = X()
y = X('pink', 50, 50)
print(y.square())

