from flask import url_for
from flask_mail import Message
from backend import mail, db
from backend.models import Tamagotchi, TamagotchiSchema


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='tamagotcha@demo.com',
                  recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('users.reset_token', token=token, _external=True)}
If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg)


def assign_first_tamagotchi(new_user_id):
    name = "Shizukutchi"
    breed = "Baby Egg"
    user_id = new_user_id
    new_tamagotchi = Tamagotchi(name=name, breed=breed, user_id=user_id)
    db.session.add(new_tamagotchi)
    db.session.commit()
    tamagotchi_schema = TamagotchiSchema()
    return tamagotchi_schema.jsonify(new_tamagotchi)

