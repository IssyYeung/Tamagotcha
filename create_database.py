from backend import db, create_app, login_manager

app = create_app()

app.app_context().push()
from backend.models import User, Tamagotchi, TriviaQuestions
db.create_all()

exit()