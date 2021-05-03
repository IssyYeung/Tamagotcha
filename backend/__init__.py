from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from backend.config import Config
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_login import LoginManager
from flask_cors import CORS
from flask_praetorian import Praetorian

# Create instance of database
db = SQLAlchemy()

# Create instance of marshmallow for schema
ma = Marshmallow()

# Initialise Bcrypt for hashing passwords for database storage
bcrypt = Bcrypt()

# Initialise mail extension.
mail = Mail()

# Create instance of login manager.
login_manager = LoginManager()

# Create instance of flask praetorian for authentication.
guard = Praetorian()

# Allow for cross origin reference sources (from frontend)
cors = CORS()

def create_app(config_class=Config):
    # name is the name of the current python module
    app = Flask(__name__)
    

    # Linking to config.py file to set configurations
    app.config.from_object(Config)

    # Use init_app to pass in app to extension initialisation
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    cors.init_app(app)


    from backend.errors.handlers import errors
    from backend.main.routes import main
    from backend.tamagotchis.routes import tamagotchis
    from backend.minigames.routes import minigames
    from backend.users.routes import users

    # Register blueprints
    app.register_blueprint(errors)
    app.register_blueprint(tamagotchis)
    app.register_blueprint(main)
    app.register_blueprint(minigames)
    app.register_blueprint(users)

    #Done to avoid circular import dilemma with Praetorian initialisation:
    with app.app_context():
        from backend.models import User
        guard.init_app(app, User)

    return app
