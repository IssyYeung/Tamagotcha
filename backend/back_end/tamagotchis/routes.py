from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint, jsonify)
from flask_login import current_user, login_required
from back_end.models import User, Tamagotchi, TamagotchiSchema
from back_end import db

tamagotchis = Blueprint('tamagotchis', __name__)


@tamagotchis.route('/user_tamagotchis/<username>', methods=['GET'])
# @login_required
def user_Tamagotchis(username):
    username = str(username)
    #page = request.args.get('page', 1, type=int)
    user = User.query.get(username)  # .first_or_404()
    tamagotchis = Tamagotchi.query.filter_by(user_id=user.username)\
        .order_by(Tamagotchi.time_of_birth.desc())\
        # .paginate(page=page, per_page=5)
    # return render_template('user_Tamagotchis.html', Tamagotchis=Tamagotchis, user=user)
    tamagotchi_schema = TamagotchiSchema()
    return tamagotchi_schema.jsonify(tamagotchis)

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
        new_tamagotchi = Tamagotchi(name=name, breed=breed)
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
        new_tamagotchi = Tamagotchi(name=name, breed=breed)
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

        tamagotchi.name = name
        tamagotchi.breed = breed

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
