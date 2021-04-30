from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint)
from flask_login import current_user, login_required
from back_end.models import User, Tamagotchi, TamagotchiSchema

tamagotchis = Blueprint('tamagotchis', __name__)

@tamagotchis.route("/user/<string:username>/users_tamagotchis/")
@login_required
def user_Tamagotchis(username):
    #page = request.args.get('page', 1, type=int)
    user = User.query.filter_by(username=username).first_or_404()
    Tamagotchis = Tamagotchi.query.filter_by(user_id=user)\
        .order_by(Tamagotchi.time_of_birth.desc())\
        #.paginate(page=page, per_page=5)
    #return render_template('user_Tamagotchis.html', Tamagotchis=Tamagotchis, user=user)
    tamagotchi_schema = TamagotchiSchema()
    return tamagotchi_schema.jsonify(Tamagotchis)