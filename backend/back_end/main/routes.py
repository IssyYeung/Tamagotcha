from flask import Blueprint, request, jsonify

main = Blueprint('main', __name__)

@main.route('/')
def hello_world():
    return 'Hello, World!'
