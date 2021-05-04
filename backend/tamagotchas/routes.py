from flask import (request, abort, Blueprint, jsonify)
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
    try:
        tamagotcha = Tamagotcha.query.filter_by(
            user_id=flask_praetorian .current_user().id).first()

        hunger = request.json['hunger']
        thirst = request.json['thirst']
        fun = request.json['fun']
        sleep = request.json['sleep']

        

        tamagotcha.hunger = hunger
        tamagotcha.thirst = thirst
        tamagotcha.fun = fun
        tamagotcha.sleep = sleep

        db.session.commit()

        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(tamagotcha)
    except:
        abort(404)


# ADMIN ROUTES

@tamagotchas.route('/tamagotcha_list', methods=['GET'])
def list_tamagotchas():
    tamagotchas = Tamagotcha.query.all()
    tamagotcha_schema = TamagotchaSchema(many=True)
    output = tamagotcha_schema.dump(tamagotchas)
    return jsonify({'tamagotcha': output})


@tamagotchas.route('/tamagotcha/<id>', methods=['GET'])
def list_tamagotcha(id):
    try:
        tamagotcha = Tamagotcha.query.get(id)
        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify(tamagotcha)
    except:
        abort(400)


@tamagotchas.route('/add_tamagotcha', methods=['POST'])
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


@tamagotchas.route('/add_multiple_tamagotchas', methods=['POST'])
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


@tamagotchas.route('/update_tamagotcha/<id>', methods=['PUT'])
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


@tamagotchas.route('/delete_tamagotcha/<id>', methods=['DELETE'])
def delete_tamagotcha(id):
    try:
        tamagotcha = Tamagotcha.query.get(id)
        db.session.delete(tamagotcha)
        db.session.commit()
        tamagotcha_schema = TamagotchaSchema()
        return tamagotcha_schema.jsonify({tamagotcha})
    except:
        abort(404)
