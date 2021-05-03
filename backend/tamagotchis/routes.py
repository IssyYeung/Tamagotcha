from flask import (request, abort, Blueprint, jsonify)
from backend.models import User, Tamagotchi, TamagotchiSchema
from backend import db
import flask_praetorian 

tamagotchis = Blueprint('tamagotchis', __name__)

@tamagotchis.route('/api/tamagotchi_stats', methods=['GET'])
@flask_praetorian .auth_required
def get_tamagotchi_stats():
    tamagotchis = Tamagotchi.query.filter_by(user_id=flask_praetorian .current_user().id)
    tamagotchi_schema = TamagotchiSchema(many=True)
    output = tamagotchi_schema.dump(tamagotchis)
    #{f'{flask_praetorian .current_user().username}\'s tamagotchi\'s': 
    return jsonify(output)

# ADMIN ROUTES

@tamagotchis.route('/tamagotchi_list', methods=['GET'])
def list_tamagotchis():
    tamagotchis = Tamagotchi.query.all()
    tamagotchi_schema = TamagotchiSchema(many=True)
    output = tamagotchi_schema.dump(tamagotchis)
    return jsonify({'tamagotchi': output})


@tamagotchis.route('/tamagotchi/<id>', methods=['GET'])
def list_tamagotchi(id):
    try:
        tamagotchi = Tamagotchi.query.get(id)
        tamagotchi_schema = TamagotchiSchema()
        return tamagotchi_schema.jsonify(tamagotchi)
    except:
        abort(400)


@tamagotchis.route('/add_tamagotchi', methods=['POST'])
def new_tamagotchi():
    try:
        name = request.json['name']
        breed = request.json['breed']
        user_id = request.json['user_id']
        new_tamagotchi = Tamagotchi(name=name, breed=breed, user_id=user_id)
        db.session.add(new_tamagotchi)
        db.session.commit()
        tamagotchi_schema = TamagotchiSchema()
        return tamagotchi_schema.jsonify(new_tamagotchi)
    except:
        abort(400)


@tamagotchis.route('/add_multiple_tamagotchis', methods=['POST'])
def new_tamagotchis():
    # try:
    jsonBody = request.get_json()
    for json_object in jsonBody:
        name = json_object.get('name')
        breed = json_object.get('breed')
        user_id = json_object.get('user_id')
        new_tamagotchi = Tamagotchi(name=name, breed=breed, user_id=user_id)
        db.session.add(new_tamagotchi)
        db.session.commit()
        tamagotchi_schema = TamagotchiSchema()
        tamagotchi_schema.jsonify(new_tamagotchi)
    tamagotchis = Tamagotchi.query.all()
    tamagotchi_schema = TamagotchiSchema(many=True)
    output = tamagotchi_schema.dump(tamagotchis)
    return jsonify({'# tamagotchis in database': len(output)})
    # except:
    #     abort(400)

@tamagotchis.route('/update_tamagotchi/<id>', methods=['PUT'])
def update_tamagotchi(id):
    try:
        tamagotchi = Tamagotchi.query.get(id)
        name = request.json['name']
        breed = request.json['breed']
        user_id = request.json['user_id']
        tamagotchi.name = name
        tamagotchi.breed = breed
        tamagotchi.user_id = user_id

        db.session.commit()

        tamagotchi_schema = TamagotchiSchema()
        return tamagotchi_schema.jsonify(tamagotchi)
    except:
        abort(404)


@tamagotchis.route('/delete_tamagotchi/<id>', methods=['DELETE'])
def delete_tamagotchi(id):
    try:
        tamagotchi = Tamagotchi.query.get(id)
        db.session.delete(tamagotchi)
        db.session.commit()
        tamagotchi_schema = TamagotchiSchema()
        return tamagotchi_schema.jsonify({tamagotchi})
    except:
        abort(404)
