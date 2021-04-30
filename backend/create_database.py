from back_end import db, create_app, login_manager

app = create_app()

app.app_context().push()
from back_end.models import User, Tamagotchi, TriviaQuestions
db.create_all()

exit()