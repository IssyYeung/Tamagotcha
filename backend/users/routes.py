from flask import request, Blueprint, jsonify, abort
from backend import db, bcrypt, guard
from backend.models import User, UserSchema
from flask import Blueprint
import flask_praetorian 
from backend.models import UserSchema
from backend.users.utils import assign_first_tamagotchi

users = Blueprint('users', __name__)

@users.route('/api/register', methods=['POST'])
def register_user():
        req = request.get_json(force=True)
        email = req.get('email', None)
        username = req.get('username', None)
        password = req.get('password', None)
        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
        role = "player"
        new_user = User(email=email, username=username,
                        hashed_password=hashed_password, roles=role)
        db.session.add(new_user)
        db.session.commit()
        current_users = User.query.all()
        new_user_id = len(current_users)
        assign_first_tamagotchi(new_user_id)
        user_schema = UserSchema()
        return user_schema.jsonify(new_user)

@users.route('/api/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200
 
@users.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
  
@users.route('/api/account', methods=['GET'])
@flask_praetorian .auth_required
def get_account_details():
    user = User.query.filter_by(id=flask_praetorian .current_user().id)
    user_schema = UserSchema(many=True)
    output = user_schema.dump(user)
    return jsonify(output)

# ADMIN ROUTES

@users.route('/user_list', methods=['GET'])
def list_users():
    users = User.query.all()
    user_schema = UserSchema(many=True)
    output = user_schema.dump(users)
    return jsonify({'user': output})


@users.route('/single_user/<id>', methods=['GET'])
def list_user(id):
    try:
        user = User.query.get(id)
        user_schema = UserSchema()
        return user_schema.jsonify(user)
    except:
        abort(404)


@users.route('/add_user', methods=['POST'])
def new_user():
    try:
        email_data = request.json['email']
        username_data = request.json['username']
        password_data = request.json['password']
        hashed_password = bcrypt.generate_password_hash(
            password_data).decode('utf-8')
        role = "player"
        new_user = User(email=email_data, username=username_data,
                        hashed_password=hashed_password, roles=role)
        db.session.add(new_user)
        db.session.commit()
        user_schema = UserSchema()
        return user_schema.jsonify(new_user)
    except:
        abort(400)


@users.route('/add_multiple_users', methods=['POST'])
def new_users():
    try:
        jsonBody = request.get_json()
        for json_object in jsonBody:
            email_data = json_object.get('email')
            username_data = json_object.get('username')
            password_data = json_object.get('password')
            hashed_password = bcrypt.generate_password_hash(
                password_data).decode('utf-8')
            role = "player"
            new_user = User(email=email_data,
                            username=username_data, hashed_password=hashed_password, roles=role)
            db.session.add(new_user)
            db.session.commit()
            user_schema = UserSchema()
            user_schema.jsonify(new_user)
        users = User.query.all()
        user_schema = UserSchema(many=True)
        output = user_schema.dump(users)
        return jsonify({'# users in database': len(output)})
    except:
        abort(400)


@users.route('/update_user/<id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.get(id)
        email_data = request.json['email']
        username_data = request.json['username']
        password_data = request.json['password']

        user.email = email_data
        user.username = username_data
        hashed_password = bcrypt.generate_password_hash(
            password_data).decode('utf-8')
        user.hashed_password = hashed_password

        db.session.commit()

        user_schema = UserSchema()
        return user_schema.jsonify(user)
    except:
        abort(404)


@users.route('/delete_user/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        user_schema = UserSchema()
        return user_schema.jsonify({user})
    except:
        abort(404)
