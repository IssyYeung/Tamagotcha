from flask import render_template, url_for, flash, redirect, request, Blueprint, jsonify, abort
from flask_login import login_user, current_user, logout_user, login_required
from back_end import db, bcrypt
from back_end.models import User, UserSchema
from back_end.users.utils import save_picture, send_reset_email
from flask import Blueprint
from back_end.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
                                  RequestResetForm, ResetPasswordForm)
from back_end.models import UserSchema

users = Blueprint('users', __name__)


@users.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        user = User(username=form.username.data,
                    email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in',
              'btn btn-success')
        return redirect(url_for('users.login'))
    # return render_template('register.html', title='Register', form=form)


@users.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
        else:
            flash('Login Unsuccessful. Please check email and password',
                  'btn btn-danger')
    # return render_template('login.html', title='Login', form=form)


@users.route("/logout")
def logout():
    logout_user()
    # return redirect(url_for('main.home'))


@users.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        # flash('Your account has been updated!', 'btn btn-success')
        # return redirect(url_for('users.account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for(
        'static', filename='profile_pics/' + current_user.image_file)
    user_schema = UserSchema()
    return user_schema.jsonify(current_user)
    # return render_template('account.html', title='Account',
    #                        image_file=image_file, form=form)


@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        return redirect(url_for('users.login'))
    return render_template('reset_request.html', title='Reset Password', form=form)


@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'btn btn-warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in',
              'btn btn-success')
        return redirect(url_for('users.login'))
    return render_template('reset_token.html', title='Reset Password', form=form)

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
        # Hash password entered by user for secure storage in database.
        hashed_password = bcrypt.generate_password_hash(
            password_data).decode('utf-8')
        new_user = User(email=email_data, username=username_data,
                        password=hashed_password)
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
            new_user = User(email=email_data,
                            username=username_data, password=hashed_password)
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
        user.password = hashed_password

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
