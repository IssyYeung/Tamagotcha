from flask import Blueprint, request, jsonify, abort
from back_end.models import TriviaQuestions, TriviaQuestionsSchema
from back_end import db

minigames = Blueprint('minigames', __name__)

#ADMIN ROUTES

@minigames.route('/TriviaQuestions_list', methods=['GET'])
def list_minigames():
    triviaquestions = TriviaQuestions.query.all()
    triviaQuestions_schema = TriviaQuestionsSchema(many=True)
    output = triviaQuestions_schema.dump(triviaquestions)
    return jsonify({'TriviaQuestions' : output})
    
@minigames.route('/TriviaQuestions/<id>', methods=['GET'])
def list_TriviaQuestions(id):
    try:
        triviaQuestions = TriviaQuestions.query.get(id)
        triviaQuestions_schema = TriviaQuestionsSchema()
        return triviaQuestions_schema.jsonify(triviaQuestions)
    except:
         abort(400)

@minigames.route('/add_TriviaQuestions', methods=['POST'])
def new_TriviaQuestions():
    try:
        question = request.json['question']
        incorrect_ans_one = request.json['incorrect_ans_one']
        incorrect_ans_two = request.json['incorrect_ans_two']
        correct_ans = request.json['correct_ans']
        new_TriviaQuestions = TriviaQuestions(question=question, incorrect_ans_one=incorrect_ans_one, incorrect_ans_two=incorrect_ans_two, correct_ans=correct_ans)
        db.session.add(new_TriviaQuestions)
        db.session.commit()
        TriviaQuestions_schema = TriviaQuestionsSchema()
        return TriviaQuestions_schema.jsonify(new_TriviaQuestions)
    except:
         abort(400)

@minigames.route('/add_multiple_trivia_questions', methods=['POST'])
def new_minigames():
    try:
        jsonBody = request.get_json()
        for json_object in jsonBody:
            question = json_object.get('question')
            incorrect_ans_one = json_object.get('incorrect_ans_one')
            incorrect_ans_two = json_object.get('incorrect_ans_two')
            correct_ans = json_object.get('correct_ans')
            new_TriviaQuestions = TriviaQuestions(question=question, incorrect_ans_one=incorrect_ans_one, incorrect_ans_two=incorrect_ans_two, correct_ans=correct_ans)
            db.session.add(new_TriviaQuestions)
            db.session.commit()
            TriviaQuestions_schema = TriviaQuestionsSchema()
            TriviaQuestions_schema.jsonify(new_TriviaQuestions)
        minigames = TriviaQuestions.query.all()
        TriviaQuestions_schema = TriviaQuestionsSchema(many=True)
        output = TriviaQuestions_schema.dump(minigames)
        return jsonify({'# Trivia questions in database' : len(output)})
    except:
        abort(400)


@minigames.route('/delete_TriviaQuestions/<id>', methods=['DELETE'])
def delete_TriviaQuestions(id):
    try:
        TriviaQuestions = TriviaQuestions.query.get(id)
        db.session.delete(TriviaQuestions)
        db.session.commit()
        TriviaQuestions_schema = TriviaQuestionsSchema()
        return TriviaQuestions_schema.jsonify({TriviaQuestions})
    except:
        abort(404)