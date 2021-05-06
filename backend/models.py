from datetime import datetime, timedelta
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from backend import db, ma


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(500), nullable=False)
    time_on_app = db.Column(db.Float, nullable=False, default=0.0)
    last_login = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default="true")
    # One to many relationship because one user can have many Tamagotchis (eventually).
    # Backref allows us to get owner (user) attribute of Tamagotchi.
    Tamagotchas = db.relationship('Tamagotcha', backref='author', lazy=True)

    def __init__(self, username, email, hashed_password, roles):
        self.username = username
        self.email = email
        self.hashed_password = hashed_password
        self.roles = roles

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

    @property
    def identity(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has an ``identity`` instance
        attribute or property that provides the unique id of the user instance
        """
        return self.id

    @property
    def rolenames(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has a ``rolenames`` instance
        attribute or property that provides a list of strings that describe the roles
        attached to the user instance
        """
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def password(self):
        """
        *Required Attribute or Property*

        flask-praetorian requires that the user class has a ``password`` instance
        attribute or property that provides the hashed password assigned to the user
        instance
        """
        return self.hashed_password

    @classmethod
    def lookup(cls, username):
        """
        *Required Method*

        flask-praetorian requires that the user class implements a ``lookup()``
        class method that takes a single ``username`` argument and returns a user
        instance if there is one that matches or ``None`` if there is not.
        """
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        """
        *Required Method*

        flask-praetorian requires that the user class implements an ``identify()``
        class method that takes a single ``id`` argument and returns user instance if
        there is one that matches or ``None`` if there is not.
        """
        return cls.query.get(id)

    def is_valid(self):
        return self.is_active

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.time_on_app}', '{self.last_login}')"


class Tamagotcha(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    time_of_birth = db.Column(
        db.DateTime, nullable=False, default=datetime.now())
    breed = db.Column(db.String(100), nullable=False)
    is_hatched = db.Column(db.Boolean, nullable=False, default=False)
    fun = db.Column(db.Integer, nullable=False, default=50)
    sleep = db.Column(db.Integer, nullable=False, default=50)
    thirst = db.Column(db.Integer, nullable=False, default=50)
    hunger = db.Column(db.Integer, nullable=False, default=50)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    time_feed_by = db.Column(db.DateTime, nullable=False,
                             default=datetime.now() + timedelta(hours=3))
    time_drink_by = db.Column(db.DateTime, nullable=False,
                              default=datetime.now() + timedelta(hours=2))
    time_sleep_by = db.Column(db.DateTime, nullable=False,
                              default=datetime.now() + timedelta(hours=9))
    time_play_by = db.Column(db.DateTime, nullable=False,
                             default=datetime.now() + timedelta(hours=4))

    def __init__(self, name, breed, user_id):
        self.name = name
        self.breed = breed
        self.user_id = user_id

    def __repr__(self):
        return f"Tamagotchi('{self.name}', '{self.time_of_birth}', '{self.breed}', '{self.fun}', '{self.sleep}', '{self.thirst}', '{self.hunger}', '{self.user_id}', '{self.time_feed_by}')"


class TriviaQuestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    incorrect_ans_one = db.Column(db.String(15), nullable=False)
    incorrect_ans_two = db.Column(db.String(15), nullable=False)
    correct_ans = db.Column(db.String(15), nullable=False)
    question_used = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f"Tamagotchi('{self.question}', '{self.incorrect_ans_one}', '{self.incorrect_ans_two}', '{self.correct_ans}', '{self.question_used}')"


# Create Marshmallow Schema (JSON Serialisable objects)
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class TamagotchaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tamagotcha


class TriviaQuestionsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TriviaQuestions
