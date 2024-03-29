from flask import Blueprint, jsonify

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad request"
    }), 400

@errors.app_errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Not found"
    }), 404

@errors.app_errorhandler(405)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 405,
        "message": "Sorry, there's no questions left!"
    }), 405

@errors.app_errorhandler(403)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 403,
        "message": "Forbidden page"
    }), 403

@errors.app_errorhandler(500)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": "General server error"
    }), 500

@errors.app_errorhandler(503)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 503,
        "message": "Service unavailable"
    }), 503
