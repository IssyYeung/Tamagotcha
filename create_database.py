#If required, manually delete site.db in the backend folder and then run this script to create a new, empty database.

from backend import db, create_app, login_manager

app = create_app()

app.app_context().push()
from backend.models import User, Tamagotcha, TriviaQuestions
db.create_all()

exit()