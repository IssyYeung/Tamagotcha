from flask import url_for
from flask_mail import Message
from backend import mail, db
from backend.models import Tamagotcha, TamagotchaSchema


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
    name = "Pandaichi"
    breed = "Baby Panda"
    user_id = new_user_id
    is_dead = 0
    new_tamagotchi = Tamagotcha(
        name=name, breed=breed, user_id=user_id, is_dead=is_dead)
    db.session.add(new_tamagotchi)
    db.session.commit()
    tamagotchi_schema = TamagotchaSchema()
    return tamagotchi_schema.jsonify(new_tamagotchi)
