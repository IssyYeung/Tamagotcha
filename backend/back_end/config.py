import os
#Combine all configuration in a single object to allow inheritance later.
class Config:
    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'

    SECRET_KEY = '11de6d11b968dd66feb8cb6aff64a0b0'

    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('EMAIL_USER')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')