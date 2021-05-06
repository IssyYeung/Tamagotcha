from flask import (request, abort, Blueprint, jsonify)
from datetime import timedelta, datetime
from backend.models import User, Tamagotcha, TamagotchaSchema
from backend import db
import flask_praetorian

tamagotchas = Blueprint('tamagotchas', __name__)


@tamagotchas.route('/api/tamagotcha_stats', methods=['GET'])
@flask_praetorian .auth_required
def get_tamagotcha_stats():
    tamagotchas = Tamagotcha.query.filter_by(
        user_id=flask_praetorian .current_user().id)
    tamagotcha_schema = TamagotchaSchema(many=True)
    output = tamagotcha_schema.dump(tamagotchas)
    # {f'{flask_praetorian .current_user().username}\'s tamagotcha\'s':
    return jsonify(output)


@tamagotchas.route('/api/update_tamagotcha', methods=['PUT'])
@flask_praetorian .auth_required
def update_current_tamagotcha():
    # try:
        tamagotcha = Tamagotcha.query.filter_by(
            user_id=flask_praetorian .current_user().id).first()

        maxTimeFood = datetime.now() + timedelta(hours=6)
        maxTimeDrink = datetime.now() + timedelta(hours=4)
        maxTimeSleep = datetime.now() + timedelta(hours=18)
        maxTimeGame = datetime.now() + timedelta(hours=8)

        food = request.json['food']
        drink = request.json['drink']
        sleep = request.json['sleep']
        game = request.json['game']

        if request.json['hatch'] == "true":
            tamagotcha.is_hatched = True

        if food == "apple":
            tamagotcha.time_feed_by = min(tamagotcha.time_feed_by + timedelta(hours=3),
                                          maxTimeFood)
        elif food == "popcorn":
            tamagotcha.time_feed_by = min(tamagotcha.time_feed_by +
                                          timedelta(hours=1, minutes=30), maxTimeFood)
        elif food == "soup":
            tamagotcha.time_feed_by = min(tamagotcha.time_feed_by +
                                          timedelta(hours=4, minutes=30), maxTimeFood)
        elif food == "pizza":
            tamagotcha.time_feed_by = min(tamagotcha.time_feed_by +
                                          timedelta(hours=6), maxTimeFood)

        if drink == "wine":
            tamagotcha.time_drink_by = min(tamagotcha.time_drink_by + timedelta(hours=4),
                                           maxTimeDrink)
        elif drink == "beer":
            tamagotcha.time_drink_by = min(tamagotcha.time_drink_by +
                                           timedelta(hours=3), maxTimeDrink)
        elif drink == "juice":
            tamagotcha.time_drink_by = min(tamagotcha.time_drink_by +
                                           timedelta(hours=2), maxTimeDrink)
        elif drink == "water":
            tamagotcha.time_drink_by = min(tamagotcha.time_drink_by +
                                           timedelta(hours=1), maxTimeDrink)

        if sleep == "24hr":
            # todo add time to others to prevent death while sleeping
            tamagotcha.time_sleep_by = min(tamagotcha.time_sleep_by + timedelta(hours=18),
                                           maxTimeFood)
        elif sleep == "8hr":
            tamagotcha.time_sleep_by = min(tamagotcha.time_sleep_by +
                                           timedelta(hours=18), maxTimeSleep)
        elif sleep == "1hr":
            tamagotcha.time_sleep_by = min(tamagotcha.time_sleep_by +
                                           timedelta(hours=10), maxTimeSleep)
        elif sleep == "10min":
            tamagotcha.time_sleep_by = min(tamagotcha.time_sleep_by +
                                           timedelta(hours=2), maxTimeSleep)

        if game == "quiz":
            tamagotcha.time_play_by = min(tamagotcha.time_play_by + timedelta(hours=8),
                                          maxTimeGame)

        db.session.commit()

        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(tamagotcha)
    # except:
    #     abort(404)


# ADMIN ROUTES

@ tamagotchas.route('/tamagotcha_list', methods=['GET'])
def list_tamagotchas():
    tamagotchas = Tamagotcha.query.all()
    tamagotcha_schema = TamagotchaSchema(many=True)
    output = tamagotcha_schema.dump(tamagotchas)
    return jsonify({'tamagotcha': output})


@ tamagotchas.route('/tamagotcha/<id>', methods=['GET'])
def list_tamagotcha(id):
    try:
        tamagotcha = Tamagotcha.query.get(id)
        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(tamagotcha)
    except:
        abort(400)


@ tamagotchas.route('/add_tamagotcha', methods=['POST'])
def new_tamagotcha():
    try:
        name = request.json['name']
        breed = request.json['breed']
        user_id = request.json['user_id']
        new_tamagotcha = Tamagotcha(name=name, breed=breed, user_id=user_id)
        db.session.add(new_tamagotcha)
        db.session.commit()
        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(new_tamagotcha)
    except:
        abort(400)


@ tamagotchas.route('/add_multiple_tamagotchas', methods=['POST'])
def new_tamagotchas():
    # try:
    jsonBody = request.get_json()
    for json_object in jsonBody:
        name = json_object.get('name')
        breed = json_object.get('breed')
        user_id = json_object.get('user_id')
        new_tamagotcha = Tamagotcha(name=name, breed=breed, user_id=user_id)
        db.session.add(new_tamagotcha)
        db.session.commit()
        tamagotcha_schema = TamagotchaSchema()
        tamagotcha_schema.jsonify(new_tamagotcha)
    tamagotchas = Tamagotcha.query.all()
    tamagotcha_schema = TamagotchaSchema(many=True)
    output = tamagotcha_schema.dump(tamagotchas)
    return jsonify({'# tamagotchas in database': len(output)})
    # except:
    #     abort(400)


@ tamagotchas.route('/update_tamagotcha/<id>', methods=['PUT'])
def update_tamagotcha(id):
    try:
        tamagotcha = Tamagotcha.query.get(id)
        name = request.json['name']
        breed = request.json['breed']
        user_id = request.json['user_id']
        tamagotcha.name = name
        tamagotcha.breed = breed
        tamagotcha.user_id = user_id

        db.session.commit()

        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(tamagotcha)
    except:
        abort(404)


@ tamagotchas.route('/delete_tamagotcha/<id>', methods=['DELETE'])
def delete_tamagotcha(id):
    try:
        tamagotcha = Tamagotcha.query.get(id)
        db.session.delete(tamagotcha)
        db.session.commit()
        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify({tamagotcha})
    except:
        abort(404)
