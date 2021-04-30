from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from back_end import db, ma, login_manager
from flask_login import UserMixin

# Function to get a user by id upon login.


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(120), nullable=False,
                           default='default.jpg')
    password = db.Column(db.String(120), nullable=False)
    time_on_app = db.Column(db.Float, nullable=False, default=0.0)
    last_login = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)

    # Might want to add a column which records the last login so that we can calculate the timeOnApp or change Tamagochi stats based upon time
    # lastLogin = db.Column( db.DateTime, nullable=False )

    # One to many relationship because one user can have many Tamagotchis (eventually).
    # Backref allows us to get owner (user) attribute of Tamagotchi.
    Tamagotchis = db.relationship('Tamagotchi', backref='author', lazy=True)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

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

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}', '{self.time_on_app}', '{self.last_login}')"


class Tamagotchi(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    time_of_birth = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    breed = db.Column(db.String(100), nullable=False)
    overall_health = db.Column(db.Integer, nullable=False, default=100)
    sleep = db.Column(db.Integer, nullable=False, default=70)
    thirst = db.Column(db.Integer, nullable=False, default=10)
    hunger = db.Column(db.Integer, nullable=False, default=10)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def __repr__(self):
        return f"Tamagotchi('{self.name}', '{self.time_of_birth}', '{self.breed}', '{self.overall_health}', '{self.sleep}', '{self.thirst}', '{self.hunger}')"


class TriviaQuestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    incorrect_ans_one = db.Column(db.String(15), nullable=False)
    incorrect_ans_two = db.Column(db.String(15), nullable=False)
    correct_ans = db.Column(db.String(15), nullable=False)

    def __repr__(self):
        return f"Tamagotchi('{self.question}', '{self.incorrect_ans_one}', '{self.incorrect_ans_two}', '{self.correct_ans}')"


# Create Marshmallow Schema (JSON Serialisable objects)
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class TamagotchiSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tamagotchi


class TriviaQuestionsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TriviaQuestions

# Create the database called site.db from scratch by following the steps below in the terminal:
# 'python'
#'from back_end import db, create_app, login_manager'
#'app = create_app()'
# 'app.app_context().push()'
#'from back_end.models import User, Tamagotchi, TriviaQuestions'
# 'db.create_all()'